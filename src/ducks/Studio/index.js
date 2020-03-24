import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import StudioSidebar from './Sidebar'
import StudioMain from './Main'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { MAX_METRICS_AMOUNT } from './constraints'
import { generateShareLink, updateHistory } from './url'
import { trackMetricState } from './analytics'
import { useTimeseries } from './timeseries/hooks'
import { buildAnomalies } from './timeseries/anomalies'
import { buildComparedMetric } from './Compare/utils'
import styles from './index.module.scss'

const Studio = ({
  classes,
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  defaultEvents,
  defaultComparedMetrics,
  defaultComparables,
  topSlot,
  bottomSlot,
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [comparables, setComparables] = useState(defaultComparables)
  const [comparedMetrics, setComparedMetrics] = useState(defaultComparedMetrics)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [activeMetrics, setActiveMetrics] = useState(defaultMetrics)
  const [activeEvents, setActiveEvents] = useState(defaultEvents)
  const [advancedView, setAdvancedView] = useState()
  const [shareLink, setShareLink] = useState()
  const [isICOPriceDisabled, setIsICOPriceDisabled] = useState()
  const [data, loadings] = useTimeseries(activeMetrics, settings)
  const [eventsData, eventLoadings] = useTimeseries(activeEvents, settings)
  const [isSidebarClosed, setIsSidebarClosed] = useState()

  useEffect(
    () => {
      setComparedMetrics(comparables.map(buildComparedMetric))
    },
    [comparables]
  )

  useEffect(
    () => {
      setActiveMetrics(metrics.concat(comparedMetrics))
    },
    [metrics, comparedMetrics]
  )

  useEffect(
    () => {
      const activeLength = activeMetrics.length
      if (!options.isMultiChartsActive && activeLength > MAX_METRICS_AMOUNT) {
        const diff = activeLength - MAX_METRICS_AMOUNT

        if (diff >= comparables.length) {
          setComparables([])
        } else {
          setComparables(comparables.slice(0, -diff))
        }

        if (metrics.length >= MAX_METRICS_AMOUNT) {
          setMetrics(metrics.slice(0, MAX_METRICS_AMOUNT))
        }
      }
    },
    [options.isMultiChartsActive]
  )

  useEffect(
    () => {
      const { slug } = defaultSettings
      if (slug && slug !== settings.slug) {
        setSettings(state => ({ ...state, slug }))
      }
    },
    [defaultSettings.slug]
  )

  useEffect(
    () => {
      const queryString =
        '?' +
        generateShareLink(settings, options, metrics, activeEvents, comparables)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
      updateHistory(queryString)
    },
    [settings, options, metrics, activeEvents, comparables]
  )

  useEffect(
    () => {
      if (options.isAnomalyActive) {
        setActiveEvents(buildAnomalies(metrics))
      }
    },
    [metrics, options.isAnomalyActive]
  )

  function toggleMetric (metric) {
    if (metric.comparedTicker) {
      return removeComparedMetric(metric)
    }

    const metricSet = new Set(metrics)
    if (metricSet.has(metric)) {
      if (activeMetrics.length === 1) return
      metricSet.delete(metric)
      trackMetricState(metric, false)
    } else {
      if (
        !options.isMultiChartsActive &&
        activeMetrics.length === MAX_METRICS_AMOUNT
      ) {
        return
      }

      metricSet.add(metric)
      trackMetricState(metric, true)
    }
    setMetrics([...metricSet])
  }

  function toggleAdvancedView (mode) {
    setAdvancedView(advancedView === mode ? undefined : mode)
  }

  function removeComparedMetric ({ key }) {
    setComparables(comparables.filter(comp => comp.key !== key))
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        classes.wrapper,
        isSidebarClosed && styles.wrapper_wide
      )}
    >
      <StudioSidebar
        slug={settings.slug}
        options={options}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        advancedView={advancedView}
        setOptions={setOptions}
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
        isICOPriceDisabled={isICOPriceDisabled}
        isSidebarClosed={isSidebarClosed}
        setIsSidebarClosed={setIsSidebarClosed}
      />
      <StudioMain
        {...props}
        topSlot={topSlot}
        bottomSlot={bottomSlot}
        options={options}
        settings={settings}
        activeMetrics={activeMetrics}
        activeEvents={activeEvents}
        comparables={comparables}
        data={data}
        eventsData={eventsData}
        loadings={loadings}
        eventLoadings={eventLoadings}
        advancedView={advancedView}
        shareLink={shareLink}
        // bools
        isSidebarClosed={isSidebarClosed}
        // state setters
        setSettings={setSettings}
        setOptions={setOptions}
        setComparables={setComparables}
        setIsICOPriceDisabled={setIsICOPriceDisabled}
        // fn
        toggleMetric={toggleMetric}
        toggleAdvancedView={toggleAdvancedView}
      />
    </div>
  )
}

Studio.defaultProps = {
  defaultComparedMetrics: [],
  defaultEvents: [],
  defaultComparables: [],
  onSlugChange: () => {},
  classes: {}
}

export default ({
  settings,
  options,
  metrics,
  events,
  comparables,
  ...props
}) => (
  <Studio
    {...props}
    defaultSettings={{
      ...DEFAULT_SETTINGS,
      ...settings
    }}
    defaultOptions={{ ...DEFAULT_OPTIONS, ...options }}
    defaultMetrics={metrics || DEFAULT_METRICS}
    defaultEvents={events}
    defaultComparables={comparables}
  />
)

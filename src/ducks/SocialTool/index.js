import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import { Metric } from '../dataHub/metrics'
import withBoundaries from '../../pages/Studio/withBoundaries'
import { useTimeseries } from '../Studio/timeseries/hooks'
import { updateHistory, parseUrl, generateShareLink } from '../Studio/url'
import SocialToolChart from './Chart'
import { DEFAULT_SETTINGS, DEFAULT_OPTIONS, DEFAULT_METRICS } from './defaults'
import { buildMetric } from './utils'
import styles from './index.module.scss'

const SocialTool = ({
  defaultSettings,
  defaultOptions,
  defaultMetrics,
  detectedAsset,
  classes = {},
  ...props
}) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [options, setOptions] = useState(defaultOptions)
  const [metrics, setMetrics] = useState(defaultMetrics)
  const [MetricSettingMap, setMetricSettingMap] = useState()

  const [activeMetrics, setActiveMetrics] = useState(
    metrics.map(metric => buildMetric({ metric, ...defaultSettings }))
  )
  const [data, loadings] = useTimeseries(
    activeMetrics,
    settings,
    MetricSettingMap
  )
  const [shareLink, setShareLink] = useState('')
  const chartRef = useRef(null)

  useEffect(
    () => {
      const newMetricSettingMap = new Map(MetricSettingMap)
      const metricSetting = { selector: detectedAsset ? 'slug' : 'text' }

      newMetricSettingMap.set(Metric.social_volume_total, metricSetting)
      newMetricSettingMap.set(Metric.social_dominance_total, metricSetting)

      setMetricSettingMap(newMetricSettingMap)
    },
    [detectedAsset]
  )

  useEffect(
    () => {
      const updatedMetrics = metrics.map(metric =>
        buildMetric({ metric, ...settings, detectedAsset })
      )

      setActiveMetrics(updatedMetrics)
    },
    [metrics, settings.asset, settings.text, detectedAsset]
  )

  useEffect(
    () => {
      const { text } = defaultSettings
      if (text && text !== settings.text) {
        setSettings(state => ({ ...state, text }))
      }
    },
    [defaultSettings.text]
  )

  useEffect(
    () => {
      const metricSet = new Set(metrics)
      const metric = Metric.social_dominance_total

      if (options.withDominance) {
        metricSet.add(metric)
      } else {
        metricSet.delete(metric)
      }

      setMetrics([...metricSet])
    },
    [options.withDominance]
  )

  useEffect(
    () => {
      const queryString = '?' + generateShareLink(settings, options)

      const { origin, pathname } = window.location
      setShareLink(origin + pathname + queryString)
      updateHistory(queryString)
    },
    [settings, options]
  )

  return (
    <div className={cx(styles.wrapper, classes.wrapper)}>
      <div className={styles.chart}>
        <SocialToolChart
          {...props}
          detectedAsset={detectedAsset}
          className={styles.canvas}
          chartRef={chartRef}
          options={options}
          settings={settings}
          setOptions={setOptions}
          setSettings={setSettings}
          shareLink={shareLink}
          activeMetrics={activeMetrics}
          data={data}
          loadings={loadings}
        />
      </div>
    </div>
  )
}

export default withBoundaries(({ settings, options, metrics, ...props }) => {
  const sharedState = parseUrl(DEFAULT_SETTINGS, DEFAULT_OPTIONS)

  return (
    <SocialTool
      {...props}
      defaultSettings={{
        ...DEFAULT_SETTINGS,
        ...sharedState.settings,
        ...settings
      }}
      defaultOptions={{
        ...DEFAULT_OPTIONS,
        ...sharedState.options,
        ...options
      }}
      defaultMetrics={metrics || DEFAULT_METRICS}
    />
  )
})

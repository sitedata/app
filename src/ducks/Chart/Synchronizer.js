import React, { useMemo, useState, useEffect } from 'react'
import COLOR from '@santiment-network/ui/variables.scss'
import { getValidTooltipKey, findTooltipMetric } from './utils'
import { setupColorGenerator } from '../SANCharts/utils'
import { Metric } from '../dataHub/metrics'

const cache = new Map()

export function metricsToPlotCategories (metrics) {
  const requestedData = {
    lines: [],
    filledLines: [],
    daybars: [],
    bars: [],
    joinedCategories: [],
    areas: [],
    metrics
  }
  const joinedCategories = requestedData.joinedCategories

  metrics.forEach(metric => {
    const { key, dataKey = key, node } = metric
    requestedData[node + 's'].push(dataKey)
    joinedCategories.push(dataKey)
  })

  return requestedData
}

export const clearCache = () => cache.clear()
export const getSyncedColors = metrics => {
  const cacheKey = metrics.map(({ key }) => key).toString()
  const cachedColors = cache.get(cacheKey)

  if (cachedColors) {
    return cachedColors
  }

  const generateColor = setupColorGenerator()

  const colors = metrics.reduce((acc, { key, dataKey = key, color }) => {
    acc[dataKey] = COLOR[generateColor(color)]
    return acc
  }, {})

  cache.set(cacheKey, colors)
  return colors
}

const { price_usd } = Metric

function colorTrend (position) {
  if (position < 4) {
    return COLOR.persimmon
  }
  if (position < 7) {
    return COLOR['texas-rose-hover']
  }

  return COLOR['bright-sun']
}

export function prepareEvents (events) {
  return events.map(({ datetime, position, metricAnomalyKey }) => {
    const date = +new Date(datetime)
    if (metricAnomalyKey) {
      const { label, dataKey = metricAnomalyKey } = Metric[metricAnomalyKey]
      return {
        key: 'isAnomaly',
        metric: dataKey,
        datetime: date,
        value: label,
        color: COLOR.persimmon
      }
    }

    const color = colorTrend(position)
    return {
      key: 'trendingPosition',
      metric: 'priceUsd',
      datetime: date,
      value: [position, color],
      color
    }
  })
}

export const useMetricCategories = metrics =>
  useMemo(() => metricsToPlotCategories(metrics), [metrics])

const Synchronizer = ({ children, metrics, isMultiChartsActive, events }) => {
  const [syncedTooltipDate, syncTooltips] = useState()
  const [syncedEvents, syncEvents] = useState()
  const [syncedCategories, syncCategories] = useState([])
  const [noPriceMetrics, setNoPriceMetrics] = useState([])
  const [hasPriceMetric, setHasPriceMetric] = useState()
  const [isValidMulti, setIsValidMulti] = useState()

  useEffect(
    () => {
      const noPriceMetrics = metrics.filter(metric => metric !== price_usd)
      const hasPriceMetric = metrics.length !== noPriceMetrics.length
      const isValidMulti = isMultiChartsActive && noPriceMetrics.length > 1

      const categories = []
      if (isValidMulti) {
        noPriceMetrics.forEach(metric =>
          categories.push(
            metricsToPlotCategories(
              hasPriceMetric ? [metric, price_usd] : [metric]
            )
          )
        )
      } else {
        categories.push(metricsToPlotCategories(metrics))
      }

      syncCategories(categories)
      syncEvents(events)
      setNoPriceMetrics(noPriceMetrics)
      setHasPriceMetric(hasPriceMetric)
      setIsValidMulti(isValidMulti)
    },
    [metrics, events, isMultiChartsActive]
  )

  useEffect(() => clearCache, [])

  if (syncedCategories.length === 0 || metrics.length === 0) {
    return null
  }

  return isValidMulti
    ? syncedCategories.map((categories, i) => {
      const metric = noPriceMetrics[i]
      if (!metric) {
        return null
      }

      const tooltipKey = getMetricKey(hasPriceMetric ? price_usd : metric)

      return React.cloneElement(children, {
        key: metric.key,
        index: i,
        isMultiChartsActive,
        syncedTooltipDate,
        syncTooltips,
        hasPriceMetric,
        tooltipKey,
        ...categories,
        events: syncedEvents
      })
    })
    : React.cloneElement(children, {
      ...syncedCategories[0],
      isMultiChartsActive: false,
      hasPriceMetric,
      events: syncedEvents,
      tooltipKey: getValidTooltipKey(
        getMetricKey(findTooltipMetric(metrics)),
        syncedCategories[0].joinedCategories
      )
    })
}

function getMetricKey ({ key, dataKey = key }) {
  return dataKey
}

Synchronizer.defaultProps = {
  metrics: []
}

export default Synchronizer

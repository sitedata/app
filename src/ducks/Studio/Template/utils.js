import { COMPARE_CONNECTOR, parseComparable } from '../url/parse'
import { shareComparable } from '../url/generate'
import { Metric } from '../../dataHub/metrics'
import { tryMapToTimeboundMetric } from '../../dataHub/timebounds'
import { getSavedMulticharts } from '../../../utils/localStorage'
import { capitalizeStr } from '../../../utils/utils'
import { PATHS } from '../../../App'
import { getSEOLinkFromIdAndTitle } from '../../../components/Insight/utils'

const LAST_USED_TEMPLATE = 'LAST_USED_TEMPLATE'

export const getMetricKey = ({ key }) => key

export function prepareTemplateLink (template) {
  if (!template) {
    return ''
  }

  const { id, title } = template

  return (
    `${PATHS.STUDIO}/${getSEOLinkFromIdAndTitle(id, title)}` +
    window.location.search
  )
}

export const getTemplateIdFromURL = () => {
  const href = window.location.pathname

  if (href.indexOf(PATHS.STUDIO) === -1) {
    return false
  }

  return +extractTemplateId(href)
}

export const extractTemplateId = () => {
  const href = window.location.pathname
  const items = href.split('-')
  return items[items.length - 1]
}

export const getTemplateShareLink = template => {
  return window.location.origin + prepareTemplateLink(template)
}

export function parseTemplateMetrics (templateMetrics) {
  const { length } = templateMetrics
  const metrics = []
  const comparables = []

  for (let i = 0; i < length; i++) {
    const metricKey = templateMetrics[i]

    if (metricKey.includes(COMPARE_CONNECTOR)) {
      comparables.push(parseComparable(metricKey))
    } else {
      const metric = Metric[metricKey]

      if (metric) {
        metrics.push(metric)
      } else {
        const timeBoundMetric = tryMapToTimeboundMetric(metricKey)

        if (timeBoundMetric) {
          metrics.push(timeBoundMetric)
        }
      }
    }
  }

  return {
    metrics,
    comparables
  }
}

export function buildTemplateMetrics ({ metrics, comparables }) {
  if (!metrics && !comparables) {
    return
  }

  return metrics.map(getMetricKey).concat(comparables.map(shareComparable))
}

export function getAvailableTemplate (templates) {
  if (!availableDefaultTemplate()) {
    return undefined
  }

  const urlId = getTemplateIdFromURL()

  if (urlId) {
    return undefined
  }

  return templates[0]
}

const availableDefaultTemplate = () =>
  window.location.pathname.indexOf(PATHS.CHARTS) === -1

export function getLastTemplate () {
  if (!availableDefaultTemplate()) {
    return undefined
  }

  const savedTemplate = localStorage.getItem(LAST_USED_TEMPLATE)
  return savedTemplate ? JSON.parse(savedTemplate) : undefined
}

export function saveLastTemplate (template) {
  if (!template) return

  localStorage.setItem(LAST_USED_TEMPLATE, JSON.stringify(template))
}

export const getMultiChartsValue = ({ options }) => {
  if (options && options.multi_chart !== undefined) {
    return options.multi_chart
  }

  return getSavedMulticharts()
}

export const getTemplateAssets = ({ metrics, project: { slug, name } }) => {
  const assets = [name || slug]

  metrics.forEach(item => {
    if (item.indexOf(COMPARE_CONNECTOR) !== -1) {
      const [slug] = item.split(COMPARE_CONNECTOR)

      if (slug) {
        assets.push(slug)
      }
    }
  })

  return assets.map(slug => capitalizeStr(slug))
}

export function getTemplateMetrics ({ metrics }) {
  const { metrics: parsedMetrics } = parseTemplateMetrics(metrics)
  return parsedMetrics.map(({ label }) => label)
}

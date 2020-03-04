import { tooltipSettings } from '../../SANCharts/data'

const comparedMetricsCache = new Map()

export const projectSorter = ({ rank: a }, { rank: b }) => a - b

export const hashComparable = ({ project, metric }) => project.slug + metric.key

export const buildCompareKey = (metric, project) =>
  `${metric.key}_${project.slug}`

export const buildComparedMetric = Comparable => {
  const hash = hashComparable(Comparable)
  const cached = comparedMetricsCache.get(hash)

  if (cached) {
    return cached
  }

  const { metric, project } = Comparable
  const { ticker, slug } = project
  const { key: metricKey, label, formatter } = metric

  const key = buildCompareKey(metric, project)

  const ComparedMetric = Object.assign(Object.create(null), metric, {
    key,
    queryKey: metricKey,
    comparedTicker: ticker,
    color: undefined,
    reqMeta: {
      slug
    }
  })

  tooltipSettings[key] = {
    label: `${label} (${ticker})`,
    formatter: formatter
  }

  comparedMetricsCache.set(hash, ComparedMetric)

  return ComparedMetric
}

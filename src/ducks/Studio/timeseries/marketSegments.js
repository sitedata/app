import gql from 'graphql-tag'
import { extractTimeseries } from './utils'
import { tooltipSettings } from '../../SANCharts/data'

export const GET_MARKET_SEGMENT_QUERY = name => gql`
  query devActivity(
    $from: DateTime!
    $to: DateTime!
    $interval: String!
    $transform: String
    $movingAverageIntervalBase: Int
    $selector: GithubOrganizationsSelector
  ) {
    devActivity(
      from: $from
      to: $to
      interval: $interval
      transform: $transform
      movingAverageIntervalBase: $movingAverageIntervalBase
      selector: $selector
    ) {
      datetime
      ${name}: activity
    }
  }
`

const MarketSegments = new Map()

export const getMarketSegment = key => {
  const target = MarketSegments.get(key)
  if (target) {
    return target
  }

  const label = `Dev. Activity (${key})`
  tooltipSettings[key] = {
    label,
    formatter: tooltipSettings.activity.formatter
  }

  const newSegment = {
    key,
    label,
    queryKey: 'marketSegment',
    category: 'Development',
    node: 'line',
    yAxisId: 'axis-activity',
    reqMeta: {
      transform: 'movingAverage',
      movingAverageIntervalBase: 7,
      selector: { market_segments: [key] }
    }
  }
  MarketSegments.set(key, newSegment)
  return newSegment
}

export const MarketSegmentFetcher = {
  query: GET_MARKET_SEGMENT_QUERY,
  preTransform: extractTimeseries('devActivity')
}
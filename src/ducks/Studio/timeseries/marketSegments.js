import gql from 'graphql-tag'
import { extractTimeseries } from './utils'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
import { Description } from '../../dataHub/metrics/descriptions'

export const GET_MARKET_SEGMENT_QUERY = ({ key }) => gql`
  query devActivity(
    $from: DateTime!
    $to: DateTime!
    $interval: interval!
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
      ${key}: activity
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
  TooltipSetting[key] = {
    label,
    formatter: TooltipSetting.dev_activity.formatter
  }

  const newSegment = {
    key,
    label,
    queryKey: 'marketSegment',
    domainGroup: 'dev_activity',
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

  Description[
    key
  ] = `Shows the combined development activity of all projects in the ${key} market segment`

  return newSegment
}

export const MarketSegmentFetcher = {
  query: GET_MARKET_SEGMENT_QUERY,
  preTransform: extractTimeseries('devActivity')
}

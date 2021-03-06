import React, { useEffect } from 'react'
import { clearCache, getSyncedColors } from '../../../Chart/Synchronizer'
import {
  getNewMetricsByType,
  getOldMetricsByType,
  getSlugFromSignalTarget,
  isNewTypeSignal
} from '../../utils/utils'
import { DAILY_ACTIVE_ADDRESSES } from '../../utils/constants'
import {
  cleanByDatakeys,
  makeSameRange,
  mapToRequestedMetrics,
  mapWithTimeseries,
  mapWithTimeseriesAndYCoord
} from './utils'
import { Metric } from '../../../dataHub/metrics'
import GetTimeSeries from '../../../GetTimeSeries/GetTimeSeries'
import VisualBacktestChart, { GetReferenceDots } from '../VisualBacktestChart'
import { getMetricYAxisId } from '../../../SANCharts/utils'
import { getAvailableCooldown, PreviewLoader } from './SignalPreview'

const SignalPreviewChart = ({
  target,
  type: oldSignalType,
  timeRange,
  label,
  points,
  showTitle,
  trigger
}) => {
  useEffect(() => clearCache, [])

  let triggeredSignals = points.filter(point => point['triggered?'])

  const isNew = isNewTypeSignal(trigger)

  const { metrics, triggersBy } = isNew
    ? getNewMetricsByType(trigger)
    : getOldMetricsByType(oldSignalType)

  const isStrongDaily = oldSignalType === DAILY_ACTIVE_ADDRESSES

  const { cooldown } = trigger

  const metricsInterval = isStrongDaily ? '1d' : getAvailableCooldown(cooldown)

  const { eth_address, address = eth_address } = target || {}

  const metricRest = {
    address
  }

  const slug = getSlugFromSignalTarget(trigger)

  if (!slug) {
    return null
  }

  const requestedMetrics = mapToRequestedMetrics(metrics, {
    timeRange,
    interval: metricsInterval,
    slug,
    ...metricRest
  })

  const metricsForSignalsChart = metrics.map(metric =>
    metric === Metric.price_usd ? Metric.historyPricePreview : metric
  )

  const syncedColors = getSyncedColors(metricsForSignalsChart)

  return (
    <GetTimeSeries
      metrics={requestedMetrics}
      render={({ timeseries }) => {
        if (!timeseries) {
          return PreviewLoader
        }

        const data = mapWithTimeseries(timeseries)
        const merged = cleanByDatakeys(
          data,
          triggersBy.dataKey || triggersBy.key
        )

        triggeredSignals = makeSameRange(triggeredSignals, merged)

        const signals = mapWithTimeseriesAndYCoord(
          triggeredSignals,
          triggersBy,
          merged,
          isStrongDaily
        )

        const referenceDots =
          triggeredSignals.length > 0 && triggersBy
            ? GetReferenceDots(signals, getMetricYAxisId(triggersBy))
            : null

        return (
          <VisualBacktestChart
            data={merged}
            dataKeys={triggersBy}
            label={label}
            triggeredSignals={triggeredSignals}
            metrics={metricsForSignalsChart}
            signals={signals}
            referenceDots={referenceDots}
            syncedColors={syncedColors}
            showTitle={showTitle}
          />
        )
      }}
    />
  )
}

export default SignalPreviewChart

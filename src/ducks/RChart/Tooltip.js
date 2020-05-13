import { useEffect } from 'react'
import COLOR from '@santiment-network/ui/variables.scss'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { setupTooltip, plotTooltip } from '../Chart/tooltip'
import { findPointIndexByDate } from '../Chart/utils'

export default ({
  chart,
  MetricColor,
  tooltipKey = 'price_usd',
  syncedTooltipDate,
  syncTooltips = () => {},
  onPointClick = () => {},
}) => {
  chart.tooltipKey = tooltipKey
  chart.onPointClick = onPointClick

  useEffect(() => {
    Object.assign(chart, initTooltip(chart))

    setupTooltip(chart, marker, syncTooltips)
  }, [])

  useEffect(
    () => {
      if (syncedTooltipDate) {
        const point =
          chart.points[findPointIndexByDate(chart.points, syncedTooltipDate)]

        if (point) {
          plotTooltip(chart, marker, point)
        }
      }
    },
    [syncedTooltipDate],
  )

  function marker(ctx, key, value, x, y) {
    const RADIUS = 4

    if (key === 'isAnomaly' || key.includes('_anomaly')) {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = COLOR.persimmon
      ctx.stroke()
    } else {
      ctx.fillStyle = MetricColor[key]
      ctx.fillRect(x, y, 8, 2)
    }
  }

  return null
}

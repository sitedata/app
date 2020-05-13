import { plotLines } from '@santiment-network/chart/lines'

export default ({
  subscribe,
  chart,
  data,
  scale,
  lines,
  MetricColor,
  addPlotter,
}) => {
  /* subscribe(
   *   () => {
   *     console.log('[RChart] Drawing Lines')
   *     chart.ctx.lineWidth = 1.5
   *     plotLines(chart, data, lines, MetricColor, scale)
   *   },
   *   [data, scale, lines, MetricColor],
   * ) */

  addPlotter((chart, res = data) => {
    console.log('[RChart] Drawing Lines')
    chart.ctx.lineWidth = 1.5
    plotLines(chart, res, lines, MetricColor, scale)
  })

  return null
}

/*
export default ({ subscribe, chart, data, scale, lines, MetricColor }) => {
  addPainter(
    (chart) => {
      console.log('[RChart] Drawing Lines')
      chart.ctx.lineWidth = 1.5
      plotLines(chart, data, lines, MetricColor, scale)
    },
    [data, scale, lines, MetricColor],
  )

  return null
}
*/

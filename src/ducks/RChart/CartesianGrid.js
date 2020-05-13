import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'

export default ({ subscribe, chart, isNightModeEnabled }) => {
  subscribe(
    () => {
      console.log('[RChart] Drawing CartesianGrid', chart.axesColor)
      drawCartesianGrid(chart, chart.axesColor)
    },
    [isNightModeEnabled],
  )

  return null
}

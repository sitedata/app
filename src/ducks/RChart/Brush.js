import { useEffect, useState } from 'react'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import { BRUSH_HEIGHT } from '../Chart/settings'
import { clearCtx } from '../Chart/utils'
import styles from './Brush.module.scss'

export default ({ subscribe, chart, data, plotters }) => {
  let [brush, setBrush] = useState()

  if (brush) {
    brush.plotBrushData = plotBrushData
    brush.onChange = onBrushChange
  }

  useEffect(() => {
    const width = chart.canvas.parentNode.offsetWidth

    brush = initBrush(
      chart,
      width,
      BRUSH_HEIGHT,
      chart.brushPaintConfig,
      plotBrushData,
      onBrushChange,
    )
    brush.canvas.classList.add(styles.brush)
    setBrush(brush)
  }, [])

  useEffect(
    () => {
      if (data.length && brush) {
        brush.startIndex = 0
        brush.endIndex = data.length - 1
      }
    },
    [data],
  )

  subscribe(
    () => {
      if (brush) {
        updateBrushState(brush, chart, data)
        clearCtx(brush)
        plotBrushData()
      }
    },
    [data],
  )

  function onBrushChange(startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    chart.updateState(newData)

    plotters.forEach((fn) => fn(chart, newData))
    /* plotChart(newData) */
  }

  function plotBrushData() {
    plotters.forEach((fn) => fn(brush))
  }

  return null
}

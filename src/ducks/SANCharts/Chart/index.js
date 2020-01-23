import React, { useState, useEffect, useRef } from 'react'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { plotLines } from '@santiment-network/chart/line'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import { drawReferenceDot } from '@santiment-network/chart/references'
import {
  initBrush,
  setupBrush,
  updateBrushState
} from '@santiment-network/chart/brush'
import { plotAxes } from './axes'
import { setupTooltip, plotTooltip } from './tooltip'
import { clearCtx, findPointIndexByDate } from './utils'
import {
  BRUSH_HEIGHT,
  CHART_PADDING,
  CHART_WITH_BRUSH_PADDING
} from './settings'
import { drawWatermark } from './watermark'
import { drawPaywall } from './paywall'
import { onResize } from './resize'
import { drawLastDayPrice, withLastDayPrice } from './lastDayPrice'
import Signals from './Signals'

import styles from './index.module.scss'

const Chart = ({
  slug,
  chartRef,
  data,
  scale = linearScale,
  syncedColors,
  lines,
  bars,
  daybars,
  events = [],
  leftBoundaryDate,
  rightBoundaryDate,
  tooltipKey,
  isMultiChartsActive,
  syncedTooltipDate,
  syncTooltips = () => {},
  isAdvancedView,
  isWideChart,
  onPointHover = () => {},
  hasPremium,
  lastDayPrice
}) => {
  let [chart, setChart] = useState()
  let [brush, setBrush] = useState()
  const canvasRef = useRef()

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    chart = initTooltip(
      initChart(
        canvas,
        width,
        350,
        isMultiChartsActive ? CHART_PADDING : CHART_WITH_BRUSH_PADDING
      )
    )
    chart.tooltipKey = tooltipKey

    if (!isMultiChartsActive) {
      brush = initBrush(chart, width, BRUSH_HEIGHT)
      brush.canvas.classList.add(styles.brush)
      setBrush(brush)
    }

    setChart(chart)
    chartRef.current = canvas

    setupTooltip(chart, marker, syncTooltips, onPointHover)
  }, [])

  useEffect(
    () => {
      if (data.length === 0) {
        return
      }

      console.log('[data || scale || events] change')
      clearCtx(chart)
      updateChartState(chart, data, daybars.concat(bars).concat(lines))
      if (brush) {
        clearCtx(brush)
        setupBrush(brush, plotBrushData, onBrushChange)
        updateBrushState(brush, chart, data, plotBrushData)
      }
      plotChart(data)
      plotAxes(chart)
    },
    [data, scale, events, lastDayPrice]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      if (syncedTooltipDate) {
        const point =
          chart.points[findPointIndexByDate(chart.points, syncedTooltipDate)]
        if (point) {
          plotTooltip(chart, marker, point)
        }
      } else {
        clearCtx(chart, chart.tooltip.ctx)
      }
    },
    [syncedTooltipDate]
  )

  useEffect(
    () => {
      chart.tooltipKey = tooltipKey
    },
    [tooltipKey]
  )

  useEffect(
    () => {
      onResize(
        chart,
        isMultiChartsActive ? CHART_PADDING : CHART_WITH_BRUSH_PADDING,
        brush,
        data,
        plotBrushData,
        onBrushChange
      )
    },
    [isAdvancedView, isWideChart]
  )

  function onBrushChange (startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(chart, newData, daybars.concat(bars).concat(lines))

    clearCtx(chart)
    plotChart(newData)
    plotAxes(chart)
  }

  function plotBrushData () {
    plotDayBars(brush, data, daybars, syncedColors, scale)
    plotBars(brush, data, bars, syncedColors, scale)
    plotLines(brush, data, lines, syncedColors, scale)
  }

  function plotChart (data) {
    drawWatermark(chart)
    plotDayBars(chart, data, daybars, syncedColors, scale)
    plotBars(chart, data, bars, syncedColors, scale)

    chart.ctx.lineWidth = 1.5
    chart.ctx.setLineDash([0])
    plotLines(chart, data, lines, syncedColors, scale)

    events.forEach(({ metric, key, datetime, value, color }) =>
      drawReferenceDot(chart, metric, datetime, color, key, value)
    )

    if (lastDayPrice) {
      drawLastDayPrice(chart, scale, lastDayPrice)
    }

    if (!hasPremium) {
      drawPaywall(chart, leftBoundaryDate, rightBoundaryDate)
    }
  }

  function marker (ctx, key, value, x, y) {
    const RADIUS = 4
    if (key === 'isAnomaly') {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'red'
      ctx.stroke()
    } else if (key === 'trendingPosition') {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = value[1]
      ctx.stroke()
    } else {
      ctx.fillStyle = syncedColors[key]
      ctx.fillRect(x, y, 8, 2)
    }
  }

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} />
      <Signals chart={chart} data={data} slug={slug} scale={scale} />
    </div>
  )
}

export default withLastDayPrice(Chart)
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import COLOR from '@santiment-network/ui/variables.scss'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { plotLines } from '@santiment-network/chart/lines'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import { drawReferenceDot } from '@santiment-network/chart/references'
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'
import { initBrush, updateBrushState } from '@santiment-network/chart/brush'
import Loader from './Loader/Loader'
import Signals from './Signals'
import { plotAxes } from './axes'
import { setupTooltip, plotTooltip } from './tooltip'
import {
  CHART_HEIGHT,
  BRUSH_HEIGHT,
  CHART_PADDING,
  CHART_WITH_BRUSH_PADDING
} from './settings'
import { drawWatermark } from './watermark'
import { drawPaywall } from './paywall'
import { onResize, useResizeEffect } from './resize'
import { drawLastDayPrice, withLastDayPrice } from './lastDayPrice'
import { clearCtx, findPointIndexByDate } from './utils'
import { paintConfigs, dayBrushPaintConfig } from './paintConfigs'
import styles from './index.module.scss'

const Chart = ({
  className,
  chartRef,
  metrics,
  data,
  lines,
  bars,
  daybars,
  joinedCategories,
  events = [],
  scale = linearScale,
  slug,
  leftBoundaryDate,
  rightBoundaryDate,
  tooltipKey,
  lastDayPrice,
  MetricColor,
  syncedTooltipDate,
  syncTooltips = () => {},
  onPointHover = () => {},
  isLoading,
  isMultiChartsActive,
  isNightModeEnabled,
  isCartesianGridActive,
  resizeDependencies,
  children
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
        CHART_HEIGHT,
        isMultiChartsActive ? CHART_PADDING : CHART_WITH_BRUSH_PADDING
      )
    )
    chart.tooltipKey = tooltipKey

    if (!isMultiChartsActive) {
      brush = initBrush(
        chart,
        width,
        BRUSH_HEIGHT,
        dayBrushPaintConfig,
        plotBrushData,
        onBrushChange
      )
      brush.canvas.classList.add(styles.brush)
      setBrush(brush)
    }

    setChart(chart)
    if (chartRef) {
      chartRef.current = canvas
    }

    setupTooltip(chart, marker, syncTooltips)
  }, [])

  if (brush) {
    // NOTE: Because func.component works with closures, captured values might be outdated [@vanguard | Jan 23, 2020]
    brush.plotBrushData = plotBrushData
    brush.onChange = onBrushChange
  }

  useEffect(
    () => {
      const { brushPaintConfig, ...rest } = paintConfigs[+isNightModeEnabled]

      Object.assign(chart, rest)

      if (brush) {
        brush.paintConfig = brushPaintConfig
      }
    },
    [isNightModeEnabled]
  )

  useEffect(
    () => {
      chart.onPointHover = onPointHover
    },
    [onPointHover]
  )

  useEffect(
    () => {
      chart.tooltipKey = tooltipKey
    },
    [tooltipKey]
  )

  useEffect(
    () => {
      chart.colors = MetricColor
    },
    [MetricColor]
  )

  useEffect(
    () => {
      if (data.length === 0 || !brush) return

      brush.startIndex = 0
      brush.endIndex = data.length - 1
    },
    [data]
  )

  useEffect(
    () => {
      if (data.length === 0) return

      clearCtx(chart)
      updateChartState(chart, data, joinedCategories)
      if (brush) {
        clearCtx(brush)
        updateBrushState(brush, chart, data)
      }
      plotChart(data)
      plotAxes(chart)
    },
    [
      data,
      scale,
      events,
      MetricColor,
      lastDayPrice,
      isNightModeEnabled,
      isCartesianGridActive
    ]
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

  useEffect(handleResize, resizeDependencies)

  useResizeEffect(handleResize, [...resizeDependencies, data, brush])

  function handleResize () {
    if (data.length === 0) {
      return
    }

    onResize(
      chart,
      isMultiChartsActive ? CHART_PADDING : CHART_WITH_BRUSH_PADDING,
      brush,
      data
    )

    if (!brush) {
      updateChartState(chart, data, joinedCategories)
      plotChart(data)
      plotAxes(chart)
    }
  }

  function onBrushChange (startIndex, endIndex) {
    const newData = data.slice(startIndex, endIndex + 1)

    updateChartState(chart, newData, joinedCategories)

    clearCtx(chart)
    plotChart(newData)
    plotAxes(chart)
  }

  function plotBrushData () {
    plotDayBars(brush, data, daybars, MetricColor, scale)
    plotBars(brush, data, bars, MetricColor, scale)
    plotLines(brush, data, lines, MetricColor, scale)
  }

  function plotChart (data) {
    drawWatermark(chart)
    plotDayBars(chart, data, daybars, MetricColor, scale)
    plotBars(chart, data, bars, MetricColor, scale)

    chart.ctx.lineWidth = 1.5
    plotLines(chart, data, lines, MetricColor, scale)

    if (isCartesianGridActive) {
      drawCartesianGrid(chart, chart.axesColor)
    }

    events.forEach(({ metric, key, datetime, value, color }) =>
      drawReferenceDot(chart, metric, datetime, color, key, value)
    )

    if (lastDayPrice) {
      drawLastDayPrice(chart, scale, lastDayPrice)
    }

    drawPaywall(chart, leftBoundaryDate, rightBoundaryDate)
  }

  function marker (ctx, key, value, x, y) {
    const { colors } = chart
    const RADIUS = 4

    if (key === 'isAnomaly' || key.includes('_anomaly')) {
      ctx.beginPath()
      ctx.arc(x + RADIUS, y + 1, RADIUS, 0, 2 * Math.PI)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = COLOR.persimmon
      ctx.stroke()
    } else {
      ctx.fillStyle = colors[key]
      ctx.fillRect(x, y, 8, 2)
    }
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      <Signals
        chart={chart}
        data={data}
        slug={slug}
        scale={scale}
        metrics={metrics}
      />
      {isLoading && <Loader />}
      {chart &&
        React.Children.map(
          children,
          child =>
            child &&
            React.cloneElement(child, {
              chart,
              scale
            })
        )}
    </div>
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled
})

export default connect(mapStateToProps)(withLastDayPrice(Chart))

import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { initChart, updateChartState } from '@santiment-network/chart'
import { initTooltip } from '@santiment-network/chart/tooltip'
import { plotLines } from '@santiment-network/chart/lines'
import { plotDayBars, plotBars } from '@santiment-network/chart/bars'
import { linearScale } from '@santiment-network/chart/scales'
import ChartLoader from "../../../ducks/Chart/Loader/Loader";
import {plotAxes} from "../../../ducks/Chart/axes";
import {clearCtx, findPointIndexByDate} from "../../../ducks/Chart/utils";
import {onResize, useResizeEffect} from "../../../ducks/Chart/resize";
import {plotTooltip, setupTooltip} from "../../../ducks/Chart/tooltip";
import {CHART_HEIGHT, CHART_PADDING} from "../../../ducks/Chart/settings";
import {paintConfigs} from "../../../ducks/Chart/paintConfigs";
import {domainModifier} from "../../../ducks/Chart/domain";
import {drawWatermark} from "../../../ducks/Chart/watermark";
import { drawCartesianGrid } from '@santiment-network/chart/cartesianGrid'
import styles from "../../../ducks/Chart/index.module.scss";

const ChartProvider = ({
                 className,
                 chartRef,
                 data,
                 lines,
                 bars,
                 daybars,
                 chartHeight = CHART_HEIGHT,
                 joinedCategories,
                 domainGroups,
                 scale = linearScale,
                 tooltipKey,
                 MetricColor,
                 syncedTooltipDate,
                 syncTooltips = () => {},
                 onRangeSelect,
                 onPointClick = () => {},
                 isLoading,
                 isNightModeEnabled,
                 resizeDependencies,
                 isCartesianGridActive,
                 children
               }) => {
  let [chart, setChart] = useState()
  const canvasRef = useRef()

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    chart = initTooltip(
      initChart(
        canvas,
        width,
        chartHeight,
        CHART_PADDING
      )
    )
    chart.tooltipKey = tooltipKey

    setChart(chart)
    if (chartRef) {
      chartRef.current = canvas
    }

    console.log('chart.minMaxes', chart.minMaxes)

    setupTooltip(chart, marker, syncTooltips)
  }, [])

  console.log('chart', chart)

  useEffect(
    () => {
      const { brushPaintConfig, ...rest } = paintConfigs[+isNightModeEnabled]

      Object.assign(chart, rest)
    },
    [isNightModeEnabled]
  )

  useEffect(
    () => {
      chart.onRangeSelect = onRangeSelect
    },
    [onRangeSelect]
  )

  useEffect(
    () => {
      chart.onPointClick = onPointClick
    },
    [onPointClick]
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
      if (data.length === 0) return

      console.log('chart.minMaxes 2', chart.minMaxes)

      clearCtx(chart)
      console.log('chart.minMaxes 2.1', chart.minMaxes)
      updateChartState(
        chart,
        data,
        joinedCategories,
        domainModifier,
        domainGroups
      )
      console.log('chart.minMaxes 2.5', chart.minMaxes)
      plotChart(data)
      plotAxes(chart, scale)
      console.log('chart.minMaxes 3', chart.minMaxes)
    },
    [
      data,
      scale,
      domainGroups,
      MetricColor,
      isNightModeEnabled,
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
      console.log('chart.minMaxes 4', chart.minMaxes)
    },
    [syncedTooltipDate]
  )

  useEffect(handleResize, resizeDependencies)

  useResizeEffect(handleResize, [...resizeDependencies, data])

  function handleResize () {
    if (data.length === 0) {
      return
    }
    console.log('chart.minMaxes 5', chart.minMaxes)

    onResize(
      chart,
      CHART_PADDING,
      undefined,
      data,
      chartHeight
    )

    updateChartState(
      chart,
      data,
      joinedCategories,
      domainModifier,
      domainGroups
    )
    console.log('chart.minMaxes a', chart.minMaxes)
    plotChart(data)
    plotAxes(chart, scale)
    console.log('chart.minMaxes 6', chart.minMaxes)
  }

  function plotChart (data) {
    console.log('chart.minMaxes 7', chart.minMaxes)
    drawWatermark(chart, isNightModeEnabled)
    plotDayBars(chart, data, daybars, MetricColor, scale)
    plotBars(chart, data, bars, MetricColor, scale)

    if (isCartesianGridActive) {
      drawCartesianGrid(chart, chart.axesColor)
    }

    chart.ctx.lineWidth = 1.5
    plotLines(chart, data, lines, MetricColor, scale)
    console.log('chart.minMaxes 8', chart.minMaxes)
  }

  function marker (ctx, key, value, x, y) {
    const { colors } = chart

    ctx.fillStyle = colors[key]
    ctx.fillRect(x, y, 8, 2)
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      {isLoading && <ChartLoader />}
      {chart &&
      React.Children.map(
        children,
        child =>
          child &&
          React.cloneElement(child, {
            chart,
            scale,
            data
          })
      )}
    </div>
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled
})

export default connect(mapStateToProps)(ChartProvider)

import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { initChart, updateChartState } from '@santiment-network/chart'
import { paintConfigs } from '../Chart/paintConfigs'
import { clearCtx } from '../Chart/utils'
import cx from 'classnames'
import styles from './index.module.scss'

function useSubscriber(data) {
  const [scheduledUpdate, setScheduledUpdate] = useState()

  function scheduleUpdate() {
    console.log('Schedulling update')
    setScheduledUpdate(Date.now())
  }

  return function subscriber(fn, deps) {
    useEffect(
      () => {
        if (scheduledUpdate && data.length) fn()
      },
      [scheduledUpdate],
    )

    useEffect(scheduleUpdate, deps)
  }
}

function usePlotters(deps) {
  const [plotters, setPlotters] = useState(new Set())

  function addPlotter(plotter) {
    useEffect(() => {
      setPlotters((plotters) => {
        const newPlotters = new Set(plotters)
        newPlotters.add(plotter)
        return newPlotters
      })

      return () => {
        setPlotters((plotters) => {
          const newPlotters = new Set(plotters)
          newPlotters.delete(plotter)
          return newPlotters
        })
      }
    }, deps)
  }

  return [plotters, addPlotter]
}

const Chart = ({
  height,
  padding,
  scale,
  data,
  chartRef,
  className,
  children,
  joinedCategories,
  domainModifier,
  domainGroups,
  MetricColor,
  isNightModeEnabled,
}) => {
  let [chart, setChart] = useState()
  const subscribe = useSubscriber(data)
  const canvasRef = useRef()
  const [plotters, addPlotter] = usePlotters([
    data,
    scale,
    joinedCategories,
    MetricColor,
  ])

  console.log('--- RENDER ---')

  useEffect(() => {
    const { current: canvas } = canvasRef
    const width = canvas.parentNode.offsetWidth

    chart = initChart(canvas, width, height, padding)
    setChart(chart)

    if (chartRef) {
      chartRef.current = canvas
    }
  }, [])

  useEffect(
    () => {
      if (data.length === 0) return

      console.log('[RChart] Update state called')
      updateState()
      chart.updateState = updateState
    },
    [data, joinedCategories, domainModifier, domainGroups],
  )

  useEffect(
    () => {
      console.log('[RChart] Updating color')
      Object.assign(chart, paintConfigs[+isNightModeEnabled])
      clearCtx(chart)
    },
    [isNightModeEnabled],
  )

  const reactChildren =
    chart &&
    React.Children.map(
      children,
      (child) =>
        child &&
        React.cloneElement(child, {
          chart,
          scale,
          data,
          subscribe,
          MetricColor,
          isNightModeEnabled,
          plotters,
          addPlotter,
        }),
    )

  subscribe(
    () => {
      plotters.forEach((fn) => fn(chart))
    },
    [data, scale, joinedCategories, MetricColor],
  )

  function updateState(newData = data) {
    updateChartState(
      chart,
      newData,
      joinedCategories,
      domainModifier,
      domainGroups,
    )
    clearCtx(chart)
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <canvas ref={canvasRef} />
      {reactChildren}
    </div>
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled,
})

export default connect(mapStateToProps)(Chart)

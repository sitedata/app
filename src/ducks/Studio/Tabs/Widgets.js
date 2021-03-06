import React, { useState, useMemo } from 'react'
import StudioHeader from '../Header'
import Sidepanel from '../Chart/Sidepanel'
import { SPENT_COIN_COST } from '../Chart/Sidepanel/panes'
import { ONE_HOUR_IN_MS } from '../../../utils/dates'
import styles from './Widgets.module.scss'

const Chart = ({
  settings,
  widgets,
  sidepanel,
  setWidgets,
  toggleSidepanel,
  changeTimePeriod,
  onProjectSelect,
  ...props
}) => {
  const [syncedTooltipDate, syncTooltips] = useState()
  const [isSelectingRange, setIsSelectingRange] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDatesRange, setSelectedDatesRange] = useState()

  const isSingleWidget = widgets.length === 1
  const onWidgetPointClick = sidepanel ? onPointClick : undefined
  const allMetrics = useMemo(
    () => widgets.map(({ metrics }) => metrics).flat(),
    [widgets]
  )

  function changeDatesRange (from, to) {
    setSelectedDate()
    setSelectedDatesRange([from, to])
  }

  function onRangeSelect ({ value: leftDate }, { value: rightDate }) {
    setIsSelectingRange(false)
    if (leftDate === rightDate) return

    const dates =
      leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate]
    const from = new Date(dates[0])
    const to = new Date(dates[1])

    if (sidepanel === SPENT_COIN_COST) {
      return changeDatesRange(from, to)
    }

    if (to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to)
    }
  }

  function onRangeSelectStart () {
    setIsSelectingRange(true)
  }

  function onPointClick ({ value }) {
    setSelectedDate(new Date(value))
    setSelectedDatesRange()
  }

  return (
    <>
      <StudioHeader
        settings={settings}
        widgets={widgets}
        sidepanel={sidepanel}
        metrics={allMetrics}
        setWidgets={setWidgets}
        changeTimePeriod={changeTimePeriod}
        toggleSidepanel={toggleSidepanel}
        onProjectSelect={onProjectSelect}
      />
      <div className={styles.content}>
        <div className={styles.widgets}>
          {widgets.map(widget => (
            <widget.Widget
              {...props}
              key={widget.id}
              settings={settings}
              widget={widget}
              isSingleWidget={isSingleWidget}
              isSelectingRange={isSelectingRange}
              changeTimePeriod={changeTimePeriod}
              syncedTooltipDate={syncedTooltipDate}
              syncTooltips={syncTooltips}
              onPointClick={onWidgetPointClick}
              onRangeSelect={onRangeSelect}
              onRangeSelectStart={onRangeSelectStart}
            />
          ))}
        </div>

        {sidepanel && (
          <Sidepanel
            className={styles.side}
            project={settings}
            chartSidepane={sidepanel}
            metrics={allMetrics}
            toggleChartSidepane={toggleSidepanel}
            date={selectedDate}
            datesRange={selectedDatesRange}
          />
        )}
      </div>
    </>
  )
}

export default Chart

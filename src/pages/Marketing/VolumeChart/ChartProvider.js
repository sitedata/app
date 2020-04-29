import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import {
  ComposedChart, XAxis, Text, CartesianGrid, Tooltip,
   ResponsiveContainer,
} from 'recharts';
import ChartTooltip from "../../../ducks/SANCharts/tooltip/CommonChartTooltip";
import {getDateFormats} from "../../../utils/dates";
import {formatNumber } from "../../../utils/formatting";
import {generateMetricsMarkup } from "../../../ducks/SANCharts/utils";
import styles from "../../../ducks/Chart/index.module.scss";

const formatTooltipDatetime = datetime => {
  const { DD, MMM, YY } = getDateFormats(new Date(datetime))
  return `${MMM} ${DD}, ${YY}`
}

const tooltipValueFormatter = ({ value, payload }) => {
  if(payload && payload[0]){
    const point = payload[0];

    console.log(point)

    return `${formatNumber(value)} - ${point.payload.slug}`
  }
}

const metrics = [{
  dataKey: 'aggregatedTimeseriesData',
  key: 'aggregatedTimeseriesData',
  node: 'bar',
  label: 'Price/volume',
  yAxisParams: {
    hide: false,
    axisLine: false,
    tickLine: false,
    stroke: 'var(--casper)'
  }
}]

const syncedColors = {
  'aggregatedTimeseriesData': '#5275ff'
}

const ChartProvider = ({
                 className,
  data,
               }) => {
  const markup = generateMetricsMarkup(metrics, {  syncedColors })

  console.log(data)

  const xTicks = data.map(({slug}) => slug)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          % Change Price Returns by 100 Market Caps
        </div>
      </div>

      <div className={cx(styles.wrapper, className)}>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            data={data}
            margin={{
              top: 20, right: 0, bottom: 20, left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke='var(--porcelain)'
            />

            <XAxis dataKey="slug" angle={-90} stroke='var(--rhino)' textAnchor="end" tickCount={data.length} allowDataOverflow axisLine={false} tickLine={false} interval={0}

            />

            {markup}

            <Tooltip
              content={
                <ChartTooltip
                  withLabel={false}
                  showName={false}
                  labelFormatter={formatTooltipDatetime}
                  valueFormatter={tooltipValueFormatter}
                  className={styles.tooltip}
                />
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      </div>
  )
}

const mapStateToProps = ({ rootUi: { isNightModeEnabled } }) => ({
  isNightModeEnabled
})

export default connect(mapStateToProps)(ChartProvider)

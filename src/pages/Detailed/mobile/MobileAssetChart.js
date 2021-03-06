import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot
} from 'recharts'
import throttle from 'lodash.throttle'
import Gradients from '../../../components/WatchlistOverview/Gradients'
import { tooltipLabelFormatter } from '../../../ducks/SANCharts/CustomTooltip'
import { generateMetricsMarkup } from '../../../ducks/SANCharts/utils'
import { clearCache } from '../../../ducks/Chart/Synchronizer'
import Loader from '../../../ducks/Chart/Loader/Loader'
import CommonChartTooltip from '../../../ducks/SANCharts/tooltip/CommonChartTooltip'
import MobilePriceTooltip from '../../../ducks/SANCharts/tooltip/MobilePriceTooltip'
import IcoPriceTooltip from '../../../ducks/SANCharts/tooltip/IcoPriceTooltip'
import styles from './MobileAssetChart.module.scss'

const MobileAssetChart = ({
  data = [],
  slug: asset,
  icoPrice,
  metrics = [],
  syncedColors,
  setIcoPricePos,
  icoPricePos,
  chartHeight,
  isLoading = true,
  isLandscapeMode,
  events = [],
  eventsObj = {},
  ...props
}) => {
  const [isTouch, setIsTouch] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const markup = generateMetricsMarkup(metrics, {
    syncedColors,
    useShortName: true,
    activeLineDataKey: 'price_usd',
    showActiveDot: false
  })

  const chartMediumIndex = data.length / 2

  const hideTooltipItem = key => key === 'price_usd'

  const setCurrentIndex = throttle(
    evt => setActiveIndex(evt ? evt.activeTooltipIndex : null),
    800
  )

  useEffect(() => clearCache)
  return (
    <div
      onTouchStart={() => setIsTouch(true)}
      onTouchEnd={() => setIsTouch(false)}
      onTouchCancel={() => setIsTouch(false)}
      className={styles.chart}
    >
      {icoPrice && icoPricePos !== null && !isTouch && (
        <IcoPriceTooltip y={icoPricePos} value={icoPrice} />
      )}
      {isLoading && <Loader className={styles.loader} />}
      <ResponsiveContainer width='100%' height={chartHeight}>
        <ComposedChart
          data={data}
          onMouseMove={setCurrentIndex}
          margin={{ left: 0, right: 0 }}
        >
          <defs>
            <Gradients />
          </defs>
          <XAxis dataKey='datetime' hide />
          <YAxis
            hide
            domain={[
              dataMin => {
                if (isFinite(dataMin) && icoPrice - dataMin < 0) {
                  setIcoPricePos(0)
                }

                return dataMin
              },
              dataMax => {
                if (isFinite(dataMax) && icoPrice - dataMax > 0) {
                  setIcoPricePos(0)
                }

                return dataMax
              }
            ]}
            dataKey={'price_usd'}
          />
          {isTouch && (
            <Tooltip
              isAnimationActive={false}
              cursor={{ stroke: 'var(--casper)' }}
              position={{ x: 0, y: isLandscapeMode ? -49 : -62.5 }}
              content={props => (
                <>
                  <MobilePriceTooltip
                    {...props}
                    labelFormatter={tooltipLabelFormatter}
                  />
                  <CommonChartTooltip
                    {...props}
                    withLabel={false}
                    className={cx(
                      styles.tooltip,
                      activeIndex < chartMediumIndex &&
                        metrics.length > 2 &&
                        styles.rightAlign
                    )}
                    hideItem={hideTooltipItem}
                    events={eventsObj}
                    metrics={metrics}
                  />
                </>
              )}
            />
          )}
          {markup}
          {events.map(({ datetime, metric, color, y, key }) => (
            <ReferenceDot
              key={datetime + key + metric}
              yAxisId={'axis-' + metric}
              x={datetime}
              y={y}
              ifOverflow='extendDomain'
              r={4}
              isFront
              stroke='var(--white)'
              strokeWidth='2px'
              fill={color}
            />
          ))}
          {icoPrice && (
            <ReferenceLine
              strokeDasharray='5 5'
              stroke={isTouch ? 'transparent' : 'var(--waterloo)'}
              yAxisId='axis-price_usd'
              y={icoPrice}
              label={({ viewBox: { y } }) => setIcoPricePos(y)}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

const mapSizesToProps = ({ width, height }) => ({
  chartHeight: (width > height ? height : width) / 2,
  isLandscapeMode: width > height
})

export default withSizes(mapSizesToProps)(MobileAssetChart)

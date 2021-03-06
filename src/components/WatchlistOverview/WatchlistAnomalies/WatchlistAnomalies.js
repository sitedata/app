import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import { filteringTypes } from '../constants'
import Range from '../Range'
import Stat from '../Stat'
import HelpTooltip from './HelpTooltip'
import styles from './WatchlistAnomalies.module.scss'

const WatchlistAnomalies = ({
  assetsAmount,
  range: { value },
  changeRange,
  trends = [],
  onFilterAssets,
  type,
  toggleOpenAnomalies,
  isOpen,
  isDesktop = true
}) => {
  const isTrendsFilter = type === filteringTypes.TRENDS
  const trendsIds = trends.map(({ id }) => id)
  const totalAnomalies = new Set(trendsIds)
  return trends.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div
          className={styles.top}
          onClick={isDesktop ? null : toggleOpenAnomalies}
        >
          <Icon type='flash' className={styles.icon} />
          {isDesktop || isOpen ? (
            <Range
              label='Anomalies'
              range={value}
              changeRange={event => {
                event.stopPropagation()
                changeRange()
              }}
            />
          ) : (
            <Stat
              name={`Anomalies, ${value}:`}
              values={[
                `${totalAnomalies.size} asset${
                  totalAnomalies.size > 1 ? 's' : ''
                } / ${assetsAmount}`
              ]}
            />
          )}
          {!isDesktop && (
            <Icon
              type={`arrow-${isOpen ? 'up' : 'down'}`}
              className={styles.arrow}
            />
          )}
        </div>
        {(isDesktop || isOpen) && (
          <div className={styles.bottom}>
            <Button
              variant='flat'
              border
              className={cx(styles.button, isTrendsFilter && styles.active)}
              onClick={() => onFilterAssets(trends, filteringTypes.TRENDS)}
            >
              <Stat
                name='Trending assets:'
                values={[trends.length]}
                className={isTrendsFilter && styles.stat}
              />
            </Button>
          </div>
        )}
        {isDesktop && <HelpTooltip />}
      </div>
      {!isDesktop && type && (
        <div className={styles.filterDescription}>
          Showed based on {type} anomalies
        </div>
      )}
    </div>
  ) : null
}

export default WatchlistAnomalies

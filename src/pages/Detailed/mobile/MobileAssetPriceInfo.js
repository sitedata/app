import React, { useState } from 'react'
import { formatNumber } from '../../../utils/formatting'
import Widget from '../../../components/PriceChangesWidget/PriceChangesWidget'
import styles from './MobileAssetPriceInfo.module.scss'

const MobileAssetPriceInfo = ({
  priceUsd,
  percentChange24h,
  percentChange7d,
  ...props
}) => {
  const RANGES = [
    { range: '24h', value: percentChange24h },
    { range: '7d', value: percentChange7d }
  ]

  let [activeRange, setActiveRange] = useState(0)

  const changeRange = () => {
    const nextRangeIndex = ++activeRange
    setActiveRange(nextRangeIndex >= RANGES.length ? 0 : nextRangeIndex)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.priceBlock}>
        <div className={styles.priceUsd}>
          {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
        </div>
      </div>
      <Widget
        {...props}
        price={priceUsd}
        onChangeRange={changeRange}
        changes={RANGES[activeRange].value}
        range={RANGES[activeRange].range}
        className={styles.priceWidget}
      />
    </div>
  )
}

export default MobileAssetPriceInfo

import cx from 'classnames'

import React from 'react'
import { useKeyDown } from './hooks'
import { SvgNew } from '../../components/Watchlists/NewWatchlistCard'
import ChartPreview from './ChartPreview'
/* import styles from './index.module.scss' */
import styles from './Overview.module.scss'

const Overview = ({
  widgets,
  children,
  onClose,
  onWidgetClick,
  onNewChartClick,
  useWidgetMessage,
  ...props
}) => {
  useKeyDown(onClose, 'Escape')

  return (
    <div className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={styles.grid}>
          {widgets.map((widget, i) => (
            <ChartPreview
              key={widget.id}
              widget={widget}
              onClick={onWidgetClick}
              useWidgetMessage={useWidgetMessage}
            />
          ))}
          <div
            className={cx(styles.item, styles.item_new)}
            onClick={onNewChartClick}
          >
            <SvgNew />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Overview

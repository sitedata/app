import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Icon from '@santiment-network/ui/Icon'
import MetricButton from './MetricButton'
import { NO_GROUP } from '../utils'
import styles from './index.module.scss'

const Group = ({
  title,
  nodes,
  activeMetrics,
  toggleMetric,
  isBeta,
  setMetricSettingMap,
  project
}) => {
  const hasGroup = title !== NO_GROUP
  const [hidden, setHidden] = useState(hasGroup)

  function onToggleClick () {
    setHidden(!hidden)
  }

  return (
    <>
      {hasGroup && (
        <h4 className={styles.group} onClick={onToggleClick}>
          {title}
          <Icon
            type='arrow-up'
            className={cx(styles.toggle, hidden && styles.toggle_active)}
          />
        </h4>
      )}
      <div
        className={cx(styles.group__list, hidden && styles.group__list_hidden)}
      >
        {nodes.map(({ item, subitems }) => {
          if (item.hidden) {
            return null
          }

          if (item.isBeta && !isBeta) {
            return null
          }

          return (
            <Fragment key={item.key}>
              <MetricButton
                metric={item}
                label={item.label}
                onClick={() => toggleMetric(item)}
                setMetricSettingMap={setMetricSettingMap}
                project={project}
                isActive={activeMetrics.includes(item)}
              />
              {subitems &&
                subitems.map(subitem => (
                  <MetricButton
                    metric={subitem}
                    key={subitem.key}
                    className={styles.advanced}
                    label={subitem.label}
                    onClick={() => toggleMetric(subitem)}
                    project={project}
                  />
                ))}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isBeta: state.rootUi.isBetaModeEnabled
})

export default connect(mapStateToProps)(Group)

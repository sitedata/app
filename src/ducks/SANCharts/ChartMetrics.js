import React, { Component } from 'react'
import Label from '@santiment-network/ui/Label'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import { PROJECT_METRICS_BY_SLUG_QUERY } from './gql'
import { Metrics } from './utils'
import styles from './ChartPage.module.scss'
import isEqual from 'lodash.isequal'

class ChartMetrics extends Component {
  state = {
    metrics: new Set(this.props.defaultActiveMetrics)
  }

  setMetrics = metrics => {
    const { onMetricsChange } = this.props
    this.setState({ metrics: new Set([...metrics]) }, () =>
      onMetricsChange([...this.state.metrics])
    )
  }

  onClick = ({ currentTarget }) => {
    const { metrics } = this.state
    const { onMetricsChange } = this.props
    const { metric } = currentTarget.dataset

    if (metrics.has(metric)) {
      metrics.delete(metric)
      this.setMetrics(metrics)
      return
    }

    this.setState(
      {
        metrics: new Set([...metrics, metric])
      },
      () => onMetricsChange([...this.state.metrics])
    )
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const { defaultActiveMetrics } = this.props

    const { defaultActiveMetrics: nextMetrics } = nextProps
    if (nextMetrics && !isEqual(defaultActiveMetrics, nextMetrics)) {
      this.setMetrics(nextMetrics)
    }
  }

  render () {
    const { metrics = [] } = this.state
    const { defaultActiveMetrics } = this.props
    const {
      disabledMetrics = [],
      data: {
        project: { availableMetrics = defaultActiveMetrics || [] } = {}
      } = {}
    } = this.props
    const listOfMetrics = this.props.listOfMetrics || Metrics

    return (
      <div className={styles.metrics}>
        {availableMetrics.map(metric => {
          const { color, label = metric } = listOfMetrics[metric] || {}
          return (
            <button
              key={label}
              type='button'
              data-metric={metric}
              className={cx(styles.btn, metrics.has(metric) && styles.active)}
              onClick={this.onClick}
              disabled={disabledMetrics.includes(metric)}
            >
              <Label variant='circle' accent={color} className={styles.label} />
              {label}
            </button>
          )
        })}
      </div>
    )
  }
}

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  skip: ({ showOnlyDefault }) => {
    return showOnlyDefault
  },
  options: ({ slug }) => {
    return { variables: { slug } }
  }
})(ChartMetrics)

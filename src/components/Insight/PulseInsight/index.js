import React from 'react'
import cx from 'classnames'
import toReact from 'svelte-adapter/react'
import SveltePulseInsight from './PulseInsight.svelte'
import styles from './index.module.scss'

const PulseInsight = toReact(SveltePulseInsight, {}, 'div')

const PulseInsightWrapper = ({ insight, className }) => (
  <PulseInsight insight={insight} className={cx(styles.wrapper, className)} />
)

export default PulseInsightWrapper

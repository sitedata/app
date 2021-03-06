import React from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import { couldShowChart } from '../../utils/utils'
import SignalPreview from '../../chart/preview/SignalPreview'
import SignalCard from '../../../../components/SignalCard/card/SignalCard'
import NoSignalPreview from '../../chart/preview/NoSignalPreview'
import { DesktopOnly, MobileOnly } from '../../../../components/Responsive'
import CopySignal from '../../../../components/SignalCard/controls/CopySignal'
import styles from './ShareTriggerForm.module.scss'

const SharedTriggerForm = ({
  id,
  trigger,
  onOpen,
  onCreate,
  settings,
  originalTrigger,
  isAuthor
}) => {
  const { metric } = settings

  const {
    settings: originalSettings,
    settings: { target }
  } = originalTrigger
  const showChart = target && couldShowChart(originalSettings)

  return (
    <div className={styles.container}>
      <SignalCard
        id={id}
        signal={trigger}
        showMoreActions={false}
        className={styles.cardPanel}
        showStatus={false}
        isSharedTriggerForm={true}
      />

      <div className={styles.backTesting}>
        {showChart ? (
          <>
            <div className={styles.chartDivider} />
            <div className={styles.preview}>
              <SignalPreview trigger={trigger} type={metric.value} />
            </div>
          </>
        ) : (
          <NoSignalPreview />
        )}
      </div>

      <div className={styles.actions}>
        <DesktopOnly>
          <CopySignal
            signal={trigger}
            label='Add alert'
            onCreate={onCreate}
            classes={styles}
            as='div'
            btnParams={{ variant: 'fill', accent: 'positive' }}
          />
          <Button
            className={styles.btnEdit}
            onClick={() => onOpen(false)}
            border
          >
            {isAuthor ? 'Edit signal' : 'Open signal'}
          </Button>
        </DesktopOnly>

        <MobileOnly>
          <CopySignal
            signal={trigger}
            label='Add alert'
            onCreate={onCreate}
            classes={styles}
            as='div'
            btnParams={{ fluid: true, accent: 'positive' }}
          />
          <Button
            fluid
            className={styles.btnEdit}
            onClick={() => onOpen(false)}
          >
            {isAuthor ? 'Edit signal' : 'Open signal'}
          </Button>
        </MobileOnly>
      </div>
    </div>
  )
}

const mapStateToProps = (state, { userId }) => {
  const { user: { data: { id } = {} } = {} } = state

  return {
    isAuthor: +id === +userId
  }
}

export default connect(mapStateToProps)(SharedTriggerForm)

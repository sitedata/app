import React, { useState, useEffect } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import PageLoader from '../../../components/Loader/PageLoader'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Dialog from '@santiment-network/ui/Dialog'
import SignalMaster from '../signalFormManager/signalMaster/SignalMaster'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import GetSignal from '../common/getSignal'
import { SIGNAL_ROUTES } from '../common/constants'
import SignalAnon from './SignalAnon'
import ConfirmSignalModalClose from './confirmClose/ConfirmSignalModalClose'
import Image from '../../../pages/SonarFeed/sonar_activity_artboard.png'
import styles from './SignalMasterModalForm.module.scss'

const SignalMasterModalForm = ({
  label = 'New signal',
  metaFormSettings,
  canRedirect = true,
  enabled = true,
  triggerId,
  isLoggedIn,
  match,
  trigger: dialogTrigger,
  buttonParams = {},
  dialogProps,
  shareParams = {},
  userId,
  history
}) => {
  const { id: shareId, isShared: isOldShared } = shareParams

  if (!triggerId && match) {
    triggerId = match.params.id
  } else if (isOldShared && shareId) {
    triggerId = shareId
  }

  const hasTrigger = +triggerId > 0

  const [dialogOpenState, setDialogOpenState] = useState(hasTrigger)
  const [dialogTitle, onSetDialogTitle] = useState('')
  const [isApproving, setIsAppoving] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(
    data => {
      setDialogOpenState(hasTrigger)
    },
    [triggerId]
  )

  const { variant, border } = buttonParams

  const onCancelClose = () => {
    setIsAppoving(false)
  }

  const goBack = () => {
    if (hasTrigger) {
      canRedirect && history && history.goBack()
    }
  }

  const onApprove = () => {
    setIsAppoving(false)
    setDialogOpenState(false)

    goBack()
  }

  const onCloseMainModal = () => {
    if (isChanged && isLoggedIn) {
      setIsAppoving(true)
    } else {
      setDialogOpenState(false)
      goBack()
    }
  }

  const formChangedCallback = isChanged => {
    setIsChanged(isChanged)
  }

  return (
    <GetSignal
      triggerId={triggerId}
      render={({ trigger = {}, userId: triggerUserId }) => {
        const { isLoading, isError } = trigger

        let isShared =
          isOldShared || (!!triggerUserId && +userId !== triggerUserId)

        if (isShared && trigger && trigger.trigger) {
          trigger.trigger = { ...trigger.trigger, ...shareParams }
        }

        return (
          <>
            <ConfirmSignalModalClose
              isOpen={isApproving}
              onCancel={onCancelClose}
              onApprove={onApprove}
            />
            <Dialog
              open={dialogOpenState}
              onOpen={() => setDialogOpenState(true)}
              onClose={onCloseMainModal}
              trigger={
                dialogTrigger ||
                signalModalTrigger(
                  isLoggedIn && enabled,
                  label,
                  variant,
                  border
                )
              }
              title={
                !isError && (
                  <>
                    {dialogTitle}
                    {isShared && isLoggedIn && (
                      <Button
                        accent='positive'
                        variant='fill'
                        className={styles.shared}
                      >
                        Shared
                      </Button>
                    )}
                  </>
                )
              }
              classes={styles}
              {...dialogProps}
            >
              <Dialog.ScrollContent className={styles.TriggerPanel}>
                {isError && <NoSignal triggerId={triggerId} />}
                {!isError && isLoading && (
                  <PageLoader className={styles.loading} />
                )}
                {!isError &&
                  !isLoading &&
                  (isLoggedIn ? (
                    <SignalMaster
                      isShared={isShared}
                      trigger={trigger}
                      setTitle={onSetDialogTitle}
                      onClose={() => setDialogOpenState(false)}
                      canRedirect={canRedirect}
                      metaFormSettings={metaFormSettings}
                      formChangedCallback={formChangedCallback}
                    />
                  ) : (
                    <SignalAnon />
                  ))}
              </Dialog.ScrollContent>
            </Dialog>
          </>
        )
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state),
    userId: +state.user.data.id
  }
}

const mapDispatchToProps = dispatch => ({
  redirect: () => {
    dispatch(push(SIGNAL_ROUTES.MY_SIGNALS))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalMasterModalForm)

const signalModalTrigger = (
  isLoggedIn,
  label,
  variant = 'fill',
  border = false
) => (
  <Button
    variant={variant}
    border={border}
    accent='positive'
    disabled={!isLoggedIn}
    className={cx(styles.newSignal)}
  >
    <Icon type='plus-round' className={styles.newSignal__icon} />
    {label}
  </Button>
)

const NoSignal = ({ triggerId }) => (
  <div className={styles.notSignalInfo}>
    <img className={styles.noSignalImage} alt='Artboard' src={Image} />
    Signal with id {triggerId} does not exist.
    <br />
    Or it is a private signal owned by another user.
  </div>
)

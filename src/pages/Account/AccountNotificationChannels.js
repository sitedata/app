import React from 'react'
import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'
import cx from 'classnames'
import { Button, Toggle } from '@santiment-network/ui'
import * as actions from './../../actions/types'
import { fork } from './../../utils/utils'
import styles from './AccountNotificationChannels.module.scss'

export const AccountNotificationChannels = props => (
  <div className={styles.wrapper}>
    <h3>Notification Channels</h3>
    <ul>
      <li className={styles.channelItem}>
        <div className={styles.channelTitle}>Telegram</div>
        <div className={styles.channelSettings}>
          <NotificationChannelStatus isConnected={props.hasTelegramConnected} />
          {ifTelegramConnectedShowToggle(props)}
          {ifTelegramDisconnectedShowSetup(props)}
        </div>
      </li>
      <li className={styles.channelItem}>
        <div className={styles.channelTitle}>Email</div>
        <div className={styles.channelSettings}>
          <NotificationChannelStatus isConnected={props.hasEmail} />
          {ifEmailConnectedShowToggle(props)}
          {ifEmailDisconnectedShowSetup(props)}
        </div>
      </li>
    </ul>
  </div>
)

const ChannelsToggle = ({ toggleAction, isActive }) => (
  <div className={styles.channelToggle}>
    <Toggle onClick={() => toggleAction(!isActive)} isActive={isActive} />
    <small>{isActive ? 'Activated' : 'Not activated'}</small>
  </div>
)

const ifTelegramConnectedShowToggle = fork(
  props => props.hasTelegramConnected,
  ({ signalNotifyTelegram, toggleTelegramNotification }) => (
    <ChannelsToggle
      toggleAction={toggleTelegramNotification}
      isActive={signalNotifyTelegram}
    />
  )
)

const ifTelegramDisconnectedShowSetup = fork(
  props => !props.hasTelegramConnected,
  props => (
    <div>
      <strong>To connect your account:</strong>
      <ul>
        <li>
          You need to add the bot to your Telegram, press this button:{' '}
          {props.telegramDeepLink && (
            <Button
              disabled={props.isTelegramConnecting}
              as={'a'}
              onClick={props.connectTelegram}
              href={props.telegramDeepLink}
              target='_blank'
            >
              {props.isTelegramConnecting ? 'Connecting...' : 'Connect'} to bot
            </Button>
          )}
        </li>
        <li>Your account becomes linked.</li>
        <small>
          Please do not use Telegram Web because it might not be able to open
          that link correctly
        </small>
      </ul>
    </div>
  )
)

const ifEmailConnectedShowToggle = fork(
  props => props.hasEmail,
  ({ signalNotifyEmail, toggleEmailNotification }) => (
    <ChannelsToggle
      toggleAction={toggleEmailNotification}
      isActive={signalNotifyEmail}
    />
  )
)

const ifEmailDisconnectedShowSetup = fork(
  props => !props.hasEmail,
  () => (
    <div>
      {' '}
      <strong>To connect your account:</strong>
      <ul>
        <li>You need to add any email address</li>
        <li>
          Don't forget to confirm your email account. Follow instructions in
          email
        </li>
      </ul>
    </div>
  )
)

const NotificationChannelStatus = ({ isConnected = false }) => (
  <div
    className={cx(styles.NotificationStatus, isConnected && styles.isConnected)}
  >
    {isConnected ? 'Connected' : 'Disconnected'}
  </div>
)

const mapStateToProps = state => ({
  ...state.user.data.settings,
  hasEmail: !!state.user.data.email
})

const mapDispatchToProps = dispatch => ({
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK }),
  revokeTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_REVOKE_TELEGRAM_DEEP_LINK }),
  toggleEmailNotification: signalNotifyEmail =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyEmail }
    }),
  toggleTelegramNotification: signalNotifyTelegram =>
    dispatch({
      type: actions.SETTINGS_TOGGLE_NOTIFICATION_CHANNEL,
      payload: { signalNotifyTelegram }
    }),
  connectTelegram: () => dispatch({ type: actions.SETTINGS_CONNECT_TELEGRAM })
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount () {
      this.props.generateTelegramDeepLink()
    }
  })
)(AccountNotificationChannels)
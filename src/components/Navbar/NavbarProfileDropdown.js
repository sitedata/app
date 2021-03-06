import React from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button, Toggle } from '@santiment-network/ui'
import DropdownDevider from './DropdownDevider'
import * as actions from '../../actions/types'
import { dateDifference, DAY } from '../../utils/dates'
import {
  getCurrentSanbaseSubscription,
  neuroProductId
} from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import UpgradeBtn from '../UpgradeBtn/UpgradeBtn'
import styles from './NavbarProfileDropdown.module.scss'
import dropdownStyles from './NavbarDropdown.module.scss'

const personalLinks = [
  { as: Link, to: '/sonar/my-signals', children: 'My alerts' },
  { as: Link, to: '/assets', children: 'My watchlists' },
  {
    as: 'a',
    href: 'https://insights.santiment.net/my',
    children: 'My insights'
  }
]

const LOGGED_IN_LINKS_1 = [
  { to: '/account', children: 'Account settings', as: Link }
]

const LOGGED_IN_LINKS_2 = [
  {
    to: '/logout',
    as: Link,
    className: styles.logout,
    children: (
      <>
        <svg
          className={styles.logout__icon}
          width='16'
          height='16'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M8 16a8 8 0 0 0 7.11-4.36.67.67 0 1 0-1.18-.61A6.65 6.65 0 0 1 1.33 8a6.65 6.65 0 0 1 12.6-3.03.67.67 0 0 0 1.11.15.67.67 0 0 0 .07-.76A8 8 0 1 0 8 16zm.67-4.66a.67.67 0 0 0 .46-1.14L7.6 8.67h7.72a.67.67 0 1 0 0-1.34H7.6L9.13 5.8a.67.67 0 1 0-.94-.94l-2.6 2.61a.67.67 0 0 0 0 1.06l2.6 2.6a.67.67 0 0 0 .48.21z' />
        </svg>{' '}
        Log out
      </>
    )
  }
]

const getTrialText = subscription => {
  let trial = ''
  let plan = 'FREE'
  if (subscription) {
    plan = subscription.plan.name
    let trialEnd = subscription.trialEnd || ''
    if (trialEnd) {
      const daysNumber =
        dateDifference({
          from: new Date(),
          to: new Date(trialEnd),
          format: DAY
        }).diff + 1

      const daysLeft = daysNumber === 1 ? 'last day' : `${daysNumber} days left`

      trial = `(trial - ${daysLeft})`
    }
  }

  return { plan, trial }
}

export const PRO = 'PRO'

const getSubscriptionText = (subscription, productName) => {
  let { plan, trial } = getTrialText(subscription)

  const userPlan = subscription ? subscription.plan.name : 'FREE'

  let text = ''
  if (userPlan === PRO) {
    text = `${plan} plan`
  } else {
    if (trial) {
      text = `${plan} plan ${trial}`
    } else {
      text = plan + ' plan'
    }
  }

  return (
    <div key={productName + text}>
      {productName && (
        <span className={styles.productName}>{productName}: </span>
      )}
      {text}
    </div>
  )
}

const LinkBuilder = (props, index) => {
  const { className } = props
  return (
    <Button
      variant='ghost'
      key={index}
      fluid
      className={cx(dropdownStyles.item, className)}
      {...props}
    />
  )
}

export const NavbarProfileDropdown = ({
  activeLink,
  isNightModeEnabled,
  toggleNightMode,
  isUpdateAvailable,
  user
}) => {
  const isLoggedIn = user && user.id

  return (
    <div
      className={cx({
        [styles.wrapper]: true,
        [styles.login]: !isLoggedIn
      })}
    >
      {isLoggedIn && (
        <div className={styles.profile}>
          <Link className={styles.name} to={`/profile/${user.id}`}>
            {user.username || user.email}
          </Link>
          <div className={styles.plan}>
            <Query query={USER_SUBSCRIPTIONS_QUERY}>
              {({ loading, data: { currentUser = {} } = {} }) => {
                if (loading) {
                  return 'Loading...'
                }

                const { subscriptions } = currentUser || {}

                const sanbaseSubscription = getCurrentSanbaseSubscription(
                  currentUser
                )

                const isOnlySanbase =
                  sanbaseSubscription && subscriptions.length === 1
                const sanbaseText = getSubscriptionText(
                  sanbaseSubscription,
                  isOnlySanbase ? null : 'Sanbase'
                )
                const isProSanbase =
                  sanbaseSubscription && sanbaseSubscription.plan
                    ? sanbaseSubscription.plan.name === PRO
                    : false

                return (
                  <>
                    {sanbaseText}
                    {subscriptions &&
                      subscriptions.map(subscription => {
                        const {
                          plan: {
                            product: { id }
                          }
                        } = subscription

                        switch (id) {
                          case neuroProductId: {
                            return getSubscriptionText(subscription, 'SanAPI')
                          }
                          default: {
                            return null
                          }
                        }
                      })}
                    {!isProSanbase && (
                      <UpgradeBtn
                        variant='flat'
                        accent='orange'
                        className={styles.upgrade}
                      />
                    )}
                  </>
                )
              }}
            </Query>
          </div>
        </div>
      )}
      <DropdownDevider />
      <Button
        fluid
        variant='ghost'
        className={cx(styles.setting, dropdownStyles.item, styles.nightMode)}
        onClick={toggleNightMode}
      >
        Night mode <Toggle isActive={isNightModeEnabled} />
      </Button>
      <DropdownDevider />
      {isLoggedIn && (
        <>
          <div className={dropdownStyles.list}>
            {personalLinks.map(LinkBuilder)}
          </div>
          <DropdownDevider />
        </>
      )}
      <div className={dropdownStyles.list}>
        <Button
          variant='ghost'
          fluid
          className={dropdownStyles.item}
          to='/labs'
          as={Link}
        >
          Labs
        </Button>

        {isLoggedIn && LOGGED_IN_LINKS_1.map(LinkBuilder)}

        {isUpdateAvailable && (
          <Button
            variant='ghost'
            fluid
            accent='positive'
            className={cx(dropdownStyles.item, dropdownStyles.updateBtn)}
            onClick={() => window.location.reload(true)}
          >
            Update available. Restart now
          </Button>
        )}

        {isLoggedIn && LOGGED_IN_LINKS_2.map(LinkBuilder)}

        {!isLoggedIn && (
          <Button
            variant='ghost'
            fluid
            as={Link}
            className={dropdownStyles.item}
            to='/login'
            isActive={activeLink === '/login'}
          >
            Create an account
          </Button>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ rootUi, user, app }) => ({
  isNightModeEnabled: rootUi.isNightModeEnabled,
  status: rootUi.isOnline ? 'online' : 'offline',
  user: user.data,
  isUpdateAvailable: app.isUpdateAvailable
})

const mapDispatchToProps = dispatch => ({
  toggleNightMode: () => dispatch({ type: actions.USER_TOGGLE_NIGHT_MODE })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarProfileDropdown)

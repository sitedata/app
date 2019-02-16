import React, { Fragment } from 'react'
import { Panel, Icon, Toggle } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import MultilineText from '../../components/MultilineText/MultilineText'
import styles from './SignalCard.module.scss'

const statusMap = [
  { icon: 'public', label: 'Public' },
  {
    icon: 'lock',
    label: 'Private'
  }
]

const AwaitingPostingMessage = () => (
  <h4 className={styles.awaiting}>
    <Icon type='clock' className={styles.awaiting__icon} /> Awaiting posting
  </h4>
)

const SignalCardBottom = ({
  author,
  username,
  isPublic,
  isPublished,
  isSubscribed,
  subscriptionsNumber
}) => {
  const Status = statusMap[Number(isPublic)]
  const isUserTheAuthor = username === author

  return (
    <div className={styles.bottom}>
      {isPublished ? (
        <h4 className={styles.author}>
          {isUserTheAuthor && (
            <Fragment>
              <Icon
                type={Status.icon}
                className={cx(styles.status, isPublic && styles.status_public)}
              />
              {Status.label},{' '}
            </Fragment>
          )}
          by{' '}
          <Link className={styles.author__link} to='/'>
            {isUserTheAuthor ? 'Myself' : author}
          </Link>
        </h4>
      ) : (
        <AwaitingPostingMessage />
      )}
      <div className={styles.bottom__right}>
        {isPublic && isPublished && (
          <div className={styles.subscriptions}>
            <Icon type='profile' className={styles.subscriptions__icon} />
            {subscriptionsNumber}
          </div>
        )}
        <Toggle isActive={isSubscribed} />
      </div>
    </div>
  )
}

const SignalCard = ({
  title,
  description,
  author,
  subscriptionsNumber,
  isSubscribed,
  isPublic,
  username,
  isPublished,
  className = ''
}) => {
  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      <div
        className={cx(
          styles.wrapper__left,
          author && styles.wrapper__left_subscription
        )}
      >
        <div className={styles.icon}>
          <Icon type='wallet' />
        </div>
      </div>
      <div className={styles.wrapper__right}>
        <div className={styles.upper}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.description}>
            <MultilineText
              id='SignalCard__description'
              maxLines={2}
              text={description}
            />
          </h3>
        </div>
        {author && (
          <SignalCardBottom
            author={author}
            username={username}
            isSubscribed={isSubscribed}
            isPublic={isPublic}
            isPublished={isPublished}
            subscriptionsNumber={subscriptionsNumber}
          />
        )}
      </div>
    </Panel>
  )
}

export default SignalCard

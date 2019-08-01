import React from 'react'
import GA from 'react-ga'
import { graphql, Query } from 'react-apollo'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import InsightsWrap from '../../components/Insight/InsightsWrap'
import AnonBannerCardB from '../../components/Banner/AnonBanner/AnonBannerCardB'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from '../../queries/InsightsGQL'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { creationDateSort } from '../Insights/utils'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import paywallBoundaries from './paywallBoundaries'
import styles from './index.module.scss'

function onGetStartedClick () {
  GA.event({
    category: 'User',
    action: '"Get started" click'
  })
}

export default graphql(ALL_INSIGHTS_BY_PAGE_QUERY, {
  fetchPolicy: 'cache-and-network',
  options: () => ({
    variables: { page: 1 }
  })
})(({ isLoggedIn, data: { insights = [] } }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  return (
    <div className={styles.wrapper + ' page'}>
      <Query query={USER_SUBSCRIPTIONS_QUERY}>
        {({ data: { currentUser } }) => {
          const subscription = getCurrentSanbaseSubscription(currentUser)
          const userPlan = subscription ? subscription.plan.name : 'FREE'
          const boundaries = paywallBoundaries[userPlan]

          return (
            <ChartWidget
              adjustNightMode={false}
              slug='bitcoin'
              title='Bitcoin (BTC)'
              projectId='1505'
              metrics={['historyPrice', 'mvrvRatio', 'socialVolume']}
              classes={styles}
              {...boundaries}
            />
          )
        }}
      </Query>
      {isLoggedIn || (
        <AnonBannerCardB
          onClick={onGetStartedClick}
          className={styles.banner}
          title='Why Santiment?'
          description='Track selected assets in one place and check it’s status'
          button='Sign up for free'
        />
      )}
      <h2 className={styles.title}>Latest Insights</h2>
      <InsightsWrap insights={sortedInsights} />
    </div>
  )
})
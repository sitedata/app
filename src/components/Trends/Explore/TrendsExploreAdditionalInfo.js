import React, { useState } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../queries/InsightsGQL'
import { NEWS_QUERY } from '../../News/NewsGQL'
import {
  getInsightTrendTagByDate,
  oneDayTimestamp
} from '../../Insight/InsightsTrends'
import InsightCard from '../../Insight/InsightCard'
import News from '../../News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({ news, insights }) => {
  let [selectedTab, setSelectedTab] = useState(null)

  function handleSelectTab (tab) {
    if (tab !== (selectedTab || defaultSelectedTab)) {
      setSelectedTab(tab)
    }
  }

  const newsTab = {
    index: NEWS_INDEX,
    content: `${NEWS_INDEX} (${news.length})`
  }

  const insightsTab = {
    index: INSIGHTS_INDEX,
    content: `${INSIGHTS_INDEX} (${insights.length})`
  }

  const tabs = []
  if (insights.length > 0) tabs.push(insightsTab)
  if (news.length > 0) tabs.push(newsTab)

  if (tabs.length === 0) return null
  const defaultSelectedTab = tabs[0].index

  return (
    <section className={styles.wrapper}>
      <Tabs
        options={tabs}
        defaultSelectedIndex={defaultSelectedTab}
        onSelect={handleSelectTab}
      />
      <div className={styles.tabsContent}>
        {(selectedTab || defaultSelectedTab) === NEWS_INDEX && (
          <News data={news} />
        )}
        {(selectedTab || defaultSelectedTab) === INSIGHTS_INDEX && (
          <div className={styles.insights}>
            {insights.map(insight => (
              <InsightCard
                small
                grey
                withAuthorPic={false}
                {...insight}
                key={insight.id}
                className={styles.insight}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const getTrendsTags = numberOfLastDays =>
  Array.from({ length: numberOfLastDays }, (_, idx) =>
    getInsightTrendTagByDate(new Date(Date.now() - oneDayTimestamp * idx))
  )

const filterInsights = (insights = [], word) =>
  insights.filter(({ tags }) => tags.find(({ name }) => name === word))

const getPast3DaysInsightsByTrendTag = () => {
  return getTrendsTags(3).map(tag =>
    graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
      options: () => ({ variables: { tag } }),
      props: ({
        data: { allInsightsByTag = [] },
        ownProps: { insights: ownInsights = [], word }
      }) => ({
        insights: ownInsights.concat(
          filterInsights(allInsightsByTag, word.toUpperCase())
        )
      })
    })
  )
}

const enhance = compose(
  ...getPast3DaysInsightsByTrendTag(),
  graphql(NEWS_QUERY, {
    options: ({ word: tag }) => {
      const { from, to } = getTimeIntervalFromToday(-3, DAY)
      return {
        variables: { from, to, tag, size: 6 }
      }
    },
    props: ({ data: { news = [] } }) => ({ news: news.reverse() })
  })
)

export default enhance(TrendsExploreAdditionalInfo)

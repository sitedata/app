import React from 'react'
import WithLikesMutation from '../Like/WithLikesMutation'
import InsightCard from './InsightCardWithMarketcap'
import Feed from '../Feed/Feed'

const InsightsFeed = ({ insights }) => {
  return (
    <WithLikesMutation isFor='insights'>
      {mutateInsightById => (
        <Feed
          data={insights}
          component={({ id, ...rest }) => (
            <InsightCard id={id} {...rest} onLike={mutateInsightById(id)} />
          )}
          dateKey='createdAt'
        />
      )}
    </WithLikesMutation>
  )
}

export default InsightsFeed

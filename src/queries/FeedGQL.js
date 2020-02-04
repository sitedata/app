import gql from 'graphql-tag'
import { INSIGHT_COMMON_FRAGMENT } from './InsightsGQL'
import { TRIGGERS_COMMON_FRAGMENT } from '../ducks/Signals/common/queries'

export const FEED_QUERY = gql`
  query timelineEvents(
    $limit: Int
    $cursor: CursorInput
    $orderBy: OrderByEnum
    $filterBy: TimelineEventsFilterInput
  ) {
    timelineEvents: timelineEvents(
      limit: $limit
      cursor: $cursor
      orderBy: $orderBy
      filterBy: $filterBy
    ) {
      cursor {
        after
        before
      }
      events {
        id
        eventType
        insertedAt
        user {
          id
          avatarUrl
          username
        }
        post {
          ...insightCommon
        }
        trigger {
          ...triggersCommon
        }
        votes {
          userId
        }
        payload
        __typename
      }
    }
  }
  ${INSIGHT_COMMON_FRAGMENT}
  ${TRIGGERS_COMMON_FRAGMENT}
`

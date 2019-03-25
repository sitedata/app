import gql from 'graphql-tag'

export const ALL_TAGS_QUERY = gql`
  query allTags {
    tags: allTags {
      name
    }
  }
`

export const ALL_INSIGHTS_QUERY = gql`
  query allInsights($page: Int) {
    insights: allInsights(page: $page, pageSize: 10) {
      readyState
      id
      title
      createdAt
      updatedAt
      votedAt
      votes {
        totalVotes
      }
      tags {
        name
      }
      user {
        id
        username
      }
    }
  }
`

export const CURRENT_USER_DRAFT_INSIGHTS = gql`
  query currentUser {
    currentUser {
      id
      insights {
        readyState
        id
        title
        text
        updatedAt
        user {
          username
          id
        }
      }
    }
  }
`

export const INSIGHT_BY_ID_QUERY = gql`
  query insightById($id: ID!) {
    insight: post(id: $id) {
      id
      title
      text
      createdAt
      updatedAt
      readyState
      votedAt
      tags {
        name
      }
      user {
        username
        id
      }
      votes {
        totalVotes
      }
    }
  }
`

export const INSIGHTS_BY_USERID_QUERY = gql`
  query allInsightsForUser($userId: Int!) {
    insights: allInsightsForUser(userId: $userId) {
      id
      title
      user {
        id
        username
      }
      createdAt
      updatedAt
      readyState
      votedAt
      tags {
        name
      }
      votes {
        totalVotes
      }
    }
  }
`

export const INSIGHTS_BY_TAG_QUERY = gql`
  query allInsightsByTag($tag: String!) {
    insights: allInsightsByTag(tag: $tag) {
      id
      title
      user {
        id
        username
      }
      createdAt
      updatedAt
      readyState
      votedAt
      tags {
        name
      }
      votes {
        totalVotes
      }
    }
  }
`

export const DELETE_INSIGHT_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export const CREATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation createPost($title: String!, $text: String, $tags: [String]) {
    updatedDraft: createPost(title: $title, text: $text, tags: $tags) {
      id
      updatedAt
    }
  }
`

export const UPDATE_INSIGHT_DRAFT_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $text: String
    $tags: [String]
  ) {
    updatedDraft: updatePost(id: $id, title: $title, text: $text, tags: $tags) {
      id
      updatedAt
    }
  }
`

export const PUBLISH_INSIGHT_DRAFT_MUTATION = gql`
  mutation publishInsight($id: ID!) {
    publishInsight(id: $id) {
      id
    }
  }
`

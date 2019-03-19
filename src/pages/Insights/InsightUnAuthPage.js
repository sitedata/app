import React from 'react'
import { Panel, Button, Icon } from '@santiment-network/ui'

const InsightUnAuthPage = ({ history }) => {
  return (
    <Panel padding>
      <h2>Create an account to get your Sanbase experience.</h2>
      <p>
        By having a Sanbase account, you can see more data and insights about
        crypto projects. You can vote and comment on all you favorite insights
        and more.
      </p>
      <Button
        onClick={() =>
          history.push(`/login?redirect_to=${history.location.pathname}`)
        }
        color='green'
      >
        <Icon type='checkmark' /> Login or Sign up
      </Button>
    </Panel>
  )
}

export default InsightUnAuthPage
import React from 'react'
import StoryRouter from 'storybook-react-router'
import { storiesOf } from '@storybook/react'
import SonarFeedActivityPage from '../src/pages/SonarFeed/SonarFeedActivityPage'
import SignalCardsGrid, {
  defaultSignals
} from '../src/components/SignalCard/SignalCardsGrid'
import SonarFeedMySignalsPage from '../src/pages/SonarFeed/SonarFeedMySignalsPage'

const defaultActivities = {
  'Today, Dec 21': [
    {
      id: 0,
      title: 'Ethereum price increased',
      description:
        'Signal to track the activity of selected address based on Ethereum'
    },
    {
      id: 1,
      title: 'Daily trending words',
      description:
        'Signal to get daily list of trending words connected with crypto'
    }
  ],
  'Yesterday, Dec 20': [
    {
      id: 0,
      title: 'Ethereum price increased',
      description:
        'Signal to track the activity of selected address based on Ethereum'
    }
  ]
}

const stories = storiesOf('Sonar feed', module)
stories.addDecorator(StoryRouter())
stories.add('Activities', () => (
  <SonarFeedActivityPage activities={defaultActivities} />
))
stories.add('Activities (Empty)', () => <SonarFeedActivityPage />)

stories.add('Explore', () => <SignalCardsGrid signals={defaultSignals} />)

stories.add('My signals', () => (
  <SonarFeedMySignalsPage signals={defaultSignals} />
))
stories.add('My signals (Empty)', () => <SonarFeedMySignalsPage />)
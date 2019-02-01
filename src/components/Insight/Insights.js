import React, { Component } from 'react'
import { Selector, Button, Icon } from '@santiment-network/ui'
import { Link } from 'react-router-dom'
import InsightCard from './InsightCard'
import styles from './Insights.module.scss'

const View = {
  RECENT: 'Recent',
  POPULAR: 'Popular'
}

const sortByRecent = ({ createdAt: aCreatedAt }, { createdAt: bCreatedAt }) =>
  new Date(aCreatedAt) < new Date(bCreatedAt) ? 1 : -1

const sortByPopularity = (
  { votes: { totalVotes: aVotes } },
  { votes: { totalVotes: bVotes } }
) => (aVotes < bVotes ? 1 : -1)

class Insights extends Component {
  static defaultProps = {
    insights: [],
    className: ''
  }

  state = {
    view: View.RECENT
  }

  onViewSelect = newView => {
    const { view } = this.state
    if (newView === view) return

    this.setState({
      view: newView
    })
  }

  render () {
    const { view } = this.state
    const { insights, className } = this.props

    const length = insights.length

    return (
      <div className={className}>
        <div className={styles.top}>
          <div className={styles.title}>
            Insights
            <span className={styles.count}> ({length})</span>
          </div>
          <div className={styles.controls}>
            {length > 0 && (
              <Selector
                className={styles.selectors}
                options={[View.RECENT, View.POPULAR]}
                onSelectOption={this.onViewSelect}
                defaultSelected={View.RECENT}
              />
            )}
            <Button
              as={props => (
                <Link to={`/insights/new?currentTrends`} {...props} />
              )}
              className={styles.btn}
              accent='green'
            >
              <Icon className={styles.icon} type='plus-round' />
              Add insight
            </Button>
          </div>
        </div>
        <div className={styles.bottom}>
          {[...insights]
            .sort(view === View.RECENT ? sortByRecent : sortByPopularity)
            .slice(0, 3)
            .map(({ id, user, title, tags, createdAt, votes }) => {
              return (
                <InsightCard
                  key={id}
                  user={user}
                  title={title}
                  tags={tags}
                  createdAt={createdAt}
                  votes={votes}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

export default Insights
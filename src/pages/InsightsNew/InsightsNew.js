import React, { Component } from 'react'
import { Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Panel from './../../components/Panel'
import PostsNewHeader from './InsightsNewHeader'
import ConfirmPost from './ConfirmNewInsight'
import CreateTitle from './CreateTitle'
import CreateBody from './CreateBody'
import InsightsLayout from './../Insights/InsightsLayout'
import { APP_UPDATE_INSIGHT_DRAFT } from '../../actions/types.js'
import './InsightsNew.css'

class InsightsNew extends Component {
  state = {
    title: this.props.insightDraft.title || '',
    link: '',
    text: this.props.insightDraft.text || '',
    votes: 0,
    tags: this.props.insightDraft.tags || [],
    author: this.props.username,
    created: new Date()
  }

  changePost = (post, nextStepURL = '') => {
    this.setState({ ...post }, () => {
      this.props.history.push(`/insights/new/${nextStepURL}`)
    })
  }

  savePost = post => {
    console.log('Save the inisight', post)
  }

  componentDidMount () {
    if (!this.props.isLogin) {
      this.props.history.push('/login')
    }
    if (
      this.props.match.path.split('/')[2] === 'update' &&
      !!this.props.match.params.insightId
    ) {
      this.changePost(this.props.location.state.post)
    }
  }

  render () {
    if (!this.props.username) {
      return <Redirect to='/insights' />
    }

    if (
      !this.state.text &&
      this.props.history.location.pathname !== '/insights/new' &&
      this.props.match.path.split('/')[2] !== 'update'
    ) {
      return (
        <Redirect
          to={{
            pathname: '/insights/new'
          }}
        />
      )
    }
    const { addPost } = this.props
    const paths = this.props.history.location.pathname.split('/')
    const last = paths[paths.length - 1]
    return (
      <InsightsLayout
        sidebar={
          <div className='insights-pages-sidebar-highlights'>
            <div>
              <Link to={'/insights/33'}>
                How to use Insights: Traders/Investors
              </Link>
            </div>
            <div>
              <Link to={'/insights/34'}>How to use Insights: Researchers</Link>
            </div>
            <br />
            <div>
              <p>
                Use Insights to journal your ideas, as a way to teach yourself,
                perform research, or share with others.
              </p>
              <p>
                Record your trades or research notes, and learn more about your
                investing style, track your progress over time, and study
                trends. You can also share (“publish”) Insights publicly to
                teach others, build your reputation and educate yourself at the
                same time! You will be participating in the proper
                decentralisation of creating, owning and sharing financial
                information in our society.
              </p>
              <p>
                Plus, you could benefit financially from your skills in
                “understanding the crypto”.
              </p>
            </div>
          </div>
        }
        isLogin={this.state.isLogin}
      >
        <div className='event-posts-new'>
          <Panel>
            <PostsNewHeader location={last} />
            <Route
              exact
              path='/insights/new'
              render={() => (
                <CreateBody
                  changePost={this.changePost}
                  post={{ ...this.state }}
                  updateDraft={this.props.updateDraft}
                />
              )}
            />
            <Route
              exact
              path='/insights/new/title'
              render={() => (
                <CreateTitle
                  changePost={this.changePost}
                  post={{ ...this.state }}
                  updateDraft={this.props.updateDraft}
                />
              )}
            />
            <Route
              exact
              path='/insights/new/confirm'
              render={() => (
                <ConfirmPost
                  addPost={addPost}
                  savePost={this.savePost}
                  post={{ ...this.state }}
                />
              )}
            />
          </Panel>
        </div>
      </InsightsLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.token,
    username: state.user.data.username,
    insightDraft: state.user.insightDraft || {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => {
      dispatch({
        type: 'ADD_EVENT_POST',
        payload: {
          post
        }
      })
    },

    updateDraft: payload => {
      dispatch({
        type: APP_UPDATE_INSIGHT_DRAFT,
        payload
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsNew)

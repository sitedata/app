import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import Sticky from 'react-stickynode'
import GetHypedTrends from './../../components/Trends/GetHypedTrends'
import HypedBlocks from './../../components/Trends/HypedBlocks'
import WordCloud from './../../components/WordCloud/WordCloud'
import SocialVolumeWidget from '../../components/SocialVolumeWidget/SocialVolumeWidget'
import HelpTrendsAbout from './HelpPopupTrendsAbout'
import styles from './TrendsPage.module.scss'
import InsightsTrends from '../../components/Insight/InsightsTrends'
import Devider from '../../components/Navbar/DropdownDevider'

const TrendsPage = ({
  word,
  isCloudLoading,
  setWordCloudStiky,
  isWordCloudSticky = false,
  isDesktop = true
}) => (
  <div className={styles.TrendsPage + ' page'}>
    <div className={styles.header}>
      <h1>Emerging social trends</h1>
      <HelpTrendsAbout />
    </div>
    <GetHypedTrends
      render={({ isLoading, items }) => (
        <Fragment>
          <div id='word-cloud-sticky-anchor' />
          <WordCloudWrapper
            isCloudLoading={isCloudLoading}
            isLoading={isLoading}
            word={word}
            isDesktop={isDesktop}
            setWordCloudStiky={setWordCloudStiky}
            isWordCloudSticky={isWordCloudSticky}
          />
          <HypedBlocks
            items={items}
            isLoading={isLoading}
            isDesktop={isDesktop}
          />
        </Fragment>
      )}
    />
    <Devider style={{ margin: '40px 0' }} />
    <InsightsTrends className={styles.insights} />
  </div>
)

const WordCloudWrapper = ({
  isLoading,
  isDesktop,
  word,
  isCloudLoading,
  isWordCloudSticky,
  setWordCloudStiky
}) => (
  <div>
    {!isLoading && isDesktop && (
      <Sticky
        top={'#word-cloud-sticky-anchor'}
        innerZ={2}
        onStateChange={({ status }) => {
          setWordCloudStiky(status === Sticky.STATUS_FIXED)
        }}
        enabled
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: isWordCloudSticky ? 0 : 24
          }}
          className={isWordCloudSticky ? styles.WordCloudSticky : ''}
        >
          <SocialVolumeWidget />
          <WordCloud />
        </div>
      </Sticky>
    )}
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  isCloudLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  word: state.wordCloud.word
})

export default compose(
  withState('isWordCloudSticky', 'setWordCloudStiky', false),
  connect(mapStateToProps)
)(TrendsPage)

import React from 'react'
import {
  Route as BasicRoute,
  Switch,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
import { FadeInDown } from 'animate-components'
import Loadable from 'react-loadable'
import withSizes from 'react-sizes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import nprogress from 'nprogress'
import Notification from './components/Notification'
import LoginPage from './pages/Login/LoginPage'
import CashflowMobile from './pages/CashflowMobile'
import CurrenciesMobile from './pages/CurrenciesMobile'
import Roadmap from './pages/Roadmap'
import Signals from './pages/Signals'
import Account from './pages/Account/Account'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import BuildChallenge from './pages/BuildChallenge'
import EmailLoginVerification from './pages/EmailLoginVerification'
import MobileMenu from './components/MobileMenu'
import Navbar from './components/Navbar/Navbar'
import withTracker from './withTracker'
import withIntercom from './withIntercom'
import ErrorBoundary from './ErrorBoundary'
import PageLoader from './components/PageLoader'
import Status from './pages/Status'
import Footer from './components/Footer'
import FeedbackModal from './components/FeedbackModal'
import GDPRModal from './components/GDPRModal'
import ConfirmDeleteWatchlistModal from './components/WatchlistPopup/ConfirmDeleteWatchlistModal'
import AssetsPage from './pages/assets/AssetsPage'
import SignalsPriceVolume from './pages/Signals/SignalsPriceVolume'
import HistoricalBalancePage from './ducks/HistoricalBalance/HistoricalBalancePage'
import WordCloudPage from './components/WordCloud/WordCloudPage'
import TrendsTool from './pages/Trends/TrendsToolPage'
import { getConsentUrl } from './utils/utils'
import HeaderMsg from './HeaderMsg'
import LogoutPage from './pages/Logout'
import './App.scss'

const LoadableDetailedPage = Loadable({
  loader: () => import('./pages/Detailed/Detailed'),
  loading: () => <PageLoader />
})

const LoadableInsights = Loadable({
  loader: () => import('./pages/InsightsPage'),
  loading: () => <PageLoader />
})

const LoadableInsight = Loadable({
  loader: () => import('./pages/Insights/Insight'),
  loading: () => <PageLoader />
})

const LoadableInsightsNew = Loadable({
  loader: () => import('./pages/InsightsNew/InsightsNew'),
  loading: () => <PageLoader />
})

const LoadableTrendsPage = Loadable({
  loader: () => import('./pages/Trends/TrendsPage'),
  loading: () => <PageLoader />
})

const LoadableTrendsExplorePage = Loadable({
  loader: () => import('./pages/Trends/TrendsExplorePage'),
  loading: () => <PageLoader />
})

class Route extends React.Component {
  componentWillMount () {
    nprogress.start()
  }

  componentDidMount () {
    nprogress.done()
  }

  render () {
    return <BasicRoute {...this.props} />
  }
}

class ExternalRedirect extends React.Component {
  componentWillMount () {
    window.location = this.props.to
  }

  render () {
    return <section>Redirecting...</section>
  }
}

export const App = ({
  isDesktop,
  isLoggedIn,
  isFullscreenMobile,
  isOffline,
  hasUsername,
  isBetaModeEnabled,
  location
}) => (
  <div className='App'>
    {isOffline && (
      <FadeInDown
        className='offline-status-message'
        duration='1.0s'
        timingFunction='ease-out'
        as='div'
      >
        OFFLINE
      </FadeInDown>
    )}
    {isLoggedIn && !hasUsername && (
      <div className='no-username-status-message'>
        <Link to='/account'>
          <i className='exclamation triangle icon' />
          Without a username, some functionality will be restricted. Please,
          click on the notification to proceed to the account settings.{' '}
          <i className='exclamation triangle icon' />
        </Link>
      </div>
    )}
    {isDesktop && <HeaderMsg />}
    {isFullscreenMobile ? (
      undefined
    ) : isDesktop ? (
      <Navbar activeLink={location.pathname} />
    ) : (
      <MobileMenu />
    )}
    <ErrorBoundary>
      <Switch>
        <Route
          exact
          path='/projects'
          render={props => {
            if (isDesktop) {
              return <Redirect to='/sonar' />
            }
            return <CashflowMobile {...props} />
          }}
        />
        <Route
          exact
          path='/currencies'
          render={props => {
            if (isDesktop) {
              return <Redirect to='/assets/currencies' />
            }
            return <CurrenciesMobile {...props} />
          }}
        />
        {['currencies', 'erc20', 'all', 'list'].map(name => (
          <Route
            exact
            key={name}
            path={`/assets/${name}`}
            render={props => {
              if (isDesktop) {
                return (
                  <AssetsPage
                    type={name}
                    isLoggedIn={isLoggedIn}
                    isBetaModeEnabled={isBetaModeEnabled}
                    preload={() => LoadableDetailedPage.preload()}
                    {...props}
                  />
                )
              }
              return <Redirect to='/projects' />
            }}
          />
        ))}
        <Redirect from='/assets' to='/assets/all' />
        <Route exact path='/roadmap' component={Roadmap} />
        <Route exact path='/signals' component={Signals} />
        <Route exact path='/signals/:slug' component={SignalsPriceVolume} />
        <Route exact path='/labs/balance' component={HistoricalBalancePage} />
        <Route exact path='/labs/wordcloud' component={WordCloudPage} />
        <Route path='/insights/new' component={LoadableInsightsNew} />
        <Route
          path='/insights/update/:insightId'
          component={LoadableInsightsNew}
        />
        <Route exact path='/insights' component={LoadableInsights} />
        <Route exact path='/insights/newest' component={LoadableInsights} />
        <Route exact path='/insights/popular' component={LoadableInsights} />
        <Route exact path='/insights/my' component={LoadableInsights} />
        <Route
          exact
          path='/insights/users/:userId'
          component={LoadableInsights}
        />
        <Route
          exact
          path='/insights/tags/:tagName'
          component={LoadableInsights}
        />
        <Route exact path='/insights/:insightId' component={LoadableInsight} />
        <Route
          exact
          path='/projects/:slug'
          render={props => (
            <LoadableDetailedPage isDesktop={isDesktop} {...props} />
          )}
        />
        <Route exact path='/labs/trends' render={props => <TrendsTool />} />
        <Redirect from='/trends' to='/labs/trends' />
        <Route
          exact
          path='/labs/trends/explore/:word'
          render={props => (
            <LoadableTrendsExplorePage isDesktop={isDesktop} {...props} />
          )}
        />
        <Route
          exact
          path='/sonar'
          render={props => (
            <LoadableTrendsPage isDesktop={isDesktop} {...props} />
          )}
        />
        <Route path='/logout' component={LogoutPage} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/status' component={Status} />
        <Redirect from='/ethereum-spent' to='/projects/ethereum' />
        <Route exact path='/build' component={BuildChallenge} />
        <Route exact path='/privacy-policy' component={PrivacyPolicyPage} />
        <Route path='/email_login' component={EmailLoginVerification} />
        <Route path='/verify_email' component={EmailLoginVerification} />
        {['data', 'dashboards'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://data.santiment.net'} />
            )}
          />
        ))}
        {['apidocs', 'apiexamples'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://docs.santiment.net'} />
            )}
          />
        ))}
        {['docs', 'help'].map(name => (
          <Route
            key={name}
            path={`/${name}`}
            render={() => (
              <ExternalRedirect to={'https://help.santiment.net'} />
            )}
          />
        ))}
        <Route
          exact
          path='/support'
          render={props => (
            <ExternalRedirect to={'mailto:info@santiment.net'} />
          )}
        />
        <Route
          path='/consent'
          render={props => (
            <ExternalRedirect
              to={`${getConsentUrl()}/consent${props.location.search}`}
            />
          )}
        />
        <Route
          exact
          path='/login'
          render={props => <LoginPage isDesktop={isDesktop} {...props} />}
        />
        <Redirect from='/' to='/projects' />
      </Switch>
    </ErrorBoundary>
    <Notification />
    <ConfirmDeleteWatchlistModal />
    <FeedbackModal />
    <GDPRModal />
    {isDesktop && <Footer />}
  </div>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.token,
    isFullscreenMobile: state.detailedPageUi.isFullscreenMobile,
    isOffline: !state.rootUi.isOnline,
    isBetaModeEnabled: state.rootUi.isBetaModeEnabled,
    hasUsername: !!state.user.data.username
  }
}

export const mapSizesToProps = ({ width }) => ({
  isDesktop: width > 768
})

const enchance = compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps),
  withTracker,
  withIntercom,
  withRouter
)

export default enchance(App)

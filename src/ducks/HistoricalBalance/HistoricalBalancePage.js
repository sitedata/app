import React, { Component } from 'react'
import * as qs from 'query-string'
import { Helmet } from 'react-helmet'
import BalanceView from './BalanceView'
import styles from './HistoricalBalancePage.module.scss'

export const mapQSToState = ({ location }) => {
  const { address, assets } = qs.parse(location.search, {
    arrayFormat: 'bracket'
  })

  return {
    address: address || '',
    assets: assets || []
  }
}

export default class HistoricalBalancePage extends Component {
  state = {
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...mapQSToState(nextProps)
    }
  }

  render () {
    return (
      <div className={styles.HistoricalBalancePage + ' page'}>
        <Helmet>
          <style>{'body { background-color: white; }'}</style>
        </Helmet>
        <header className={styles.header}>
          <h1>
            Explore historical balance <br />
            of any wallets
          </h1>
        </header>
        <BalanceView
          onChangeQuery={this.handleChangeQuery}
          address={this.state.address}
          assets={this.state.assets}
        />
      </div>
    )
  }

  mapStateToQS = ({ address, assets }) =>
    '?' + qs.stringify({ address, assets }, { arrayFormat: 'bracket' })

  updateSearchQuery = newState => {
    this.props.history.push({
      search: this.mapStateToQS(newState)
    })
  }

  handleChangeQuery = newState => {
    this.updateSearchQuery(newState)
  }
}

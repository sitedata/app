import React from 'react'
import topHodersSvg from './../../assets/pro-metrics/top-holders.svg'
import maximalAgeSvg from './../../assets/pro-metrics/maximal-mean-age.svg'
import nvtRatioSvg from './../../assets/pro-metrics/nvt-ratio.svg'
import priceDaaSvg from './../../assets/pro-metrics/price-daa.svg'
import networkGrowthSvg from './../../assets/pro-metrics/network-growth.svg'
import mvrvSvg from './../../assets/pro-metrics/mvrv.svg'
import threshooldSvg from './../../assets/pro-metrics/threshold.svg'
import velocitydSvg from './../../assets/pro-metrics/velocity.svg'
import mostProfitableSvg from '../../assets/pro-metrics/most-profitable.svg'
import distributionSvg from '../../assets/pro-metrics/distribution.svg'

import erc20Svg from '../../assets/pro-metrics/erc20.svg'
import stablecoinsSvg from '../../assets/pro-metrics/stablecoins.svg'
import leastCorrelatedSvg from '../../assets/pro-metrics/least-correlated.svg'

import styles from './ProMetric/ProMetric.module.scss'

export const THIRD_METRICS_GROUP = [
  {
    title: 'Velocity Vs. Price Template',
    description: (
      <>
        Velocity is an underutilized way to research how quickly money is
        circulating in the crypto economy. It’s calculated by dividing a token’s
        transaction volume (in USD) by its market cap (in USD).
        <div className={styles.block}>
          Similar to the Daily Active Addresses Template, this model visualizes
          when tokens are being overbought or oversold based on the historical
          ebbs and flows of its velocity metric.
        </div>
      </>
    ),
    isImage: true,
    svg: velocitydSvg
  },
  {
    title: 'Most Profitable Days for Trading Cryptocurrency',
    description: (
      <>
        As{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/backtesting-the-week%3A-which-days-are-best-for-trading-crypto%3F-1139'
        >
          we’ve tested in the past
        </a>{' '}
        , knowing which days have the best historical ROI can help reduce risk
        and craft effective market alphas.
        <div className={styles.block}>
          This template determines the best trading days (historically) for any
          coin in the Santiment database, with adjustable time ranges for Pro
          users.
        </div>
      </>
    ),
    isImage: true,
    svg: mostProfitableSvg
  },
  {
    title: 'Distribution Index',
    description: (
      <>
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/314'
        >
          Our research
        </a>{' '}
        has shown that distributed coins (supply dispersed among many addresses)
        tend to outperform concentrated coins (much of circulating supply held
        by ‘whales’).
        <div className={styles.block}>
          This Index calculates the top 10 most distributed and most
          concentrated ERC-20 coins (within the top 50) over the last month.
        </div>
      </>
    ),
    isImage: true,
    svg: distributionSvg
  },
  {
    title: 'ETH-ERC20 Correlation Index',
    description: (
      <>
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://santiment.net/blog/eth-vs-erc-20-market-cap-comparison/'
        >
          Our previous analysis
        </a>{' '}
        indicates that ERC-20 coins tend to be less correlated to Ethereum
        during the bull market, and exhibit higher correlation during the bear
        market.
        <div className={styles.block}>
          This Index charts the correlation of ERC-20 market cap to the ETH
          market cap over the last 3 months.
        </div>
      </>
    ),
    isImage: true,
    svg: erc20Svg
  },
  {
    title: 'Stablecoin Volatility Index',
    description: (
      <>
        Stablecoins are{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://santiment.net/blog/stablecoin-volatility/'
        >
          more volatile
        </a>{' '}
        than you think. This presents a novel market opportunity, as one could
        theoretically invest in low-volatility stablecoins and trade outbreaks
        in their more volatile counterparts.
        <div className={styles.block}>
          This Santiment Index ranks 15 biggest stablecoins from most to least
          volatile over the past 30 days.
        </div>
      </>
    ),
    isImage: true,
    svg: stablecoinsSvg
  },
  {
    title: 'Least Correlated Coins to BTC & ETH',
    description: (
      <>
        According to{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://medium.com/santiment/eth-vs-erc-20-a-tale-of-two-market-caps-94b2aca58e5e?source=collection_category---4------5-----------------------'
        >
          our research
        </a>
        , a portfolio of coins that are least correlated to both Bitcoin and
        Ethereum tends to perform particularly well during the bull cycles.
        <div className={styles.block}>
          This Index calculates the 20 least correlated coins to BTC & ETH over
          the past 30 days.
        </div>
      </>
    ),
    isImage: true,
    svg: leastCorrelatedSvg
  }
]

export const SECOND_METRICS_GROUP = [
  {
    title: 'MVRV and MVRV Long/Short Difference Ratio Template',
    description: (
      <>
        The MVRV ratio is found by dividing the market cap (market value or MV)
        by realized cap (total realized value or RV), and it provides us with a
        solid estimate of just how overvalued or undervalued the current market
        cap is.
        <div className={styles.block}>
          Additionally, we offer the MVRV Long/Short Difference comparison on
          this template to visualize which projects are over or under their line
          of average profitable traders. If the ratio is above 0%, then on
          average. Ethereum holders will profit if they sell their coins now. If
          it is below 0%, then the average holder will realize a loss if they
          sell.
        </div>
      </>
    ),
    isImage: true,
    svg: mvrvSvg
  },
  {
    title: 'Thresholds Crossed Template',
    description: (
      <>
        Understanding how many times a price of a project has moved above or
        below a round number USD value, or a psychological barrier, can provide
        great perspective in understanding just how cyclical the cryptocurrency
        markets are. For those who believe that a cross above a certain level
        likely means that “it will never fall back below again” can be shown
        just how often prices have reset time and time again.
        <div className={styles.block}>
          This template is great for understanding support levels, and where
          prices most commonly see a great deal of push and pull, along with
          psychological polarization among traders. It can be used well to your
          advantage.
        </div>
      </>
    ),
    isImage: true,
    svg: threshooldSvg
  }
]

export const FIRST_METRICS_GROUP = [
  {
    title: 'Maximal Mean Dollar Age Template',
    isLeft: true,
    isImage: true,
    svg: maximalAgeSvg,
    description: (
      <>
        This template visualizes the Mean Dollar Age of Bitcoin, Ethereum and
        various ERC20 coins in comparison to one another.
        <div className={styles.block}>
          Developed by Santiment,{' '}
          <a
            className={styles.link}
            rel='noopener noreferrer'
            target='_blank'
            href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653/?utm_campaign=mainlist_feb_2020&utm_medium=newsletter&utm_source=email&via=monthly_email'
          >
            Mean Dollar Age
          </a>{' '}
          calculates the average age of all dollars invested in acquiring a
          particular coin.
        </div>
        <div className={styles.block}>
          This metric identifies accumulation and sell cycles for any coin,{' '}
          <span className={styles.highline}>
            and identifying dips in Mean Dollar Age
          </span>{' '}
          can serve as a novel bullish indicator.
        </div>
      </>
    )
  },
  {
    title: 'Top Holders Template',
    description: (
      <>
        Crypto is still a whale’s playground.{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/top-token-holders-and-their-role-as-leading-indicators-5618'
        >
          This template
        </a>{' '}
        monitors the behavior of the biggest addresses holding Ethereum as well
        as various ERC-20 coins.
        <div className={styles.block}>
          The template includes a dozen views of top whales’ behavior, including
          balance changes, big accumulation/sell-off events and week-to-week
          adjustments to total supply held.
        </div>
      </>
    ),
    isImage: true,
    svg: topHodersSvg
  },
  {
    title: 'NVT Ratio Template',
    description: (
      <>
        This template calculates the NVT ratio for BTC, ETH and several ERC-20
        coins, and assigns a bullish/bearish value to its historical and
        present-day performance.
        <div className={styles.block}>
          The idea behind the NVT ratio is simple - if the value transferred on
          the network (token circulation) is{' '}
          <span className={styles.highline}>too low</span> relative to the
          network's valuation (market cap), the asset should be considered{' '}
          <span className={styles.highline}>overvalued</span> and due for a
          correction.
        </div>
        <div className={styles.block}>
          And vice versa - if the value transferred on the network is too{' '}
          <span className={styles.highline}>high</span>
          compared to its current valuation, NVT would deem the asset{' '}
          <span className={styles.highline}>undervalued</span>, and ripe for a
          breakout.
        </div>
      </>
    ),
    isImage: true,
    svg: nvtRatioSvg,
    isLeft: true
  },
  {
    title: 'Price-DAA Divergence Template',
    description: (
      <>
        We{' '}
        <a
          className={styles.link}
          rel='noopener noreferrer'
          target='_blank'
          href='https://insights.santiment.net/read/price---daily-addresses-divergence%3A-%0Aa-primer-on-on-chain-trading-strategies-2222'
        >
          have found
        </a>{' '}
        that major differences in the coin’s price and network activity trends
        can present opportune times to buy OR sell, depending on the trend’s
        direction.
        <div className={styles.block}>
          {' '}
          This template triggers BUY and SELL signals for Bitcoin and Ethereum
          based on major divergences in price and the amount of daily addresses
          interacting with the coin.
        </div>
      </>
    ),
    isImage: true,
    svg: priceDaaSvg
  },
  {
    title: 'Network Growth & Daily Active Addresses Template',
    isLeft: true,
    isImage: true,
    description: (
      <>
        This template compares the amount of network growth and daily active
        address percentage changes of Bitcoin, Ethereum, and other projects over
        time. In general, many projects create new addresses at similar
        percentage rate to one another as markets ebb and flow. Identifying
        which projects are creating new addresses and growing their network at a
        faster rate than their price is generally an excellent strategy to find
        buy low opportunities.
      </>
    ),
    svg: networkGrowthSvg
  }
]
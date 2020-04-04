import { TooltipSetting, FORMATTER } from '../../../../dataHub/tooltipSettings'

/*
"holders_distribution_0_to_0.001"
"holders_distribution_0.001_to_0.01"
"holders_distribution_0.01_to_0.1"
"holders_distribution_0.1_to_1"
"holders_distribution_1_to_10"
"holders_distribution_10_to_100"
"holders_distribution_100_to_1k"
"holders_distribution_1k_to_10k"
"holders_distribution_10k_to_100k"
"holders_distribution_100k_to_1M"
"holders_distribution_1M_to_10M"
"holders_distribution_10M_to_inf"
"holders_distribution_total"
*/

export const TopHolderMetrics = {
  holders_distribution_0_to_0001: {
    label: '(0 - 0.001) coins',
    queryKey: 'holders_distribution_0_to_0.001'
  },
  holders_distribution_0001_to_001: {
    label: '(0.001 - 0.01) coins',
    queryKey: 'holders_distribution_0.001_to_0.01'
  },
  holders_distribution_001_to_01: {
    label: '(0 - 0.1) coins',
    queryKey: 'holders_distribution_0.01_to_0.1'
  },
  holders_distribution_01_to_1: {
    label: '(0.1 - 1) coins',
    queryKey: 'holders_distribution_0.1_to_1'
  },
  holders_distribution_1_to_10: {
    label: '(1 - 10) coins'
  },
  holders_distribution_10_to_100: {
    label: '(10 - 100) coins'
  },
  holders_distribution_100_to_1k: {
    label: '(100 - 1000) coins'
  },
  holders_distribution_1k_to_10k: {
    label: '(1000 - 10000) coins'
  },
  holders_distribution_10k_to_100k: {
    label: '(10000 - 100000) coins'
  },
  holders_distribution_100k_to_1M: {
    label: '(100000  - 1000000) coins'
  },
  holders_distribution_1M_to_10M: {
    label: '(1000000 - 10000000) coins'
  }
}

Object.keys(TopHolderMetrics).forEach(key => {
  TopHolderMetrics[key].key = key
  TopHolderMetrics[key].node = 'line'
})

Object.values(TopHolderMetrics).forEach(({ key, label }) => {
  TooltipSetting[key] = {
    label,
    formatter: FORMATTER
  }
})

export const TOP_HOLDER_METRICS = Object.values(TopHolderMetrics)

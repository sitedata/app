import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import FormikSelect from '../../../../../components/formik-santiment-ui/FormikSelect'
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput'
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel'
import {
  ALL_ERC20_PROJECTS_QUERY,
  allProjectsForSearchGQL
} from '../../../../../pages/Projects/allProjectsGQL'
import { ASSETS_BY_WALLET_QUERY } from '../../../../HistoricalBalance/common/queries'
import {
  mapAssetsHeldByAddressToProps,
  mapToAssets,
  isPossibleEthAddress
} from '../../../utils/utils'
import styles from '../signal/TriggerForm.module.scss'

const isDisabledWalletAddressField = (
  canUseMappedErc20,
  target,
  allErc20Projects
) => {
  if (canUseMappedErc20 || !target || !target.value) {
    return false
  }

  return !(
    target.value === 'ethereum' ||
    allErc20Projects.some(x => x.value === target.value)
  )
}

const propTypes = {
  metaFormSettings: PropTypes.any,
  values: PropTypes.any.isRequired,
  target: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  byAddress: PropTypes.string,
  assets: PropTypes.array
}

const TriggerFormHistoricalBalance = ({
  data: { allErc20Projects = [], allProjects = [] } = {},
  metaFormSettings,
  assets = [],
  setFieldValue,
  byAddress = '',
  values: { target }
}) => {
  const [erc20List, setErc20] = useState(allErc20Projects)
  const [allList, setAll] = useState(allProjects)
  const [heldAssets, setHeldAssets] = useState(assets)

  useEffect(
    () => {
      allErc20Projects.length && setErc20(allErc20Projects)
      allProjects.length && setAll(allProjects)
      assets.length && setHeldAssets(assets)
    },
    [allErc20Projects, allProjects, assets]
  )

  const canUseMappedErc20 = !!byAddress && assets.length > 0
  const disabledWalletField = isDisabledWalletAddressField(
    canUseMappedErc20,
    target,
    erc20List
  )
  const selectableProjects =
    canUseMappedErc20 && assets.length > 0 ? assets : allList

  const { ethAddress, target: defaultAsset } = metaFormSettings

  if (
    target &&
    target.value &&
    selectableProjects.length > 0 &&
    !selectableProjects.some(({ value }) => value === target.value)
  ) {
    setFieldValue('target', '')
  }

  return (
    <div className={styles.row}>
      <div className={styles.Field}>
        <FormikLabel text='Wallet' />
        <FormikInput
          disabled={disabledWalletField}
          validator={isPossibleEthAddress}
          name='ethAddress'
          placeholder={
            disabledWalletField ? 'Only for ETH and ERC20' : 'Wallet address'
          }
        />
      </div>

      <div className={styles.Field}>
        <FormikLabel />
        <FormikSelect
          name='target'
          disabled={defaultAsset.isDisabled}
          defaultValue={defaultAsset.value.value}
          placeholder='Pick an asset'
          required
          options={selectableProjects}
          onChange={newAsset => {
            if (disabledWalletField) {
              setFieldValue('ethAddress', '')
            } else if (ethAddress) {
              if (
                metaFormSettings.target.value.value === newAsset.value ||
                heldAssets.some(a => a.value === newAsset.value)
              ) {
                setFieldValue('ethAddress', ethAddress)
              } else {
                setFieldValue('ethAddress', '')
              }
            }
          }}
        />
      </div>
    </div>
  )
}

const mapDataToProps = ({
  Projects: { allErc20Projects, allProjects },
  ownProps
}) => {
  const { data = {} } = ownProps
  return {
    ...ownProps,
    data: {
      allErc20Projects: mapToAssets(allErc20Projects) || data.allErc20Projects,
      allProjects: mapToAssets(allProjects, false) || data.allProjects
    }
  }
}

const enhance = compose(
  graphql(allProjectsForSearchGQL, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(ALL_ERC20_PROJECTS_QUERY, {
    name: 'Projects',
    props: mapDataToProps,
    options: () => {
      return {
        errorPolicy: 'all'
      }
    }
  }),
  graphql(ASSETS_BY_WALLET_QUERY, {
    name: 'assetsByWallet',
    props: mapAssetsHeldByAddressToProps,
    skip: ({ byAddress }) => !byAddress,
    options: ({ byAddress }) => {
      return {
        variables: {
          address: byAddress
        },
        errorPolicy: 'all'
      }
    }
  })
)

TriggerFormHistoricalBalance.propTypes = propTypes

export default enhance(TriggerFormHistoricalBalance)
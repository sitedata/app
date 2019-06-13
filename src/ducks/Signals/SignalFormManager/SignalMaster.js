import React from 'react'
import { push } from 'react-router-redux'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createTrigger, toggleTrigger, updateTrigger } from '../Redux/actions'
import {
  Message,
  PanelWithHeader as Panel,
  Toggle
} from '@santiment-network/ui'
import TriggersForm from './SignalCrudForm/SignalsList/TriggersForm'
import AboutForm from './AboutForm/AboutForm'
import styles from './SignalCrudForm/Signal/TriggerForm.module.scss'
import { TRIGGER_BY_ID_QUERY } from '../GQL/SignalsGQL'
import { Icon } from '@santiment-network/ui'
import {
  mapTriggerToFormProps,
  mapFormPropsToTrigger,
  mapTriggerToProps
} from '../Utils/utils'

const STEPS = {
  SETTINGS: 0,
  CONFIRM: 1
}

export class SignalMaster extends React.PureComponent {
  state = {
    step: STEPS.SETTINGS,
    trigger: {
      title: `Signal_[${new Date().toLocaleDateString('en-US')}]`,
      description: 'Any',
      isActive: true,
      isPublic: true
    }
  }

  render () {
    const { isEdit, triggerObj = {}, metaFormSettings } = this.props

    if (isEdit && triggerObj.isLoading) {
      return 'Loading...'
    }
    if (isEdit && triggerObj.isError) {
      return <Message variant='error'>{triggerObj.errorMessage}</Message>
    }
    const { step, trigger: stateTrigger } = this.state
    const currentTrigger = triggerObj.trigger || stateTrigger
    let triggerSettingsFormData = currentTrigger
      ? mapTriggerToFormProps(currentTrigger)
      : {}

    const triggerAboutFormData = {
      title: currentTrigger.title,
      description: currentTrigger.description
    }

    if (this.props.asset) {
      triggerSettingsFormData = {
        ...triggerSettingsFormData,
        target: {
          value: this.props.asset,
          label: this.props.asset
        }
      }
    }

    const toggleSignalCallback = () => {
      if (currentTrigger.id) {
        this.props.toggleSignal({
          id: currentTrigger.id,
          isPublic: currentTrigger.isPublic
        })
      } else {
        const { trigger } = this.state
        const newTrigger = { ...trigger, isPublic: !trigger.isPublic }
        this.setState({ trigger: newTrigger })
      }
    }

    const getTitle = ({ id }) => {
      switch (step) {
        case STEPS.SETTINGS: {
          return id > 0 ? 'Update signal' : 'Create Signal'
        }
        case STEPS.CONFIRM: {
          return triggerSettingsFormData.isPublic
            ? 'Create public signal'
            : 'Create private signal'
        }
        default: {
          return ''
        }
      }
    }

    return (
      <div className={styles.wrapper}>
        <Icon
          className={styles.closeButton}
          onClick={this.props.onClose}
          type='close'
        />
        <Panel
          header={getTitle(currentTrigger)}
          className={styles.TriggerPanel}
        >
          {step === STEPS.SETTINGS && (
            <TriggersForm
              onClose={this.props.onClose}
              triggers={[currentTrigger]}
              settings={triggerSettingsFormData}
              canRedirect={this.props.canRedirect}
              metaFormSettings={{ ...metaFormSettings }}
              onSettingsChange={this.handleSettingsChange}
            />
          )}
          {step === STEPS.CONFIRM && (
            <AboutForm
              triggerMeta={triggerAboutFormData}
              isEdit={this.props.isEdit}
              onBack={this.backToSettings}
              onSubmit={this.handleAboutFormSubmit}
            />
          )}

          <div className={styles.triggerToggleBlock}>
            <Toggle
              onClick={toggleSignalCallback}
              isActive={currentTrigger.isPublic}
            />
            <div className={styles.triggerToggleLabel}>
              {currentTrigger.isPublic ? 'Public' : 'Private'}
            </div>
          </div>
        </Panel>
      </div>
    )
  }

  backToSettings = prefilledData => {
    const { trigger } = this.state
    this.setState({
      step: STEPS.SETTINGS,
      trigger: { ...trigger, ...prefilledData }
    })
  }

  handleSettingsChange = formProps => {
    const { trigger } = this.state
    const prevTrigger = (this.props.trigger || {}).trigger || trigger

    this.setState({
      trigger: mapFormPropsToTrigger(formProps, prevTrigger),
      step: STEPS.CONFIRM
    })
  }

  handleAboutFormSubmit = about => {
    const data = {
      ...this.state.trigger,
      ...about,
      shouldReload: this.props.canRedirect
    }

    if (this.props.isEdit) {
      this.props.updateTrigger(data)
    } else {
      this.props.createTrigger(data)
    }
    this.props.onClose && this.props.onClose()
    this.props.canRedirect && this.props.redirect && this.props.redirect()
  }
}

const mapDispatchToProps = dispatch => ({
  toggleSignal: ({ id, isActive }) => {
    dispatch(toggleTrigger({ id, isActive }))
  },
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  },
  updateTrigger: payload => {
    dispatch(updateTrigger(payload))
  },
  redirect: (path = '/sonar/feed/my-signals') => {
    dispatch(push(path))
  }
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(TRIGGER_BY_ID_QUERY, {
    skip: ({ isEdit, match }) => {
      if (!match) {
        return true
      }
      const id = match.params.id
      return !isEdit || !id
    },
    options: ({
      match: {
        params: { id }
      }
    }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: +id }
      }
    },
    props: mapTriggerToProps
  })
)

export default enhance(SignalMaster)
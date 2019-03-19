import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { ALL_TAGS_QUERY } from '../pages/Insights/InsightsGQL'
import Select from './Select/Select'

class TagSelect extends Component {
  static defaultProps = {
    onChange: () => {},
    defaultTags: []
  }

  state = {
    tags: this.props.defaultTags
  }

  onChange = tags => {
    if (tags.length <= 5) {
      this.setState({ tags }, () => {
        this.props.onChange(tags)
      })
    }
  }

  render () {
    const {
      data: { tags: options = [], loading },
      className = ''
    } = this.props
    const { tags } = this.state
    return (
      <Select
        multi
        topDropdown
        placeholder='Add a tag...'
        options={options.filter(option => !!option)}
        isLoading={loading}
        value={tags}
        className={className}
        onChange={this.onChange}
        valueKey='name'
        labelKey='name'
      />
    )
  }
}

export default graphql(ALL_TAGS_QUERY, {
  options: () => {
    return {
      errorPolicy: 'all'
    }
  }
})(TagSelect)
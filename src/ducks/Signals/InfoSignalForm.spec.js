/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import InfoSignalForm from './InfoSignalForm'

describe('InfoSignalForm', () => {
  it('render correctly text component', () => {
    const constantDate = new Date('2017-06-13T04:41:20')

    /* eslint no-global-assign:off */
    Date = class extends Date {
      constructor () {
        return constantDate
      }
    }
    const wrapper = shallow(
      <InfoSignalForm onBack={() => {}} onInfoSignalSubmit={() => {}} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

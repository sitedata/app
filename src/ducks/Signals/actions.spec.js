/* eslint-env jasmine */
import { createTrigger } from './actions'

describe('Signals actions', () => {
  it('createTrigger should work', () => {
    const resultAction = createTrigger({
      metric: 'price',
      target: 'santiment',
      percentThreshold: '5',
      cooldown: '1h',
      timeWindow: '24h',
      channels: ['Telegram'],
      title: 'Check',
      description: 'check'
    })
    expect(resultAction).toMatchSnapshot()
  })

  it('createTrigger should return error if 0 channels', () => {
    const resultAction = () =>
      createTrigger({
        channels: undefined
      })
    expect(resultAction).toThrowErrorMatchingSnapshot()
  })
})
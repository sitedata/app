import * as actions from './../actions/types'
import { loadKeyState } from '../utils/localStorage.js'

export const initialState = {
  isLoading: true,
  error: false,
  data: {},
  account: null,
  token: null,
  hasMetamask: false,
  consent: null,
  insightDraft: loadKeyState('insightDraft') || {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_WEB3_ACCOUNT':
      return {
        ...state,
        account: action.account
      }
    case 'CHECK_WEB3_PROVIDER':
      return {
        ...state,
        hasMetamask: action.hasMetamask
      }
    case actions.USER_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...initialState,
        error: false,
        isLoading: false,
        token: action.token,
        consent: action.consent,
        data: {
          ...action.user
        }
      }
    case actions.USER_LOGOUT_SUCCESS:
      return {
        ...initialState,
        error: false,
        isLoading: false,
        data: {},
        token: null,
        consent: null
      }
    case actions.USER_LOGIN_FAILED:
      return {
        ...state,
        error: true,
        isLoading: false,
        data: {},
        token: null,
        consent: null,
        errorMessage: action.payload
      }
    case actions.USER_EMAIL_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          email: action.email
        }
      }
    case actions.USER_USERNAME_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          username: action.username
        }
      }
    case actions.USER_SETTING_GDPR:
      const {
        privacyPolicyAccepted = false,
        marketingAccepted = false
      } = action.payload
      return {
        ...state,
        data: {
          ...state.data,
          privacyPolicyAccepted,
          marketingAccepted
        }
      }
    case actions.USER_APIKEY_GENERATE_SUCCESS:
    case actions.USER_APIKEY_REVOKE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          apikeys: action.apikeys
        }
      }
    case actions.CHANGE_USER_DATA:
      if (!action.user) {
        return {
          ...initialState,
          hasMetamask: action.hasMetamask,
          isLoading: false
        }
      }
      return {
        ...state,
        isLoading: false,
        data: {
          ...action.user
        }
      }
    case actions.APP_USER_HAS_INACTIVE_TOKEN:
      return {
        ...initialState,
        isLoading: false
      }
    case actions.APP_UPDATE_INSIGHT_DRAFT:
      const insightDraft = { ...state.insightDraft, ...action.payload }
      window.localStorage.setItem('insightDraft', action.payload)
      return {
        ...state,
        insightDraft
      }
    case actions.APP_DELETE_INSIGHT_DRAFT:
      window.localStorage.removeItem('insightDraft')
      return {
        ...state,
        insightDraft: {}
      }
    default:
      return state
  }
}

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('user')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('user', serializedState)
  } catch (error) {
    // Ignore write errors.
  }
}

export const loadKeyState = key => {
  try {
    const serializedState = window.localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveKeyState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem(key, serializedState)
  } catch (error) {
    // Ignore write errors.
  }
}

export const loadPrevAuthProvider = () => {
  try {
    const authProviderType = window.localStorage.getItem('prev_auth_provider')
    if (authProviderType === null) {
      return undefined
    }
    return authProviderType
  } catch (error) {
    return undefined
  }
}

export const savePrevAuthProvider = (authProviderType = 'email') => {
  try {
    window.localStorage.setItem('prev_auth_provider', authProviderType)
  } catch (error) {
    // Ignore write errors.
  }
}

export const hardReloadTabs = () => {
  localStorage.setItem('reload', new Date().getTime())
  window.location.reload(true)
}

window.addEventListener('storage', evt => {
  if (
    evt.key === 'user' &&
    evt.oldValue.includes('"token":null') &&
    evt.newValue.includes('"token":"')
  ) {
    window.location.reload()
  } else if (evt.key === 'reload' && evt.oldValue !== evt.newValue) {
    window.location.reload(true)
  }
})

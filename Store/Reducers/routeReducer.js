// Store/Reducers/favoriteReducer.js

const initialState = { token: "" }


function userToken(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVETOKEN':
      const saveToken = action.value
      return saveToken
  default:
    return state
  }
}

export default userToken
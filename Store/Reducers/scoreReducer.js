// Store/Reducers/favoriteReducer.js

const initialState = { score: ["","","","","","","","","",""] }


function userScore(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SETSCORE':
      const saveToken = action.value
      return saveToken
      
  default:
    return state
  }
}

export default userScore
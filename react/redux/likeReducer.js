const { createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;

const initialState = {
  likes: [],
};


const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return {
        ...state,
        likes: action.payload,
      };
    default:
      return state;
  }
};

window.likeReducer

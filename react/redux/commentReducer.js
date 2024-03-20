const { createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;

const initialState = {
  comments: [],
};


const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

window.commentReducer

const { createStore, applyMiddleware } = Redux;
const thunk = ReduxThunk.default;

const initialState = {
  blogs: [],
};


const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return {
        ...state,
        blogs: action.payload,
      };
    default:
      return state;
  }
};

window.blogReducer

const { createStore, applyMiddleware, combineReducers } = Redux;
const thunk = ReduxThunk.default;

const blogReducer = window.blogReducer;
const likeReducer = window.likeReducer;
const commentReducer = window.commentReducer;

const rootReducer = combineReducers({
    blogs: blogReducer,
    comments: commentReducer, 
    likes: likeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
window.StoreData = store;

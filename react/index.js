const { Provider } = ReactRedux;
const store = window.StoreData;

const blogsList = document.querySelector(".blog-container");

if(blogsList){
    const blogsContainer = ReactDOM.createRoot(blogsList);
    const AllBlogs = window.AllBlogs;
    
    blogsContainer.render(
      <Provider store={store}>
        <AllBlogs />
      </Provider>
    );
}


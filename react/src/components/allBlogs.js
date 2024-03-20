const { useDispatch, useSelector } = ReactRedux;

const AllBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs) || [];
  const Blog = window.Blog;

  React.useEffect(() => {
    document.getElementById("preLoader").style.display = "none";
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <div className="flex">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            createdAt={blog.createdAt}
          />
        ))
      ) : (
        <div className="over" id="loading">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      )}
    </div>
  );
};

window.AllBlogs = AllBlogs;

const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      dispatch({ type: "GET_BLOGS", payload: result.data });
      return result;
    } catch (error) {
      return error.message;
    }
  };
};

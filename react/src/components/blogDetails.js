const BlogDetails = () => {
  const [blogId, setBlogId] = React.useState("");
  const [blog, setBlog] = React.useState(null);
  const Reactions = window.Reactions;
  // const CommentForm = window.CommentForm;

  React.useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    setBlogId(searchParams.get("id"));

    const Services = new window.BlogService();
    Services.getABlog(blogId)
      .then((data) => setBlog(data.data.data[0]))
      .catch((error) => console.error(error));
  }, []);

  const renderHTML = (content) => {
    return React.createElement("p", {
      dangerouslySetInnerHTML: { __html: content.slice(1, -1) },
    });
  };

  return (
    <div>
      {blog ? (
        <div className="blogDetails">
          <img src={blog.image} alt={blog.title} className="mainImage" />
          <div className="comment_head">
            <img
              src="../images/myProfile.png"
              alt="user"
              className="profilePicture"
            />
            <div className="comment_details">
              <h3 className="userName">{blog.createdBy}</h3>
              <p className="date">{formatedDate(blog.createdAt)}</p>
            </div>
          </div>
          <div className="blogDetails_content">
            <h1 className="title">{blog.title}</h1>
            <article className="text">{renderHTML(blog.description)}</article>
          </div>
        </div>
      ) : (
        <div className="over" id="loading">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      )}

      {blogId && (
        <section
          className="flex-col"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Reactions blogId={blogId} />
        </section>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector(".blogs"));

root.render(<BlogDetails />);

const formatedDate = (date) => {
  const dateCreated = new Date(date);
  return `${dateCreated.getDate()}/${
    dateCreated.getMonth() + 1
  }/${dateCreated.getFullYear()}`;
};

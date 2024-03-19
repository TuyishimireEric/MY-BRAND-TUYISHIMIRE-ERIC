const Blog = (props) => {
  const { id, image, title, description, createdAt } = props;

  const truncateDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length > 40) {
      return `${words.slice(0, 40).join(" ")}...`;
    }
    return description;
  };

  const [likes, setLikes] = React.useState(0);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
  
    const LikeServices = new window.LikeService();
    const CommentServices = new window.CommentServices();

    LikeServices.getBlogLikes(id)
      .then((data) => setLikes(data.data))
      .catch((error) => console.error(error));
    CommentServices.getBlogComments(id)
      .then((data) => setComments(data.data.data))
      .catch((error) => console.error(error));
  }, []);

  const renderHTML = (content) => {
    return React.createElement("p", {
      dangerouslySetInnerHTML: { __html: content.split(" ").slice(1, 40).join(" ") },
    });
  };

  const openBlog = (id) =>{
      const urlToOpen = `./pages/blogDetails.html?id=${id}`;
      window.location.href = urlToOpen;
  }

  return (
    <article className="blog" key={id} data-aos="zoom-in-up" onClick={()=>openBlog(id)}>
      <div className="blog-image">
        <img src={image} alt={title} />
      </div>
      <div className="blog-details">
        <h3 className="blog-title">{title}</h3>
        <div className="summary">
          <p className="date">{formatedDate(createdAt)}</p>
          <article className="blog-description text-small">
            {renderHTML(description)}...
          </article>
          <span className="readMore">read more </span>
        </div>
        <div className="reviews flex">
          <span></span>
          <span className="likes flex">
            <p>
              {likes}<i className="fa fa-heart"></i>
            </p>
            <p>
              {comments.length}<i className="fa fa-comment"></i>
            </p>
          </span>
        </div>
      </div>
    </article>
  );
};

window.Blog = Blog;

const formatedDate = (date) => {
  const dateCreated = new Date(date);
  return `${dateCreated.getDate()}/${
    dateCreated.getMonth() + 1
  }/${dateCreated.getFullYear()}`;
};


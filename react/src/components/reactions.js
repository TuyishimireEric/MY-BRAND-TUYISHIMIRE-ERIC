const Reactions = (props) => {
  const { blogId } = props;
  const [likes, setLikes] = React.useState(0);
  const [comments, setComments] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [updateComments, setUpdateComments] = React.useState(false);

  const CommentForm = window.CommentForm;

  const LikeServices = new window.LikeService();
  const CommentServices = new window.CommentServices();

  React.useEffect(() => {
    LikeServices.getBlogLikes(blogId)
      .then((data) => setLikes(data.data))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(()=>{
    CommentServices.getBlogComments(blogId)
    .then((data) => setComments(data.data.data))
    .catch((error) => console.error(error));
  },[updateComments])

  const handleClick = () => {
    if (!blogId) return;
    if (!localStorage.getItem("user")) {
      // eslint-disable-next-line no-undef
      Toastify({
        text: "Please sign in",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    LikeServices.likeABlog(blogId)
      .then((data) => {
        setResult(data);
        setLikes(data.data);
        Toastify({
          text: data.message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          stopOnFocus: true,
        }).showToast();
      })
      .catch((error) => {
        Toastify({
          text: error || data.error,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          stopOnFocus: true,
        }).showToast();
      });
  };

  return (
    <div className="comments">
      <h2 className="title" data-aos="fade-up" data-aos-duration="1000">
        {" "}
        Reactions <span>( )</span>
      </h2>
      <div
        className="sticker"
        id="likeButton"
        data-aos="fade-up"
        data-aos-duration="1000"
        onClick={() => handleClick()}
      >
        <div>
          <i className="fa-solid fa-heart"></i>
          <span> {likes} Likes</span>
        </div>
      </div>
      <div className="blogComments">
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div
              className="comment"
              data-aos="fade-up"
              data-aos-duration="1000"
              key={index}
            >
              <div className="comment_head">
                <img
                  src="../images/user.png"
                  alt="user"
                  className="profilePicture"
                />
                <div className="comment_details">
                  <h3 className="userName">{comment.commentedBy}</h3>
                  <p className="date">{formatedDate(comment.createdAt)}</p>
                </div>
              </div>
              <p className="text-small">{comment.description}</p>
            </div>
          ))}
      </div>
      <CommentForm blogId={blogId} setUpdateComments={setUpdateComments} />
    </div>
  );
};

window.Reactions = Reactions;

const formatedDate = (date) => {
  const dateCreated = new Date(date);
  return `${dateCreated.getDate()}/${
    dateCreated.getMonth() + 1
  }/${dateCreated.getFullYear()}`;
};


const AllBlogs = () => {

  const Blog = window.Blog;

  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(()=>{
      const Services = new window.BlogService();
      Services.getAllBlogs().then(data => setBlogs(data.data)).catch(error => console.error(error));
      document.getElementById('preLoader').style.display = 'none';
  },[])

  return (
    <div>
      {blogs.length>0 && blogs.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          image={blog.image}
          title={blog.title}
          description={blog.description}
          createdAt={blog.createdAt}
        />
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector(".blog-container"));

root.render(<AllBlogs />);

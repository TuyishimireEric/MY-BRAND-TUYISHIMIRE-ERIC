const createBlogForm = document.querySelector(".createBlog");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector(".editorContent");
const imageInput = document.querySelector(".imageInput");
const fileInput = document.querySelector("#fileInput");
let imageUrl = "";


imageInput.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    imageInput.style.backgroundImage = `url(${reader.result})`;
    imageUrl = reader.result;
  };

  reader.readAsDataURL(file);
});

const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
const selectedBlogIndex = allBlogs.findIndex((blog) => blog.id == blogId);


const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      ratingsHTML += `<i class="fa fa-star"></i>`;
    } else {
      ratingsHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }
};

if (selectedBlogIndex !== -1) {
  const selectedBlog = allBlogs[selectedBlogIndex];
  imageInput.style.backgroundImage = `url(${selectedBlog.image})`;
  blogTitle.value = selectedBlog.title;
  blogContent.innerHTML = JSON.parse(selectedBlog.description);

  createBlogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedBlog = {
      ...selectedBlog,
      image: imageUrl || selectedBlog.image,
      title: blogTitle.value,
      description: JSON.stringify(blogContent.innerHTML),
    };
    allBlogs[selectedBlogIndex] = updatedBlog;

    localStorage.setItem("blogs", JSON.stringify(allBlogs));

    blogTitle.value = "";
    blogContent.innerHTML = "";

    window.location.href = "./blogs.html";
  });
}

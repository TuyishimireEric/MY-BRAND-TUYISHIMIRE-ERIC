const createBlogForm = document.querySelector('.createBlog');
const blogTitle = document.querySelector('#blogTitle');
const blogContent = document.querySelector('.editorContent');
const imageInput = document.querySelector(".imageInput");

const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get('id');

const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
const selectedBlogIndex = allBlogs.findIndex(blog => blog.id == blogId);

if (selectedBlogIndex !== -1) {
    const selectedBlog = allBlogs[selectedBlogIndex];
    imageInput.innerHTML = ` <img src="../../${selectedBlog.image}" alt="${selectedBlog.title}" id="selectedImage">`
    blogTitle.value = selectedBlog.title;
    blogContent.innerHTML = JSON.parse(selectedBlog.description);

    createBlogForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedBlog = { ...selectedBlog, title: blogTitle.value, description: JSON.stringify(blogContent.innerHTML) };
        allBlogs[selectedBlogIndex] = updatedBlog;

        localStorage.setItem("blogs", JSON.stringify(allBlogs));

        blogTitle.value = "";
        blogContent.innerHTML = "";
        
        window.location.href = './blogs.html';
    });
} 

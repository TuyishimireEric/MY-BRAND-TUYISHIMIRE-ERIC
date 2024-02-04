import getBlogs from "./getBlogs.js";
const removeBlogs = document.querySelectorAll(".removeBlogs");

removeBlogs.forEach((removeButton) => {
  removeButton.addEventListener("click", (e) => {
    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    e.preventDefault();
    e.stopPropagation();

    const id = e.target.closest(".blog").getAttribute("key");
    const updatedBlogs = allBlogs.filter((blog) => blog.id != id);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    
    location.reload();
  });
});

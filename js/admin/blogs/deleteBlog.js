const removeBlogs = document.querySelectorAll(".removeBlogs");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const close = document.querySelector(".close");
const cancel = document.querySelector(".cancel");
const deleteButton = document.querySelector(".delete");
const blogList = document.querySelector(".blog-list");



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


modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

cancel.addEventListener("click", () => {
  modal.style.display = "none";
});

deleteButton.addEventListener("click", () => {
  const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const id = modalContent.getAttribute("key");
  const updatedBlogs = allBlogs.filter((blog) => blog.id != id);
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  
  location.reload();
});

blogList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBlog")) {
    modal.style.display = "block";
    modalContent.setAttribute("key", e.target.closest(".blog").getAttribute("key"));
  }
});


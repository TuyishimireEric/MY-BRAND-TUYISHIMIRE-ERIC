import { deleteABlog } from "../../api/index.js";
import { showBlogs } from "./getBlogs.js";

const modal = document.querySelector("#modal");
const modalContent = document.querySelector(".modal-content");
const no = document.querySelector("#cancel");
const yes = document.querySelector("#delete");
const blogList = document.querySelector(".blog-list");
const loader = document.querySelector(".loader");


export const removeBlog = async (blogId, blogs) => {

modal.classList.add("active");

  modal.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("active");
      loader.classList.remove("show");
  });

  no.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("active");
    loader.classList.remove("show");
  });

  yes.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    loader.classList.add("show");
    yes.disabled = true;
    const deleted = await deleteABlog(blogId);
    if (!deleted.error) {
      
      Toastify({
        text: deleted.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
      }).showToast();
      modal.classList.remove("active");
      loader.classList.remove("show");
      yes.disabled = false;

      const updateBlog = blogs.filter((blog) => blog._id !== blogId);
      showBlogs(updateBlog);

    } else if (deleted.error === "jwt expired"){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "../login.html";
      Toastify({
        text:  "Please login to continue",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
    }else {
      Toastify({
        text:  deleted.error || deleted.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
      modal.classList.remove("active");
      loader.classList.remove("show");
      yes.disabled = false;
    }
  });
  return;
}

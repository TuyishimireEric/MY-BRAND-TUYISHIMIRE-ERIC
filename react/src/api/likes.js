API_URL = window.API_URL;

class LikeService {
  async getBlogLikes(blogId) {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blogId}/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async likeABlog(blogId) {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blogId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error.message;
    }
  }
}

window.LikeService = LikeService;

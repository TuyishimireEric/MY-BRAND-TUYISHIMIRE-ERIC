const API_URL = window.API_URL;

class BlogService {
  async getAllBlogs() {
     try {
       const response = await fetch(`${API_URL}/api/blogs`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
       });
       const result = await response.json();
       return result;
     } catch (error) {
       return error.message;
     }
  }
 
 async getABlog(blogId) {
     try {
       const response = await fetch(`${API_URL}/api/blogs/${blogId}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
       });
       const data = await response.json();
 
       if (!response.ok) {
         throw new Error(`${data.message}`);
       } else {
         return { ok: true, data };
       }
     } catch (error) {
       return { ok: false, error: error.message };
     }
  }
 }
 
 window.BlogService = BlogService;
 
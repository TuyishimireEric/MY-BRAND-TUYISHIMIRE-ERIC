
class CommentServices {
  constructor(){
    this.API_URL = window.API_URL;
  }

  async addBlogComment (blogId, formData) {
    try {
      const response = await fetch(`${this.API_URL}/api/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`${data.message}`);
      }else{
        return { ok: true, data };
      }
    } catch (error) {
      return {ok: false, error: error.message};
    }
  }

  async getBlogComments (blogId) {
    try {
      const response = await fetch(`${this.API_URL}/api/blogs/${blogId}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`${data.message}`);
      }else{
        return { ok: true, data };
      }
    } catch (error) {
      return {ok: false, error: error.message};
    }
  }
} 

window.CommentServices = CommentServices;

const editBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const blog_id = 
  
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogs/${blog_id}', {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }

    document.querySelector('#-edit-blog-form').addEventListener('click', editBlogHandler);
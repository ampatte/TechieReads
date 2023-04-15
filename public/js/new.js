const createBlogHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogs', {
          method: 'POST',
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

    document.querySelector('#-new-blog-form').addEventListener('click', createBlogHandler);
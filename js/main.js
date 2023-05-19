const apiUrl = "https://cdr2b.pro/wp-json/wp/v2/posts?per_page=10";

fetch(apiUrl)
  .then(response => response.json())
  .then(posts => {
    // Process the fetched data
    posts.forEach(post => {
      const title = post.title.rendered;
      const featuredImage = post.featured_media;
      const description = post.excerpt.rendered;
      
      // Display the data or perform further actions
      console.log("Title:", title);
      console.log("Featured Image:", featuredImage);
      console.log("Description:", description);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error("Error fetching blog posts:", error);
  });

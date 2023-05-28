


const postId = new URLSearchParams(window.location.search).get('id');
const postContent = document.getElementById("post-content");
const featuredImageContainer = document.getElementById("featured-image");
const postDetailsContainer = document.getElementById("post-details");

function fetchPost() {
    const url = `https://cdr2b.pro/wp-json/wp/v2/posts/${postId}`;

    function setPageTitle(title) {
        const pageTitle = document.querySelector("title");
        pageTitle.textContent = `CDR2B.PRO | ${title} `;
    }
    
    
    fetch(url)
    .then((Response) => Response.json())
    .then(post => {

        const postTitle = post.title.rendered;
        setPageTitle(postTitle);

        const title = document.createElement("h1");
        title.textContent = post.title.rendered;

        if (post.featured_media) {
            const mediaUrl = `https://cdr2b.pro/wp-json/wp/v2/media/${post.featured_media}`;
            fetch(mediaUrl)
            .then(Response => Response.json())
            .then(media => {
                const image = document.createElement("img");
                image.src = media.source_url;
                image.alt = media.alt_text;
                featuredImageContainer.appendChild(image);
            })
            .catch((error) => console.log(error));
        }

        const content = document.createElement("div");
        content.innerHTML = post.content.rendered;

        postDetailsContainer.appendChild(title);
        postDetailsContainer.appendChild(content);
    })
    .catch((error) => console.log(error));

}

fetchPost();
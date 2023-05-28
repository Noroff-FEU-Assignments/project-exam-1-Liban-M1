


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

                image.addEventListener("click", function() {
                    image.classList.add("expanded");
                    document.body.classList.add("image-expanded");
                });
            })
            .catch((error) => console.log(error));
        }

        const content = document.createElement("div");
        content.innerHTML = post.content.rendered;

        postDetailsContainer.appendChild(title);
        postDetailsContainer.appendChild(content);

        for (let i = 0; i < 3; i++) {
            const lorem = document.createElement("p");
            lorem.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempus sem id justo rhoncus aliquet. Sed vulputate velit id sem lacinia efficitur. Morbi bibendum varius arcu, eu semper lectus cursus ac. Nulla in feugiat ipsum. Sed nec fermentum lectus, nec consequat magna. Nulla eu ex nisi. Aliquam id elit eu turpis gravida consectetur ut nec eros. Nullam non dapibus neque. Suspendisse potenti.";
            content.appendChild(lorem);
        }
    })
    .catch((error) => console.log(error));

}

document.addEventListener("click", function(event) {
    const expandedImage = document.querySelector("#featured-image img.expanded");
    if (expandedImage && !expandedImage.contains(event.target)) {
        expandedImage.classList.remove("expanded");
        document.body.classList.remove("image-expanded");
    }
});


fetchPost();
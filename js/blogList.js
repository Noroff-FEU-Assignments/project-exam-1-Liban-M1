let page = 1;

function fetchPosts() {
    const url = `https://cdr2b.pro/wp-json/wp/v2/posts?per_page=10&page=${page}`;

    fetch(url)
    .then((Response) => Response.json())
    .then((posts) => {
        const blogPostsContainer = document.getElementById("blog-posts");
        const loadMoreButton = document.getElementById("load-more-button");

        posts.forEach((post) => {
            const cardWrapper = document.createElement("div");
            cardWrapper.className = "card-wrapper";

            const card = document.createElement("div");
            card.className = "card";

            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";

            const imageLink = document.createElement("a");
            imageLink.className = "image-link";
            imageLink.href = `post.html?id=${post.id}`;

            const image = document.createElement("img");
            image.className = "image";

            if (post.featured_media) {
                fetch (`https://cdr2b.pro/wp-json/wp/v2/media/${post.featured_media}`)
                .then((Response) => Response.json())
                .then((media) => {
                    if (media.source_url) {
                        image.src = media.source_url;
                        image.alt = media.alt_text;
                    } else {
                        image.src = "https://via.placeholder.com/150";
                        image.alt = "Placeholder image";
                    }
                })
                .catch((error) => console.log(error));
            } else {
                image.src = "https://via.placeholder.com/150";
                image.alt = "Placeholder image";
            }
            image.alt = post.title.rendered;

            imageLink.appendChild(image);
            imageWrapper.appendChild(imageLink);
            card.appendChild(imageWrapper);

            const textBoxWrapper = document.createElement("div");
            textBoxWrapper.className = "text-box-wrapper";

            const textBox = document.createElement("div");
            textBox.className = "text-box";

            const heading = document.createElement("h1");
            heading.className = "heading";
            heading.textContent = post.title.rendered;

            const text = document.createElement("div");
            text.className = "text";
            text.innerHTML = truncateText(post.content.rendered, 200);

            textBox.appendChild(heading);
            textBox.appendChild(text);
            textBoxWrapper.appendChild(textBox);
            card.appendChild(textBoxWrapper);

            const buttonWrapper = document.createElement("div");
            buttonWrapper.className = "button-wrapper";

            const readMoreButton = document.createElement("a");
            readMoreButton.className = "button";
            readMoreButton.href = `post.html?id=${post.id}`;
            readMoreButton.textContent = "Read More....";

            buttonWrapper.appendChild(readMoreButton);
            card.appendChild(buttonWrapper);

            cardWrapper.appendChild(card);
            blogPostsContainer.appendChild(cardWrapper);
        });

        if (posts.length < 10) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "inline-block";
        }
    })
    .catch((error) => console.log(error));
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substr(0, maxLength) + "...";
    }
    return text;
}

function loadMore() {
    page++;
    fetchPosts();
}

fetchPosts();



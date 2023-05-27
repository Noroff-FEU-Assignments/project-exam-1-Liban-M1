document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-container");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const viewAllBtn = document.querySelector(".view-all-btn");
    let counter = 0;

    function fetchPosts() {
        const url = "https://cdr2b.pro/wp-json/wp/v2/posts?per_page=12";

        fetch(url)
        .then((Response) => Response.json())
        .then((posts) => {
            posts.forEach((post, index) => {
                if (post.featured_media) {
                    fetch(
                        `https://cdr2b.pro/wp-json/wp/v2/media/${post.featured_media}`
                    )
                    .then((Response) => Response.json())
                    .then((media) => {
                        const image = new Image();
                        image.src = media.source_url;
                        image.alt = media.alt_text;

                        const title = document.createElement("h3");
                        title.textContent = post.title.rendered;

                        const slide = document.createElement("div");
                        slide.classList.add("slide");
                        slide.appendChild(image);
                        slide.appendChild(title);
                        slider.appendChild(slide);

                        slide.addEventListener("click", () => {
                            navigateToBlog(post);
                        });
                    })
                    .catch((error) => console.log(error));
                }
            });
        })
        .catch((error) => console.log(error));
    }
                
                function slideToNext() {
                    counter++;
                    const slides = document.querySelectorAll(".slide");
                    if (counter > Math.ceil(slides.length / 4) - 1) {
                        counter = 0;
                    }
                    slider.style.transform = `translateX(${-counter * 100}%)`;
                }
                
                function slideToPrev() {
                    counter--;
                    const slides = document.querySelectorAll(".slide");
                    if (counter < 0) {
                        counter = Math.ceil(slides.length / 4) - 1;
                    }
                    slider.style.transform = `translateX(${-counter * 100}%)`;
                }

                function navigateToBlog(post) {
                    const blogTitle = "My Blog | " + post.title.rendered;
                    const blogId = post.id;
                    const blogUrl = `post.html?id=${blogId}`;

                    document.title = blogTitle;
                    window.location.href = blogUrl;
                }
            

                fetchPosts();

                prevBtn.addEventListener("click", slideToPrev);
                nextBtn.addEventListener("click", slideToNext);
                viewAllBtn.addEventListener("click", () => {
                    window.location.href = "blog.html";
                });
            });

                
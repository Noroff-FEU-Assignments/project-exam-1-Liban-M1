import { WP_API_BASE_URL, WP_API_USERNAME, WP_API_PASSWORD } from "./keychain.js";

const apiPath = "wp/v2/posts";
const endPoint = `${WP_API_BASE_URL}${apiPath}`;

fetch(endPoint, {
    headers: {
        Authorization: `Basic ${btoa(`${WP_API_USERNAME}:${WP_API_PASSWORD}`)}`,
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(post => {
            console.log(post.title.rendered);
            console.log(post.content.rendered);
        });
    })
    .catch(error => console.error(error));


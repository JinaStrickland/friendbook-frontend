const postUrl = "http://localhost:3000/posts/"

document.addEventListener("DOMContentLoaded", () => {
    fetchPosts()
    
})

function fetchPosts() {

    const ul = document.querySelector("#post-text")
    fetch(postUrl)
    .then(res => res.json())
    .then(posts => posts.forEach(post => displayPosts(post)))

}

function displayPosts(post) {
    const ul = document.querySelector("#post-text")
    const p = document.createElement("p")
    p.innerHTML = post.post + post.user_id
    ul.append(p)


}


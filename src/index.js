const postUrl = "http://localhost:3000/posts/"
const userURL = "http://localhost:3000/users/"

document.addEventListener("DOMContentLoaded", () => {
    fetchUser()
})

function fetchUser() {
    fetch(userURL+"/22")
    .then(res => res.json())
    .then(printPosts)
}

function printPosts(user){
    user.posts.forEach(post => displayPosts(post))

    const username = document.querySelector("#username")
    username.innerText = `Welcome ${user.name}`
}

function displayPosts(post) {
    const div = document.querySelector("div.posts")
    const p = document.createElement("p")
    p.innerHTML = post.post 
    p.classList.add("post")

    const postLikeBtn = document.createElement("button")
    postLikeBtn.classList.add("p-like-btn")
    postLikeBtn.innerHTML = `${post.likes} ♥`
    div.append(p)
    p.append(postLikeBtn)
    
    post.comments.forEach(comment => {
            const ul = document.createElement("ul")
            ul.classList.add("comments")
            const li = document.createElement("li")
            li.innerHTML = comment.comment
            
            const commentLikeBtn = document.createElement("button")
            commentLikeBtn.classList.add("c-like-btn")
            commentLikeBtn.innerHTML = `${comment.likes} ♥`
            li.append(commentLikeBtn)
            ul.append(li)
            p.append(ul)

    })
    
}



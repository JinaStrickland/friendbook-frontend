const postURL = "http://localhost:3000/posts/"
const userURL = "http://localhost:3000/users/"
const commentURL = "http://localhost:3000/comments/"

document.addEventListener("DOMContentLoaded", () => {
    fetchUser()
})

function fetchUser() {
    fetch(userURL+"5")
    .then(res => res.json())
    .then(user => {
        printPosts(user)
        addNewPost(user) 
    })
}

function printPosts(user){
    
    const username = document.querySelector("#username")
    const userImage = document.querySelector("a.user-image")
    const img = document.createElement("img")

    username.innerText = user.name
    img.src = user.image 
    userImage.append(img)
  
    user.posts.forEach(post => {
        const divPosts = document.querySelector("div#posts")

        const divHeading = document.createElement("div")
        divHeading.classList.add("panel-heading")
        divHeading.id = "posts"
        divHeading.innerHTML = username.innerText 

        const divBody = document.createElement("div")
        divBody.classList.add("panel-body")
        divBody.innerHTML = `posted at:  ${post.created_at}`
    
        const ul = document.createElement("ul")
        ul.classList.add("list-group")
        const li = document.createElement("li")
        li.classList.add("list-group-item")
        li.innerHTML = post.post 

        divPosts.append(divHeading)
        divHeading.append(divBody)
        divBody.append(ul)
        ul.append(li)

        const postLikeBtn = document.createElement("button")
        postLikeBtn.classList.add("p-like-btn")
        postLikeBtn.innerHTML = `${post.likes} ♥`
        li.append(postLikeBtn)

            postLikeBtn.addEventListener("click", () => {
                let likes = post.likes
                fetch(postURL + post.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: ++post.likes
                    })
                })
                .then(res => res.json())
                .then(updatedLikes => {
                    postLikeBtn.innerHTML = `${updatedLikes.likes} ♥` 
                })
            })
        
        const postDeleteBtn = document.createElement("button")
        postDeleteBtn.classList.add("p-delete-btn")
        postDeleteBtn.innerHTML= "x"
        li.append(postDeleteBtn)

            postDeleteBtn.addEventListener("click", () => {
                fetch(postURL + post.id, {
                    method: "DELETE"
                })
                .then(() => divHeading.remove())
            })
    
        post.comments.forEach(comment => {
            const extLi = document.querySelector("li.list-group-item")

            const commentUl = document.createElement("ul")
            commentUl.classList.add("list-group")
            const commentLi = document.createElement("li")
            commentLi.classList.add("list-group-item")
            commentLi.innerHTML = comment.comment 

            const commentLikeBtn = document.createElement("button")
            commentLikeBtn.classList.add("c-like-btn")
            commentLikeBtn.innerHTML = `${comment.likes} ♥`

                commentLikeBtn.addEventListener("click", () => {
                    fetch(commentURL + comment.id, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            likes: ++comment.likes
                        })
                    })
                    .then(res => res.json())
                    .then(updatedLikes => {
                        commentLikeBtn.innerHTML = `${updatedLikes.likes} ♥` 
                    })
                })

            const commentDeleteBtn = document.createElement("button")
            commentDeleteBtn.classList.add("c-delete-btn")
            commentDeleteBtn.innerHTML= "x"
    
                commentDeleteBtn.addEventListener("click", () => {
                    fetch(commentURL + comment.id, {
                        method: "DELETE"
                    })
                    .then(() => commentLi.remove())
                })

            commentLi.append(commentLikeBtn, commentDeleteBtn)
            commentUl.append(commentLi)
            extLi.append(commentUl)
        })
    })
}

function addNewPost(user) {

    const newPostForm = document.querySelector("form.add-post-form")

        newPostForm.addEventListener("submit", (e) => {
            e.preventDefault()
            let post = e.target[0].value  
            let likes = 0
            let user_id = user.id
                
            fetch(postURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    post, likes, user_id
                })
            })
            .then(res => res.json())
            .then(newPost => {
                    appendPost(newPost)
                    newPostForm.reset()
            })
        })
}

function appendPost(newPost){

    const divPosts = document.querySelector("div#posts")
    const divHeading = document.createElement("div")
    divHeading.classList.add("panel-heading")
    divHeading.innerHTML = username.innerText 

    const divBody = document.createElement("div")
    divBody.classList.add("panel-body")
    divBody.innerHTML = `posted at:  ${newPost.created_at}`

    const ul = document.createElement("ul")
    ul.classList.add("list-group")
    const li = document.createElement("li")
    li.classList.add("list-group-item")
    li.innerHTML = newPost.post 

    const postLikeBtn = document.createElement("button")
    postLikeBtn.classList.add("p-like-btn")
    postLikeBtn.innerHTML = `${newPost.likes} ♥`
    
        postLikeBtn.addEventListener("click", () => {
            let likes = newPost.likes
            fetch(postURL + newPost.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    likes: ++newPost.likes
                })
            })
            .then(res => res.json())
            .then(updatedLikes => {
                postLikeBtn.innerHTML = `${updatedLikes.likes} ♥` 
            })
        })

    divPosts.append(divHeading)
    divHeading.append(divBody)
    divBody.append(ul)
    ul.append(li)
    li.append(postLikeBtn)

}

function deletePost(post){
    
}

function deleteComment(){


}
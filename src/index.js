const postURL = "http://localhost:3000/posts/"
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
    const username = document.querySelector("#username")
    username.innerText = user.name
  
    user.posts.forEach(post => {
        const div = document.querySelector("div#posts")

        const newDiv = document.createElement("div")
        newDiv.classList.add("panel-heading")
        newDiv.innerHTML = username.innerText 

        const divBody = document.createElement("div")
        divBody.classList.add("panel-body")
        divBody.innerHTML = `posted at:  ${post.created_at}`
    
        const ul = document.createElement("ul")
        ul.classList.add("list-group")
        const li = document.createElement("li")
        li.classList.add("list-group-item")
        li.innerHTML = post.post 

        const postLikeBtn = document.createElement("button")
        postLikeBtn.classList.add("p-like-btn")
        postLikeBtn.innerHTML = `${post.likes} ♥`
        
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

        div.append(newDiv)
        newDiv.append(divBody)
        divBody.append(ul)
        ul.append(li)
        li.append(postLikeBtn)
    
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

            commentLi.append(commentLikeBtn)
            commentUl.append(commentLi)
            extLi.append(commentUl)
        })
    })
}



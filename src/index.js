const postURL = "http://localhost:3000/posts/"
const userURL = "http://localhost:3000/users/"
const commentURL = "http://localhost:3000/comments/"

document.addEventListener("DOMContentLoaded", () => {
    fetchUser()
})

function fetchUser() {
    fetch(userURL+"8")
    .then(res => res.json())
    .then(user => {
        printPosts(user)
        addNewPost(user) 
    })
}

function printPosts(user){
    let name = user.name 
    
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
        divHeading.id = `post-${post.id}`

        // divHeading.setAttribute("name", `${name}`)
        // divHeading.setAttribute("value", `${name}`)
        // console.log(divHeading.id)
        // console.log(divHeading.id.split("-")[1])
        // divHeading.addEventListener("click", (e) => {
        //     console.log(e.target.id)
        // })
        divHeading.innerHTML = username.innerText 

        const divBody = document.createElement("div")
        divBody.classList.add("panel-body")
        divBody.innerHTML = `posted at:  ${post.created_at}`
    
        const ul = document.createElement("ul")
        ul.classList.add("list-group")
        const li = document.createElement("li")
        li.classList.add("list-group-item")
        li.innerHTML = post.post 

        const editBtn = document.createElement("button")
        editBtn.classList.add("edit-btn")
        editBtn.setAttribute("type", "button")
        editBtn.classList.add("btn")
        editBtn.classList.add("btn-sm")
        editBtn.classList.add("btn-primary")
        editBtn.innerHTML = "edit post"
        divBody.append(editBtn)

            editBtn.addEventListener("click", (e) => {
                editPost(post)
            })

        divPosts.append(divHeading)
        divHeading.append(divBody)
        divBody.append(ul)
        ul.append(li)

        const postLikeBtn = document.createElement("button")
        postLikeBtn.classList.add("p-like-btn")
        postLikeBtn.setAttribute("type", "button")
        postLikeBtn.classList.add("btn")
        postLikeBtn.classList.add("btn-sm")
        postLikeBtn.classList.add("btn-danger")
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
        
        //creating a button element
        const postDeleteBtn = document.createElement("button")
        //ading a class name 
        postDeleteBtn.classList.add("p-delete-btn")
        postDeleteBtn.classList.add("btn-info")
        postDeleteBtn.setAttribute("type", "button")
        postDeleteBtn.classList.add("btn")
        postDeleteBtn.classList.add("btn-sm")
        //innertext of Delete Button
        postDeleteBtn.innerHTML= " x "
        //adding delete button to the li
        li.append(postDeleteBtn)
        
        //setting an id attribute 
        postDeleteBtn.id = 'post-${post.id}'


            postDeleteBtn.addEventListener("click", (e) => {
                
                fetch(postURL + e.target.id.split("-")[1], {
                    method: "DELETE"
                })
                .then(() => divHeading.remove())
            })

        const divBtn = document.createElement("div")
        divBtn.classList.add("post-btn")
        li.append(divBtn)

        // const addCommentBtn = document.createElement("button")
        // addCommentBtn.classList.add("add-comment")
        // addCommentBtn.innerHTML = "add comment"
        // divBtn.append(addCommentBtn)

            // addCommentBtn.addEventListener("click", () => {
            //     console.log(e.target)
            //     debugger
            // })


        post.comments.forEach(comment => {
            const extLi = document.querySelector("li.list-group-item")

            const commentUl = document.createElement("ul")
            commentUl.classList.add("list-group")
            const commentLi = document.createElement("li")
            commentLi.classList.add("list-group-item")
            commentLi.innerHTML = comment.comment 

            const commentLikeBtn = document.createElement("button")
            commentLikeBtn.classList.add("c-like-btn")
            commentLikeBtn.classList.add("btn-danger")
            commentLikeBtn.setAttribute("type", "button")
            commentLikeBtn.classList.add("btn")
            commentLikeBtn.classList.add("btn-sm")
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
            commentDeleteBtn.classList.add("btn-info")
            commentDeleteBtn.setAttribute("type", "button")
            commentDeleteBtn.classList.add("btn")
            commentDeleteBtn.classList.add("btn-sm")
            commentDeleteBtn.innerHTML= "x"
            
                
            commentDeleteBtn.id = 'comment-${comment.id}'
            //debugger
            commentLi.append(commentDeleteBtn)

                commentDeleteBtn.addEventListener("click", (e) => {
                    //debugger
                    fetch(commentURL + e.target.id.split("-")[1], {
                        method: "DELETE"
                    })
                    .then(() => commentLi.remove())
                })

            commentLi.append(commentLikeBtn)
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
    //debugger
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

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-btn")
    editBtn.classList.add("btn-primary")
    editBtn.setAttribute("type", "button")
    editBtn.classList.add("btn")
    editBtn.classList.add("btn-sm")
    editBtn.innerHTML = "edit post"
    divBody.append(editBtn)

        editBtn.addEventListener("click", (e) => {
            editPost(post)
        })

    divPosts.append(divHeading)
    divHeading.append(divBody)
    divBody.append(ul)
    ul.append(li)

    const postLikeBtn = document.createElement("button")
    postLikeBtn.classList.add("p-like-btn")
    postLikeBtn.classList.add("btn-danger")
    postLikeBtn.setAttribute("type", "button")
    postLikeBtn.classList.add("btn")
    postLikeBtn.classList.add("btn-sm")
    postLikeBtn.innerHTML = `${newPost.likes} ♥`
    li.append(postLikeBtn)
    
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

        const postDeleteBtn = document.createElement("button")
        postDeleteBtn.classList.add("p-delete-btn")
        postDeleteBtn.classList.add("btn-info")
        postDeleteBtn.setAttribute("type", "button")
        postDeleteBtn.classList.add("btn")
        postDeleteBtn.classList.add("btn-sm")
        postDeleteBtn.innerHTML= "x"
        li.append(postDeleteBtn)

            postDeleteBtn.addEventListener("click", () => {
                fetch(postURL + newPost.id, {
                    method: "DELETE"
                })
                .then(() => divHeading.remove())
            })
}


function editPost (post) {
    let extPost = post.post 

    const extDiv = document.querySelector("div.panel-body")
    const editPostBtn = document.querySelector("button")
    editPostBtn.classList.add("edit-post-btn")
    editPostBtn.classList.add("btn-primary")
    editPostBtn.setAttribute("type", "button")
    editPostBtn.classList.add("btn")
    editPostBtn.classList.add("btn-sm")
    extDiv.append(editPostBtn)

    const editForm = document.createElement("form")
    const input = document.createElement("input")
    editForm.classList.add("edit-form")
    input.setAttribute("type", "text")
    input.setAttribute("value", `${extPost}`)
    input.innerHTML = extPost
    editForm.append(input)
    editPostBtn.append(editForm)

    const editSubmitBtn = document.createElement("button")
    editSubmitBtn.setAttribute("type", "submit")
 
    editSubmitBtn.classList.add("btn")
    editSubmitBtn.classList.add("btn-sm")
    editSubmitBtn.classList.add("btn-primary")
    editSubmitBtn.innerHTML = "Submit"
    editForm.append(editSubmitBtn)

    updatePost(post)
}

function updatePost(post) {
    const form = document.querySelector("form.edit-form")
    let postId = post.id 
    let likes = post.likes 
    let created = post.created_at 

    const divHeading = document.querySelector("div.panel-heading")

    console.log("before even tlistener")
    form.addEventListener("submit", (e) => {
        console.log("dskluhfkjsdfhkjsdhf")
        e.preventDefault()
        let newPost = e.target[0].value 
        // let newPostId = postId
        fetch(postURL + postId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post: newPost
            })
        })
        .then(res => res.json())
        .then(editedPost => {
            appendPost(editedPost)
            form[0].value = ""
        })
    })
}


// function updateDom(editedPost) {
//     const theDiv = document.querySelector("div#posts")
//     const headingDiv = document.querySelector("div.panel-heading")
//     const bodyDiv = document.querySelector("div.panel-body")
    
//     bodyDiv.innerHTML = `posted at:  ${editedPost.created_at}`
    
//     const theUl = document.querySelector("ul.list-group")
//     const theLi = document.querySelector("li.list-group-item")
//     theLi.innerHTML = editedPost.post 

//     const editPostBtn = document.querySelector("button")
//     editPostBtn.innerHTML = "edit post"

//     const editLikeBtn = document.querySelector("button.p-like-btn")
//     editLikeBtn.innerHTML = `${editedPost.likes} ♥`

//     const editDeleteBtn = document.querySelector("button.p-delete-btn")
//     editDeleteBtn.innerHTML= " x "
    
//     theDiv.append(headingDiv)
//     headingDiv.append(bodyDiv)
//     bodyDiv.append(editPostBtn)
//     bodyDiv.append(theUl)
//     theUl.append(theLi)
//     theLi.append(editLikeBtn)
//     theLi.append(editDeleteBtn)

//     debugger
// }



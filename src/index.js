const postUrl = "http://localhost:3000/posts/"
const userURL = "http://localhost:3000/users/"

document.addEventListener("DOMContentLoaded", () => {
    fetchPosts()
    fetchUser()
    
})

function fetchPosts() {
    const ul = document.querySelector("#post-text")
    fetch(postUrl)
    .then(res => res.json())
    .then(posts => posts.forEach(post => displayComments(post)))

}
function displayComments(post){
    const c = document.querySelector("#comments")

    post.comments.forEach(comment => c.innerText = comment)


}

function fetchUser() {
    fetch(userURL+"/22")
    .then(res => res.json())
    .then(printPosts)
}

function printPosts(user){
  user.posts.forEach(post => displayPosts(post))

  const username = document.querySelector("#username")
  username.innerText = user.name

}

function displayPosts(post) {
    const div = document.querySelector("#posts")
    const p = document.createElement("p")

    const button = document.createElement("button")
    p.innerHTML = post.post 

    button.innerText = post.likes
    div.append(p)
    p.append(button)
    

}




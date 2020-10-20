const postUrl = "http://localhost:3000/posts/"
const userURL = "http://localhost:3000/users/"

document.addEventListener("DOMContentLoaded", () => {
    //fetchPosts()
    fetchUser()
    
})

function fetchPosts() {
    const ul = document.querySelector("#post-text")
    fetch(postUrl)
    .then(res => res.json())
    .then(posts => posts.forEach(post => displayPosts(post)))

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
    const ul = document.querySelector("#post-text")
    const p = document.createElement("p")
    p.innerHTML = post.post 
    ul.append(p)
}




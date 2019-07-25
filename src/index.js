document.addEventListener('DOMContentLoaded', event => {
  addDogsToNavBar()
});

function addDogsToNavBar() {
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(data => {
    data.forEach(dog =>{
      dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
    })
  })
}

const dogBar = document.getElementById("dog-bar")
dogBar.addEventListener('click', event => {
  const dogId = event.target.dataset.id
  const dogInfo = document.getElementById("dog-info")
  if (dogId) {
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(dog => {
      dogInfo.innerHTML =
        `<img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id="goodOrBad" data-id="${dog.id}"></button>`
      if (dog.isGoodDog === true) {
        const goodOrBadButton = document.getElementById("goodOrBad")
        goodOrBadButton.innerText = "Good Dog!"
      } else {
        const goodOrBadButton = document.getElementById("goodOrBad")
        goodOrBadButton.innerText = "Bad Dog!"
      }
    })
  }
});

const dogInfoDiv = document.getElementById("dog-info")
dogInfoDiv.addEventListener("click", event => {
  const goodOrBadButton = document.getElementById("goodOrBad")
  const dogId = event.target.dataset.id

  if (event.target.innerText === "Good Dog!") {
    goodOrBadButton.innerText = "Bad Dog!"
    fetch(`http://localhost:3000/pups/${dogId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: false
      })
    })
  } else if (event.target.innerText === "Bad Dog!") {
    goodOrBadButton.innerText = "Good Dog!"
    fetch(`http://localhost:3000/pups/${dogId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: true
      })
    })
  }
})

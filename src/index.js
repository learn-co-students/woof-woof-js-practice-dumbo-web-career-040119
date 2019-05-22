const dog_bar = document.getElementById("dog-bar")
const dog_info = document.getElementById("dog-info")
const filter_button = document.getElementById("good-dog-filter")



function slapItOnDogBar(dog) {
  dog_bar.innerHTML += `<span id="dog" data-id="${dog.id}">${dog.name}</span>`
}

function fillDogBar(){
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(dogs => {
    dogs.forEach(dog => slapItOnDogBar(dog))
  })
}

fillDogBar()

function fillGoodDogs(){
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(dogs => dogs.filter(dog => dog.isGoodDog === true))
  .then(dogs => {
    dogs.forEach(dog => slapItOnDogBar(dog))
  })
}

filter_button.addEventListener("click", (event) => {
  if (event.target.innerText === "Filter good dogs: OFF"){
    dog_bar.innerHTML = ""
    fillGoodDogs()
    event.target.innerText = "Filter good dogs: ON"
  }
  else{
    dog_bar.innerHTML = ""
    fillDogBar()
    event.target.innerText = "Filter good dogs: OFF"
  }
})

function toggleGoodDog(event){
  let button = event.target
  if (button.innerText === "Good Dog!"){
    console.log("The Dog was Good")
    fetch(`http://localhost:3000/pups/${button.dataset.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ isGoodDog: false })
    }).then(res => res.json())
      .then(doc => button.innerText = "Bad Dog!")
  }
  else{
    console.log("The Dog was Bad")
    fetch(`http://localhost:3000/pups/${button.dataset.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ isGoodDog: true })
    }).then(res => res.json())
      .then(doc => button.innerText = "Good Dog!")
  }
}

function makeDogInfo(dog){
    dog_info.innerHTML = `
      <img src="${dog.image}">
      <h2>${dog.name}</h2>
    `
    let button = document.createElement("button")
    button.id = "good-dog-button"
    button.dataset.id = dog.id
    if (dog.isGoodDog === true){
      button.innerHTML = "Good Dog!"
    }
    else {
      button.innerHTML = "Bad Dog!"
    }
    button.addEventListener("click", toggleGoodDog)
    dog_info.appendChild(button)
}



function displayDog(event){
  if (event.target.id === 'dog') {
    let dogId = event.target.dataset.id
    console.log('You clicked a dog')
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dog => {
      makeDogInfo(dog)
    })
  }
}

dog_bar.addEventListener('click', displayDog)

document.addEventListener("DOMContentLoaded", function() {
  fillDogList()
})

function dogGoodness(){
  let selfId = parseInt(this.dataset.dogIdButton)
  let dogGoodnessText = event.target.innerText
  if (dogGoodnessText === "true") {
    dogGoodnessText = "false"
  } else {
    dogGoodnessText = "true"
  }
  fetch(`http://localhost:3000/pups/${ selfId }`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ isGoodDog: dogGoodnessText })
  })
    .then(event.target.innerText = dogGoodnessText)
}

function dogInfoEvent(data){
  const dogInfo = document.querySelector("#dog-info")
  const dogImg = document.createElement("img")
  const dogH2 = document.createElement("h2")
  const dogButton = document.createElement("button")
  dogImg.src = data.image
  dogH2.innerText = data.name
  dogButton.innerText = data.isGoodDog
  dogButton.dataset.dogIdButton = data.id
  dogButton.addEventListener("click", dogGoodness)
  if (dogInfo.children.length === 0) {
    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogH2)
    dogInfo.appendChild(dogButton)
  } else {
    dogInfo.replaceChild(dogImg, dogInfo.childNodes[1])
    dogInfo.replaceChild(dogH2, dogInfo.childNodes[2])
    dogInfo.replaceChild(dogButton, dogInfo.childNodes[3])
  }
}



function dogClickEvent(){
  let selfId = parseInt(this.dataset.dogId)
  fetch(`http://localhost:3000/pups/${ selfId }`)
    .then(res => res.json())
    .then(data => dogInfoEvent(data))
}

function slapDogOnTheList(dog){
  const dogDiv = document.querySelector("#dog-bar")
  const dogSpan = document.createElement("span")
  dogSpan.innerText = dog.name
  dogSpan.addEventListener("click", dogClickEvent)
  dogSpan.dataset.dogId = dog.id
  dogDiv.appendChild(dogSpan)
}


function fillDogList(){
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(data => data.forEach(slapDogOnTheList))
}

// image, name, and isGoodDog

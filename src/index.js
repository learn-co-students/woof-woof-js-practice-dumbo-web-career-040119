document.addEventListener("DOMContentLoaded", () => {
  const DOG_URL = 'http://localhost:3000/pups'
  const dogBar = document.querySelector('#dog-bar')
  const filterBtn = document.querySelector('#good-dog-filter')

  // filterBtn.addEventListener("click", filterPups)
  //
  // function filterPups(){
  //   allDogs = dogBar.children
  //   allDogsArray = Array.from(allDogs)
  //   console.log(allDogsArray.filter(function(dog){
  //      dog.style.visibility = dog.dataset.isGoodDog ? "visible" : "hidden"
  //    }))
  //
  // }

  fetch(DOG_URL, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(dogs => dogs.forEach(addDog))


  function addDog(dog){
    const newDog = document.createElement('span')
    newDog.innerText = dog.name
    newDog.dataset.dogId = dog.id
    newDog.className = 'dogSpan'
    newDog.dataset.isGoodDog = dog.isGoodDog
    dogBar.append(newDog)

  }

  dogBar.addEventListener('click', function (){
    if (event.target.className === 'dogSpan') {
      const dogId = event.target.dataset.dogId
      fetch(DOG_URL + '/' + dogId)
      .then(response => response.json())
      .then(dog => displayDogInfo(dog))
    }
  })

  function displayDogInfo(dog){
    const dogInfoArea = document.querySelector('#dog-info')
    dogInfoArea.innerHTML = " "

    const dogPic = document.createElement('img')
    dogPic.src = dog.image

    const dogName = document.createElement('h2')
    dogName.innerText = dog.name

    const dogButton = document.createElement('button')
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.addEventListener("click", function(){
      updateDog(event, dog)
    })

    dogInfoArea.append(dogPic, dogName, dogButton)
  }

  function updateDog(event, dog){
    let newStatus;
    if (event.target.innerText === 'Bad Dog!') {
      event.target.innerText = 'Good Dog!'
      newStatus = false
      event.target.dataset.id = newStatus
    } else {
      event.target.innerText = 'Bad Dog!'
      newStatus = true
      event.target.dataset.id = newStatus

    }
    changeDog(dog.id, newStatus)
    console.log(event.target)
  }

  function changeDog(dogId, newStatus) {

    fetch(DOG_URL + '/' + dogId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: newStatus
      })
    })
  }

})

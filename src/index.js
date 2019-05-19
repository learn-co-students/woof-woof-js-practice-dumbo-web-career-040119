const filterStatus = document.querySelector('#filter-status');
const buttonFilter = document.querySelector('#good-dog-filter');
const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
let currentDog = null;
let isGood = false;
filterStatus.innerText = "OFF";

document.addEventListener("DOMContentLoaded", function() {
    console.log('loaded');
    loadFilter();
});

function loadFilter(){
    dogBarLoad();
    buttonFilter.addEventListener('click', function(e){
        isGood = !isGood;   
        if (isGood){
            filterStatus.innerText = "ON";
        }
        else{
            filterStatus.innerText = "OFF";
        }
        dogBarLoad();
    })
}

function dogBarLoad(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(data => {
        //store filtered pups based isGood or not
        let filteredPups = null;
        let onlyGood = data.filter(pup => {
            return pup.isGoodDog
        })    
        //filters which array to use
        if (isGood){
            filteredPups = onlyGood;
            }
        else{
            filteredPups = data;
        } 
        //reset dogBar element container
        while (dogBar.firstChild) {
            dogBar.removeChild(dogBar.firstChild);
        }
        //refactored every element is created in a separate function
        createElements(filteredPups);
    })
}

function changeStatus(){
    let newDogStatus = !currentDog.isGoodDog;
    fetch(`http://localhost:3000/pups/${currentDog.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            isGoodDog: newDogStatus
          })
    })
    // .then(resp => resp.json())
    // .then(data => {
    //     console.log(data)
    // })
}

function createElements(filteredPups){
    filteredPups.forEach(pup => {

        let span = document.createElement('span');
        span.innerText = pup.name;
        span.addEventListener('click',function(){
        
            while (dogInfo.firstChild) {
                 dogInfo.removeChild(dogInfo.firstChild);
            }

            let img = document.createElement('img');
            img.src = pup.image;
            let h2 = document.createElement('h2');
            h2.innerText = pup.name
            let button = document.createElement('button');
            
            if (pup.isGoodDog){
                button.innerText = "Good Dog!"
            }
            else{
                button.innerText = "Bad Dog!"
            }

            button.addEventListener('click',function(){
                currentDog = pup;
                changeStatus();
            })

            dogInfo.appendChild(img);
            dogInfo.appendChild(h2)
            dogInfo.appendChild(button);
        })
        dogBar.appendChild(span);
    })
}

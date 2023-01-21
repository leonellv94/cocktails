



let searchInput = document.querySelector('.searchInput')
let searchButton = document.querySelector('.searchButton')
let API_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
let API_SEARCH = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const HTMLResponse = document.querySelector('#drinks')
const ingredients = document.querySelector('.ingredients_container')
const ingredientsQuantity = document.querySelector('.ingredients_quantity_container')
const links = document.querySelectorAll('.links')
let drinks = []

////////////////////WINDOWS SCROLL //////////////////

function scrolls() { 
    window.scroll(0, 0)
}

////////////////////ALPHABET ORDER //////////////////


links.forEach((link) => {
    link.addEventListener('click', () => {
        scrolls()
        HTMLResponse.innerHTML = '';
        ingredients.innerHTML = '';
        ingredientsQuantity.innerHTML = '';
        let alphabetLetter = link.innerHTML.toLowerCase()
        let arr = API_LIST_URL.split('')
        arr.pop()
        arr.push(alphabetLetter)
        API_LIST_URL = arr.join('')


        xhr.open('GET', `${API_LIST_URL}`)
        xhr.send()
    })
})

///////////////////////SEARCH INPUT /////////////////

searchButton.addEventListener('click', (e) => {
    scrolls()
    HTMLResponse.innerHTML = ''
    ingredients.innerHTML = '';
    ingredientsQuantity.innerHTML = '';

    let inputContent = searchInput.value.toLowerCase()
    API_SEARCH = API_SEARCH.concat(inputContent)
    console.log(API_SEARCH)
    xhr.open('GET', `${API_SEARCH}`)
    xhr.send()

    e.preventDefault()
})


/////////////////////// REQUESTS ////////////////////////

function onRequestHandler() {
    if(this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        if(data.drinks === null) {
            HTMLResponse.innerHTML = '<p style="color:red;">Elements not Found</p>'
        }
        for(let i = 0; i < data.drinks.length; i++) {
            HTMLResponse.innerHTML +=  `<li class='drink'>
            <p>${data.drinks[i].strDrink}</p>
            <img src="${data.drinks[i].strDrinkThumb}">
            </li>`
        }   
        const drink = document.querySelectorAll('.drink') 

        drink.forEach((dr, i) => {
            dr.addEventListener('click', () => {
                const dataDrinksInfo = Object.entries(data.drinks[i])
                scrolls()
                HTMLResponse.innerHTML = `
                <div class='drink_description2'>
                <h2 style="color:white;"> ${data.drinks[i].strDrink}</h2>
                <div class='drink_description'>
                <img src="${data.drinks[i].strDrinkThumb}">
                </div>
                <br>
                <p style="color:white;">INSTRUCTIONS: ${data.drinks[i].strInstructions}</p>
                </div>
                <h2 class='ingredients__h2' style="color:white;">INGREDIENTS:</h3>
                <h2 class='ingredients_quantity__h2' style="color:white;">QUANTITY:</h3>`

                /////////ingredients/////////////////

                for(let i = 0; i<dataDrinksInfo.length; i++) {
                    if(dataDrinksInfo[i][0].includes('strIngredient') && dataDrinksInfo[i][1] !== null) {
                        ingredients.innerHTML += `
                        <p class="drinks_ingredients">
                            ${dataDrinksInfo[i][1]}
                        </p>`
                    } else if(dataDrinksInfo[i][0].includes('strMeasure') && dataDrinksInfo[i][1] !== null) {
                        ingredientsQuantity.innerHTML += `
                        <p class="drinks_ingredients_amount">
                            ${dataDrinksInfo[i][1]}
                        </p>`
                    }
                }
            })
        })
        

    } 
}

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET', `${API_LIST_URL}`)
xhr.send()





function onRequestHandler2() {
    if(this.readyState == 4 && this.status == 200) {
        console.log(this.response)
    }
}

xhr2.addEventListener('load', onRequestHandler2);
xhr2.open('GET', `${API_SEARCH}`)
xhr2.send()






let API_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
const xhr = new XMLHttpRequest();
const HTMLResponse = document.querySelector('#drinks')
const ingredients = document.querySelector('.ingredients_container')
const ingredientsQuantity = document.querySelector('.ingredients_quantity_container')
const links = document.querySelectorAll('.links')
let drinks = []

links.forEach((link) => {
    link.addEventListener('click', () => {
        HTMLResponse.innerHTML = '';
        let alphabetLetter = link.innerHTML.toLowerCase()
        let arr = API_LIST_URL.split('')
        arr.pop()
        arr.push(alphabetLetter)
        API_LIST_URL = arr.join('')

        xhr.open('GET', `${API_LIST_URL}`)
        xhr.send()
    })
})


function onRequestHandler() {
    if(this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        // console.log(data.drinks)
        if(data.drinks === null) {
            HTMLResponse.innerHTML = '<p style="color:red;">Not Found</p>'
        }
        for(let i = 0; i < data.drinks.length; i++) {
            // console.log(data.drinks[i].strIngredient1)
            HTMLResponse.innerHTML +=  `<li class='drink'>
            <p>${data.drinks[i].strDrink}</p>
            <img src="${data.drinks[i].strDrinkThumb}">
            </li>`
        }   
        const drink = document.querySelectorAll('.drink') 

        drink.forEach((dr, i) => {
            dr.addEventListener('click', () => {
                console.log(data.drinks[i])
                const dataDrinksInfo = Object.entries(data.drinks[i])

                HTMLResponse.innerHTML = `
                <div class='drink_description'>
                <img src="${data.drinks[i].strDrinkThumb}">
                </div>
                <div class='drink_description2'>
                <h2 style="color:white;"> ${data.drinks[i].strDrink}</h2><br>
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
                        console.log(dataDrinksInfo[i][1])
                    } else if(dataDrinksInfo[i][0].includes('strMeasure') && dataDrinksInfo[i][1] !== null) {
                        ingredientsQuantity.innerHTML += `
                        <p class="drinks_ingredients_amount">
                            ${dataDrinksInfo[i][1]}
                        </p>`
                        console.log(dataDrinksInfo[i][1])
                    }
                }
            })
        })
        console.log(drink)
    } 
}

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET', `${API_LIST_URL}`)
xhr.send()

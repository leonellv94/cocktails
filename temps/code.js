const API_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if(this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        console.log(data.drinks)
        const HTMLResponse = document.querySelector('#drinks')
        for(let i = 0; i < data.drinks.length; i++) {
            console.log(data.drinks[i])
            HTMLResponse.innerHTML +=  `<li> Name:
            ${data.drinks[i].strDrink}
            <img src="${data.drinks[i].strDrinkThumb}">
            </li>`
        }
    } 
}

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET', `${API_LIST_URL}`)
xhr.send()






let API_LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
const HTMLResponse = document.querySelector('#drinks')
const links = document.querySelectorAll('.links')

links.forEach((link) => {
    link.addEventListener('click', () => {
        HTMLResponse.innerHTML = '';
        let alphabetLetter = link.innerHTML.toLowerCase()
        let arr = API_LIST_URL.split('')
        arr.pop()
        arr.push(alphabetLetter)
        API_LIST_URL = arr.join('')
        console.log(API_LIST_URL)


        xhr.addEventListener('load', onRequestHandler);
        xhr.open('GET', `${API_LIST_URL}`)
        xhr.send()
    })
})










const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if(this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        console.log(data.drinks)
        for(let i = 0; i < data.drinks.length; i++) {
            console.log(data.drinks[i])
            HTMLResponse.innerHTML +=  `<li>
            <p>${data.drinks[i].strDrink}</p>
            <img src="${data.drinks[i].strDrinkThumb}">
            </li>`
        }
    } 
}

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET', `${API_LIST_URL}`)
xhr.send()

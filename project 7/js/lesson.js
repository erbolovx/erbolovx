const phoneInput = document.querySelector(`#phone_input`);
const phoneButton = document.querySelector(`#phone_button`);
const phoneResult = document.querySelector(`#phone_result`);

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener(`click` ,  () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = `OK`
        phoneResult.style.color = `green`
    }else{
        phoneResult.innerHTML = ` NOT OK`
        phoneResult.style.color = `red`
    }
})

const tabContents = document.querySelectorAll(`.tab_content_block`)
const tabItems = document.querySelectorAll(`.tab_content_item`)
const tabParent = document.querySelector(`.tab_content_items`)

let indexSlide = 0

const hideTabContent = () => {
    tabContents.forEach((tabContent) => {
        tabContent.style.display = `none`
    })
    tabItems.forEach((tabItem) =>{
        tabItem.classList.remove(`tab_content_item_active`)
    })
}

const showTabContent = (index = 0) =>{
    tabContents[index].style.display = `block`
    tabItems[index].classList.add(`tab_content_item_active`)
}

hideTabContent()
showTabContent()

tabParent.onclick = (event) => {
    if (event.target.classList.contains(`tab_content_item`)){
        tabItems.forEach((tabItem , tabIndex) => {
            if(event.target === tabItem){
                hideTabContent()
                indexSlide = tabIndex
                showTabContent(tabIndex)
            }
        })
    }
}

const autoSlider = () => {
    setInterval(() => {
        indexSlide++
        if (indexSlide > tabContents.length - 1) {
            indexSlide = 0
        }
        hideTabContent()
        showTabContent(indexSlide)
    }, 3000)
}
autoSlider(indexSlide)

const fetchConverterData = async () => {
    try {
        const response = await fetch('../data/converter.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching converter data:', error);
        throw error;
    }
};

const converter = async (element, targetElement, targetElement2, currentValue) => {
    element.oninput = async () => {
        try {
            const data = await fetchConverterData();
            switch (currentValue) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.yuan).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    targetElement2.value = (element.value * data.yuan).toFixed(2);
                    break;
                case 'yuan':
                    targetElement.value = (element.value * data.yuan).toFixed(2);
                    targetElement2.value = (element.value / data.usd).toFixed(2);
                    break;
                default:
                    break;
            }
            element.value === '' ? targetElement.value = '' : '';
            element.value === '' ? targetElement2.value = '' : '';
        } catch (error) {
            // Обработка ошибки, например, вывод сообщения пользователю
        }
    };
};

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const yuanInput = document.querySelector('#yuan');

converter(somInput, usdInput, yuanInput, 'som');
converter(usdInput, somInput, yuanInput, 'usd');
converter(yuanInput, somInput, usdInput, 'yuan');


const fetchCardData = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching card data:', error);
        throw error;
    }
};

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1;

const cardFetcher = async (id) => {
    try {
        const data = await fetchCardData(id);
        card.innerHTML =  `
            <p>${data.title} </p>
            <p style="color: ${data.completed ? 'green' : 'red'}">
                ${data.completed}
            </p>
            <span>${data.id}</span>
        `;
        card.style.borderStyle = data.completed ? 'green': 'red';
    } catch (error) {
        // Обработка ошибки, например, вывод сообщения пользователю
    }
};

btnNext.onclick = async () => {
    if (count < 200) {
        count++;
    } else {
        count = 1;
    }
    await cardFetcher(count);
};

btnPrev.onclick = async () => {
    if (count > 1) {
        count--;
    } else {
        count = 200;
    }
    await cardFetcher(count);
};

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching posts data:', error);
    }
};

fetchPosts();

// Weather
const citySearchInput = document.querySelector('.cityName');
const cityName = document.querySelector('.city');
const cityTemp = document.querySelector('.temp');
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

const citySearch = () => {
    citySearchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`);
            const data = await response.json();
            cityName.innerHTML = data.name || 'Город не найден...';
            cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '';
        } catch (error) {
            // Обработка ошибки, например, вывод сообщения пользователю
        }
    };
};

// Вызов функции для инициализации
citySearch();

    
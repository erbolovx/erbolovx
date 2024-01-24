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


 // CONVERTOR
 const somInput = document.querySelector('#som')
 const usdInput = document.querySelector('#usd')
 const yuanInput = document.querySelector('#yuan')
 
 const converter = (element, targetElement, targetElement2, currentValue) => {
     element.oninput = () => {
         const request = new XMLHttpRequest()
         request.open('GET', '../data/converter.json')
         request.setRequestHeader('Content-type', 'application/json')
         request.send()
 
         request.onload = () => {
             const data = JSON.parse(request.response)
             switch (currentValue) {
                 case 'som':
                     targetElement.value = (element.value / data.usd).toFixed(2)
                     targetElement2.value = (element.value / data.yuan).toFixed(2)
                     break
                 case 'usd':
                     targetElement.value = (element.value * data.usd).toFixed(2)
                     targetElement2.value = (element.value * data.yuan).toFixed(2)
                     break
                 case 'yuan':
                     targetElement.value = (element.value * data.yuan).toFixed(2)
                     targetElement2.value = (element.value / data.usd).toFixed(2)
                     break
                 default:
                     break
             }
             element.value === '' ? targetElement.value = '' : ''
             element.value === '' ? targetElement2.value = '' : ''
         }
     }
 }
 
 converter(somInput, usdInput, yuanInput, 'som')
 converter(usdInput, somInput, yuanInput, 'usd')
 converter(yuanInput, somInput, usdInput, 'yuan')
 






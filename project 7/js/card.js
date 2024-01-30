const cards = document.querySelector('.cards')
const URL = 'https://jsonplaceholder.typicode.com/posts'

const cardItem = async(url) =>{
try{
    const response = await fetch(url)
    const data = await response.json()
    data.forEach(data => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <div class='cardsName'>
        <div class='cardsImg'> 
        <img class="img" src ='https://fikiwiki.com/uploads/posts/2022-02/1644866010_1-fikiwiki-com-p-van-pis-krasivie-kartinki-1.jpg' alt = 'Loofie'>
       </div> 
        <h3 class='title'>${data.title}</h3>
        <p class='solution'>${data.body}</p>
       
        </div>
        `
        cards.append(card)
    });
} catch (e){
    alert(e)
}
}
cardItem(URL)

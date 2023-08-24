const cardContainer = document.querySelector('.card__container');


function createCard(parentElement, className) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    parentElement.appendChild(card);

    const commentCard = document.createElement('div');
    commentCard.setAttribute('class', `${className}`);
    card.appendChild(commentCard);
}


// document.addEventListener('click', (e) => {
//     if(e.target.parentElement.classList.contains('card')) {
//         createCard(e.target.parentElement, 'reply__card');
//         //console.log(e.target.parentElement);
//     }
// });
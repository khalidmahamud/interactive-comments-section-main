const mainTextBox = document.querySelector('#comment-text-box');  // textarea
const sendButton = document.querySelector('.send__button'); // new comment send button
const replyBtn = document.querySelectorAll('.reply__btn'); // reply to a comment button
let deleteCommentBtn = document.querySelectorAll('.delete__button'); // delete a comment button
const editCommentBtn = document.querySelectorAll('.edit__button'); // edit a comment button
const modal = document.querySelector('.modal__container'); // modal after delete comment button is clicked
const confirmDeleteBtn = document.querySelector('#confirm-delete__btn'); // delete confirmation button in the modal
const cancelDeleteBtn = document.querySelector('#cancel-delete__btn'); // cancel deletion button in the modal

let commentToBeDeleted; // vaiable to store which comment will be deleted
let currentUser; 


// fetech user data from data.json file
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    currentUser = data.currentUser;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


// get the contenct that is in the textarea
function getContent(parentElementClass) {
  let content;

  // select the textarea of the main comment create section
  if(parentElementClass === 'comment__card') {
    content = document.querySelector('#comment-text-box');
  }
  // select the textarea of the new reply comment section
  else if(parentElementClass === 'reply__card') {
    content = document.querySelector('#reply-text-box');
  }

  //return the text in text area
  return content.value;
}

// create a new coomment. 
//'paerntElement'- where the new comment will be appended
// 'className' - which type of comment card will be created. Either a new comment a or a reply to a existing comment
function createNewComment(parentElement, className) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const html = `
          <div aria-owns=${currentUser.username} class=${className}>
              <div class="header-content--container">
                <!-- Card Header -->
                <div class="card__header">
      
                  <img class="avatar" src=${currentUser.image.webp} alt=${currentUser.username}>
                  <p class="username">${currentUser.username}</p>
                  <p class="user__highlighter">you</p>
                  <p class="createdat">Few seconds ago</p>
      
                </div>
                <!-- Card Content-->
                <div class="card__content">
      
                  <p class="content">
                    ${getContent(className)}
                  </p>
      
                </div>
              </div>
              <!-- Card Footer -->
              <div class="card__footer">
      
                <!-- Score -->
                <div class="score__feature">
      
                  <button class="minus__btn"><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg></button>
                  <p class="score">2</p>
                  <button class="plus__btn active"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg></button>
      
                </div>
      
                <div id="" class="modify__comment">
                    <button class="delete__button"><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg> Delete</button>
                    <button class="edit__button"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg> Edit</button>
                </div>
                <div class="update__button">UPDATE</div>
      
              </div>
          </div>
          
          <div class="replies"></div>`

          card.innerHTML = html;
          
          parentElement.appendChild(card);
}

// reply to an existing comment. 'targeElement' - the comment user is going to reply to
function reply(targetElement) {
    const replyTo = targetElement.getAttribute('aria-owns');

    const newReply = document.createElement('div');
    newReply.setAttribute('class', 'new__reply');

    const html = `
        <textarea class="comment__box" name="main-comment-box" id="reply-text-box" placeholder="Add a comment..."></textarea>
        <img class="user__avatar" src=${currentUser.image.webp} alt="juliusomo">
        <button class="create__reply--btn">REPLY</button>
        `

    newReply.innerHTML = html;
    targetElement.insertAdjacentElement('afterend', newReply);
    
    const textBox = newReply.querySelector('textarea');
    textBox.value = '@' + replyTo + ' ';
}

// edit the commment of the user. 'targetElement' is goiong to select which comment or reply of user is going to be edited
function editComment(targetElement) {
  const replyTo = targetElement.getAttribute('aria-owns');

  const newReply = document.createElement('div');
  newReply.setAttribute('class', 'new__reply');

  const html = `
      <textarea class="comment__box" name="main-comment-box" id="reply-text-box" placeholder="Add a comment..."></textarea>
      <img class="user__avatar" src=${currentUser.image.webp} alt="juliusomo">
      <button class="create__reply--btn">UPDATE</button>
      `

  newReply.innerHTML = html;
  targetElement.insertAdjacentElement('afterend', newReply);
  
  const textBox = newReply.querySelector('textarea');
  textBox.value = target;
}

// if user is going to create a new reply other acitve reply box should dissappear
function removeNewReplyCard() {
    const newReplyCard = document.querySelector('.new__reply');
    
    if(newReplyCard) newReplyCard.remove();
}


//create a new comment card when send button is clicked from the new comment creation section
sendButton.addEventListener('click', () => {
    const container = sendButton.parentElement.parentElement.parentElement;
    const cardContainer = container.querySelector('.card__container');

    createNewComment(cardContainer, 'comment__card')

});

// select reply button of the comment or reply user is going to reply to
replyBtn.forEach(btn => {
  const card = btn.parentElement.parentElement.parentElement;
  const replies = card.querySelector('.replies'); // select the replies section of the comment user is goiong to reply to

  btn.addEventListener('click', () => {
    removeNewReplyCard();
    reply(btn.parentElement.parentElement); // create a new reply section bleow the comment or reply user is going to reply to

    const createNewReplyBtn = document.querySelector('.create__reply--btn');

    // add the new reply to the replies section of the comment user is going to reply to
    createNewReplyBtn.addEventListener('click', () => {
        createNewComment(replies, 'reply__card');  
        removeNewReplyCard();
    });
  });
});


// if new comment creation texarea is selcted other new reply creationo section will be removed
mainTextBox.addEventListener('focus', () => {
  removeNewReplyCard();
});


cancelDeleteBtn.addEventListener('click', () => {
  modal.classList.add('invisible');
});

confirmDeleteBtn.addEventListener('click', () => {
  commentToBeDeleted.parentElement.remove();
  modal.classList.add('invisible');
});


// what happend when different button on the document is clicked
// we will use class to select the button 
document.addEventListener('click', (e) => {
  // select delete button of the user comment or reply user is going to select
  if(e.target.classList.contains('delete__button')) {
    modal.classList.remove('invisible');
    commentToBeDeleted = e.target.parentElement.parentElement.parentElement;
  }

  //increase or decrease score
  // if the user clicks on the svg of the plus__btn button
  if(e.target.parentElement.classList.contains('plus__btn') && e.target.parentElement.classList.contains('active')) {
    const scoreFeature = e.target.parentElement.parentElement; // select the score feature section the svg belongs to
    const score = scoreFeature.children[1]; // select the 'score' element that has the score
    score.innerText = (Number(score.innerText) + 1); // convert the score text into number and decrease by one
    e.target.parentElement.classList.toggle('active'); // deactivate the plus button after score is increased one time
    scoreFeature.children[0].classList.toggle('active'); // activate the minus button after the score is increased once
  }
  // if the user clicks on the svg of the minus__btn button 
  if(e.target.parentElement.classList.contains('minus__btn') && e.target.parentElement.classList.contains('active')) {
    const scoreFeature = e.target.parentElement.parentElement; // select the score feature section the svg belongs to
    const score = scoreFeature.children[1]; // select the 'score' element that has the score
    score.innerText = (Number(score.innerText) - 1); // convert the score text into number and decrease by one
    e.target.parentElement.classList.toggle('active'); // deactivate the minus button after score is decreased one time
    scoreFeature.children[2].classList.toggle('active'); // activate the plus button after the score is decreased once
  }
  // if the user clicks on the plus__btn button
  if(e.target.classList.contains('plus__btn') && e.target.classList.contains('active') ) {
    const scoreFeature = e.target.parentElement; // select the score feature section the button belongs to
    const score = scoreFeature.children[1]; // select the 'score' element that has the score
    score.innerText = (Number(score.innerText) + 1); // convert the score text into number and increase by one
    e.target.classList.toggle('active'); // deactivate the plus button after score is increased one time
    scoreFeature.children[0].classList.toggle('active'); // activate the minus button after the score is decreased once
  }
  // if the user clicks on the minus_btn button
  if(e.target.classList.contains('minus__btn') && e.target.classList.contains('active')) {
    const scoreFeature = e.target.parentElement; // select the score feature section the button belongs to
    const score = scoreFeature.children[1]; // select the 'score' element that has the score
    score.innerText = (Number(score.innerText) - 1); // convert the score text into number and decrease by one
    e.target.classList.toggle('active'); // deactivate the minus button after score is decreased one time
    scoreFeature.children[2].classList.toggle('active'); // activate the plus button after the score is decreased once
  }

  //update comment an existing comment or reply of the user
  // select the edit button of the comment or reply the user is going to edit
  if(e.target.classList.contains('edit__button')) {
    // select the comment or reply card the user is going to edit
    const commentCard = e.target.parentElement.parentElement.parentElement;
    commentCard.classList.toggle('editable'); // toggle editable class for additional functionalities

    // select the modify section [edit button, deletebutton] the user is going to edit
    const modifyCommentSection = e.target.parentElement;

    // hide the modify comment section
    modifyCommentSection.classList.toggle('flex'); 
    modifyCommentSection.classList.toggle('hidden'); 


    // select the p element the user is going to edit and set it to editable
    const contentBox = commentCard.querySelector('.content');
    contentBox.setAttribute('contenteditable', true);
    
    // select the update comment or reply button
    const updateBtn = commentCard.querySelector('.update__button');
    updateBtn.classList.add('active');


    updateBtn.addEventListener('click', () => {
      const updatedContent = contentBox.innerText; // select the mofified text content
      updateBtn.classList.remove('active'); // deactivate the update button
      
      commentCard.classList.toggle('editable'); // remove editable class to remove the extra comment modification features
      
      contentBox.innerText = updatedContent; // update the previous text content with the modified text content
      
      contentBox.contentEditable = false; // remove editable attribute from the p element

      // bring back the comment modification seciton [edit button, delete button]
      modifyCommentSection.classList.toggle('flex'); 
      modifyCommentSection.classList.toggle('hidden');
    });
  }
});


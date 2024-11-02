let title, author, pages;

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.status}`;
  }
}

function addBookToLibrary(book) {
  return myLibrary.unshift(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'Not read yet');
const thePrisonerofAzkaban = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '317 pages', 'Read');
const warAndPeace = new Book('War and Peace', 'Leov Tolstoy', '1225 pages', 'Read');
const crimeAndPunishment = new Book('Crime and Punishment', 'Fyodor Dostoevsky', '565 pages', 'Read');

addBookToLibrary(theHobbit);
addBookToLibrary(thePrisonerofAzkaban);
addBookToLibrary(warAndPeace);
addBookToLibrary(crimeAndPunishment);

let booksHTML = document.querySelector('.js-book-render');

const tableHead = `
    <td  style="width: 15vw" name="title">
    <input id="input-title" type="text" autocomplete="off" placeholder="Title">
    </input>
  </td>
  <td style="width: 15vw" class="input-author" name="author">
    <input id="input-author" type="text" autocomplete="off" placeholder="Author">
    </input>
  </td>
  <td style="width: 15vw" class="input-pages" name="pages">
    <input id="input-pages" type="text" autocomplete="off" placeholder="Pages">
    </input>
  </td>
  <td style="width: 15vw" class="input-status" class="label-read" ><label for="read">Read?</label><input id="read" type="checkbox" checked
      name="read" value="Read"></input>
  </td>
  <td style="width: 10rem">
    <div id="add-button">Add a book</div>
  </td>
</tr>
`

renderLibrary();

function renderLibrary() {
  indexToDeleteRow();
  booksHTML.innerHTML = tableHead
  myLibrary.forEach((element) => {
    const HTML = `<tr class="fixed-table" id="items-row-${element.index}">
      <td class="title-cell">${element.title}</td>
      <td class="author-cell">${element.author}</td>
      <td class="pages-cell">${element.pages}</td>
      <td class="status-cell">${element.status}</td>
      <td><button onclick="deleteRow(${element.index})" class="delete-button">Delete</button></tr>`;
    booksHTML.innerHTML += HTML;
  });
};

function indexToDeleteRow() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
  }
}


const checkbox = document.getElementById('read')

checkbox.onclick = function () {
  if (checkbox.checked) {
    document.querySelector('label').innerHTML = `Yes ✓ `;

  } else
    document.querySelector('label').innerHTML = `Not yet ✗ `;
}

const container = document.querySelector('.container');
const addBookBtn = document.getElementById('add-button');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const inputPages = document.getElementById('input-pages');
const inputStatus = document.getElementById('read');
const inputLabel = document.querySelector('label');
let count = 0;

addBookBtn.addEventListener('click', () => {
  title = inputTitle.value;
  localStorage.setItem('title', title)
  if (count === 0) {
    inputTitle.select();
    inputTitle.classList.add('is-toggled');
    inputTitle.classList.add('.is-toggled::-webkit-input-placeholder');
    addBookBtn.classList.add('is-toggled');
    addBookBtn.innerHTML = 'Update Library';
    inputAuthor.classList.remove('is-toggled');
    inputPages.classList.remove('is-toggled');
    inputLabel.classList.remove('is-toggled');
    count++;
  } else {
    popUpListener();
    addBook();
    inputTitle.classList.remove('is-toggled');
    inputAuthor.classList.remove('is-toggled');
    inputPages.classList.remove('is-toggled');
    inputLabel.classList.remove('is-toggled');
    addBookBtn.classList.remove('is-toggled');
    addBookBtn.innerHTML = 'Add a book';
    inputTitle.value = title;
    count = 0;
    booksHTML.innerHTML = '';
    renderLibrary();
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
  }

});

inputTitle.addEventListener('click', () => {
  inputTitleListener();
});

function inputTitleListener() {
  inputAuthor.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputTitle.classList.add('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.classList.add('is-toggled');
  addBookBtn.innerHTML = 'Update Library';
  count++;
}


inputAuthor.addEventListener('click', () => {
  inputAuthor.classList.add('is-toggled');
  inputTitle.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.innerHTML = 'Update Library';
  addBookBtn.classList.add('is-toggled');
  count++;
});

inputPages.addEventListener('click', () => {
  inputPages.classList.add('is-toggled');
  inputTitle.classList.remove('is-toggled');
  inputAuthor.classList.remove('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.innerHTML = 'Update Library';
  addBookBtn.classList.add('is-toggled');
  count++;
})

inputStatus.addEventListener('click', () => {
  inputTitle.classList.remove('is-toggled');
  inputAuthor.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputLabel.classList.add('is-toggled');
  addBookBtn.classList.add('is-toggled');
  addBookBtn.innerHTML = 'Update Library';
  count++;
  console.log(inputStatus.value);

});

let readStatus;

function addBook() {

  if (!inputTitle.value) {
    popUpMessage(1);
  } else if (!inputAuthor.value) {
    popUpMessage(2);
  } else if (!inputTitle.value) {
    popUpMessage(3);
  } else if (!inputTitle.value && !inputAuthor.value) {
    popUpMessage(4);
  } else if (!inputTitle.value && !inputPages.value) {
    popUpMessage(5);
  } else if (!inputAuthor.value && !inputPages.value) {
    popUpMessage(7);
  } else {

    function unshiftBook() {

      if (inputLabel.innerHTML === `Not yet ✗ `)
        readStatus = 'Not read yet';
      else readStatus = 'Read';


      const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readStatus);
      addBookToLibrary(newBook);
    }
    unshiftBook();
  }
}

function popUpMessage(errorId) {
  let message;
  let message2;
  inputTitle.value = localStorage.getItem('title');
  if (errorId === 1) {
    message = `Seems like you forgot to input a title.`;
  } if (errorId === 2) {
    message = `Seems that you forgot to input the author's name.`;
  } if (errorId === 3) {
    message - `You didn't input a number of pages.`
  } if (errorId === 4) {
    message = `Seems like you forgot to input a title.`;
    message2 = `You also didn't write the author's name.`
  } if (errorId === 5) {
    message = `Seems like you forgot to input a title.`;
    message2 = `You also didn't the number of pages.`
  } if (errorId === 6) {
    message = `Seems like you forgot to input the author's name.`;
    message2 = `You also didn't set a number of pages.`
  };

  inputTitle.value = title;
  const popUpBox = document.createElement('div');
  popUpBox.setAttribute('id', 'pop-up');
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'message-paragraph');
  paragraph.textContent = message;
  popUpBox.appendChild(paragraph);
  const closeTag = document.createElement('a');
  closeTag.setAttribute('id', 'pop-up-close');
  closeTag.textContent = 'x'
  closeTag.setAttribute('onclick', 'closeTagListener()');
  popUpBox.appendChild(closeTag);
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('id', 'submit-button');
  submitBtn.textContent = 'Submit';
  const inputElement = document.createElement('input');
  inputElement.setAttribute('id', 'message-title-input')
  inputElement.setAttribute('placeholder', `What's the book called?`);
  popUpBox.appendChild(inputElement);
  popUpBox.appendChild(submitBtn);
  container.appendChild(popUpBox);
  setTimeout(() => { inputToSelect.select() }, 200)

  setTimeout(() => {
    popUp = document.getElementById('pop-up');
    close = document.getElementById('pop-up-close');
    inputToSelect = document.getElementById('message-title-input');
    deleteButton = document.querySelector('delete-button');
  }, 100)
}

let popUp, close, inputToSelect, deleteButton;

// popUpMessage('this is your message', 1);

function deleteRow(data) {
  const row = document.getElementById(`items-row-${data}`);
  row.remove();
  console.log(row);
}



if (!localStorage.getItem('title')) {
  title = ''
} else {
  title = localStorage.getItem('title')
};

function popUpListener() {
  clearTimeout(timeoutId);
  title = inputTitle.value;
  localStorage.setItem('title', title);
};

function closeTagListener() {
  popUp.remove();
  console.log(title)
  location.reload();

}

inputTitle.value = title;

let timeoutId;

window.addEventListener('mousemove', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
  localStorage.clear('title'),
    location.reload();
}, 5000)})

window.addEventListener('keydown', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
  localStorage.clear('title'),
    location.reload();
}, 5000)})

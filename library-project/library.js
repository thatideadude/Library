
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
  return myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'Not read yet');
const thePrisonerofAzkaban = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '317 pages', 'Read');
const warAndPeace = new Book('War and Peace', 'Leov Tolstoy', '1225 pages', 'Read');
const crimeAndPunishment = new Book('Crime and Punishment', 'Fyodor Dostoevsky', '565 pages', 'Read');

addBookToLibrary(theHobbit);
addBookToLibrary(thePrisonerofAzkaban);
addBookToLibrary(warAndPeace);
addBookToLibrary(crimeAndPunishment);

let booksHTML = document.querySelector('.js-book-render')

myLibrary.forEach((element) => {
  booksHTML.innerHTML += `<tr><td class="title-cell">${element.title}</td><td class="author-cell">${element.author}</td><td class="pages-cell">${element.pages}</td><td class="status-cell">${element.status}</td><td><button onclick="document.querySelectorAll('.edit-button').forEach((button) => { button.classList.remove('is-toggled')})" class="edit-button is-toggled">Edit</button></tr>`;
})

const checkbox = document.getElementById('read')

checkbox.onclick = function () {
  if (checkbox.checked) {
    document.querySelector('label').innerHTML = `Yes ✓ `;

  } else
    document.querySelector('label').innerHTML = `Not yet ✗ `;
}

const addBookBtn = document.getElementById('add-button');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const inputPages = document.getElementById('input-pages');
const inputStatus = document.getElementById('read');
const inputLabel = document.querySelector('label');
const editButton = document.getElementsByClassName('.edit-button')

addBookBtn.addEventListener('click', () => {
  inputTitle.select();
  inputTitle.classList.add('is-toggled');
  inputTitle.classList.add('.is-toggled::-webkit-input-placeholder');
  addBookBtn.classList.add('is-toggled');
  addBookBtn.innerHTML = 'Submit';
  inputAuthor.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputLabel.classList.remove('is-toggled');
});

inputTitle.addEventListener('click', () => {
  inputAuthor.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputTitle.classList.add('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.classList.add('is-toggled');
});

inputAuthor.addEventListener('click', () => {
  inputAuthor.classList.add('is-toggled');
  inputTitle.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.innerHTML = 'Submit';
  addBookBtn.classList.add('is-toggled');
});

inputPages.addEventListener('click', () => {
  inputPages.classList.add('is-toggled');
  inputTitle.classList.remove('is-toggled');
  inputAuthor.classList.remove('is-toggled');
  inputLabel.classList.remove('is-toggled');
  addBookBtn.innerHTML = 'Submit';
  addBookBtn.classList.add('is-toggled');
})

inputStatus.addEventListener('click', () => {
  inputTitle.classList.remove('is-toggled');
  inputAuthor.classList.remove('is-toggled');
  inputPages.classList.remove('is-toggled');
  inputLabel.classList.add('is-toggled');
  addBookBtn.classList.add('is-toggled');
  addBookBtn.innerHTML = 'Submit';
});


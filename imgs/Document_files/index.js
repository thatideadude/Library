let myLibrary = [];

if (localStorage.library === undefined || localStorage.library === '[]') {

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Not read yet');
  const thePrisonerofAzkaban = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '317', 'Read');
  const warAndPeace = new Book('War and Peace', 'Leov Tolstoy', '1225', 'Read');
  const crimeAndPunishment = new Book('Crime and Punishment', 'Fyodor Dostoevsky', '565', 'Read');

  addBookToLibrary(theHobbit);
  addBookToLibrary(thePrisonerofAzkaban);
  addBookToLibrary(warAndPeace);
  addBookToLibrary(crimeAndPunishment);

} else {

  myLibrary = JSON.parse(localStorage.getItem('library'));

}

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
  myLibrary.unshift(book);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}


const table = document.getElementById('table');
const column1 = document.getElementById('column-1');
const column2 = document.getElementById('column-2');
const column3 = document.getElementById('column-3');
const column4 = document.getElementById('column-4');
const column5 = document.getElementById('column-5');

let currentTheme;


function saveThemeToStorage() {
  localStorage.setItem('theme', JSON.stringify(currentTheme));
}

let currentFilter = 'invert(70%) sepia(84%) saturate(338%) hue-rotate(10deg) brightness(115%) contrast(84%)';
let currentBackFilter = 'invert(16%) sepia(6%) saturate(1171%) hue-rotate(221deg) brightness(90%) contrast(92%)';
let i = 0;


if (localStorage.theme !== undefined) {
  currentTheme = JSON.parse(localStorage.getItem('theme'));
} else currentTheme = 1;

renderLibrary();

titleHead = document.getElementById('title-head')
  .addEventListener('click', () => {
    sortByTitle();
  });

function renderLibrary() {

  document.querySelectorAll('.render-cell')
    .forEach((cell) => {
      cell.remove();
    });

  myLibrary.forEach((item) => {

    const titlePlusSign = document.createElement('img');
    titlePlusSign.setAttribute('src', 'imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg');
    titlePlusSign.setAttribute('id', `title-plus-sign-${i}`);
    titlePlusSign.setAttribute('class', 'image');
    titlePlusSign.setAttribute('style', 'opacity: 0');
    titlePlusSign.setAttribute('onclick', 'expandTitle()');

    const authorPlusSign = document.createElement('img');
    authorPlusSign.setAttribute('src', 'imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg');
    authorPlusSign.setAttribute('id', `author-plus-sign-${i}`);
    authorPlusSign.setAttribute('class', 'image');
    authorPlusSign.setAttribute('style', 'opacity: 0');
    authorPlusSign.setAttribute('onclick', 'expandAuthor()');

    const titleDiv = document.createElement('div');
    const titleP = document.createElement('p');
    const titleToolTip = document.createElement('p');
    titleToolTip.innerText = 'Double click to edit';
    titleToolTip.setAttribute('class', 'tooltip');
    titleToolTip.setAttribute('id', `title-tooltip-${i}`);
    titleP.setAttribute('id', `titleP-${i}`);
    titleP.setAttribute('class', 'titleP');
    titleP.innerText = item.title;
    titleDiv.setAttribute('class', `cell render-cell title-cell text-cell cell-${i} line-${i} row-${i}`);
    titleDiv.setAttribute('id', `title-cell-${i}`);
    titleDiv.setAttribute('onmouseover', `hoverTitleCell(${i})`);
    titleDiv.setAttribute('onmouseleave', `unhoverTitleCell(${i})`);
    titleP.setAttribute('ondblclick', `editTitleCell(${i})`);
    titleDiv.append(titleToolTip);
    titleDiv.append(titleP);
    titleDiv.append(titlePlusSign);
    column1.append(titleDiv);

    const authorDiv = document.createElement('div');
    const authorP = document.createElement('p');
    const authorToolTip = document.createElement('p');
    authorToolTip.innerText = 'Double click to edit';
    authorToolTip.setAttribute('class', 'tooltip');
    authorToolTip.setAttribute('id', `author-tooltip-${i}`);
    authorP.setAttribute('id', `authorP-${i}`);
    authorP.setAttribute('class', 'authorP');
    authorP.innerText = item.author;
    authorDiv.setAttribute('class', `cell render-cell author-cell text-cell cell-${i} line-${i} row-${i}`);
    authorDiv.setAttribute('id', `author-cell-${i}`);
    authorDiv.setAttribute('onmouseover', `hoverAuthorCell(${i})`);
    authorDiv.setAttribute('onmouseleave', `unhoverAuthorCell(${i})`);
    authorP.setAttribute('ondblclick', `editAuthorCell(${i})`);
    authorDiv.append(authorToolTip);
    authorDiv.append(authorP);
    authorDiv.append(authorPlusSign);
    column2.append(authorDiv);

    const pagesDiv = document.createElement('div');
    const pagesP = document.createElement('p');
    const pagesToolTip = document.createElement('p');
    pagesToolTip.innerText = 'Double click to edit';
    pagesToolTip.setAttribute('class', 'tooltip');
    pagesToolTip.setAttribute('id', `pages-tooltip-${i}`);
    pagesP.setAttribute('id', `pagesP-${i}`);
    pagesP.setAttribute('class', 'pagesP');
    pagesP.innerText = `${item.pages} pages`;
    pagesDiv.setAttribute('class', `cell render-cell pages-cell text-cell cell-${i} line-${i} row-${i}`);
    pagesDiv.setAttribute('id', `pages-cell-${i}`);
    pagesDiv.setAttribute('onmouseover', `hoverPagesCell(${i})`);
    pagesDiv.setAttribute('onmouseleave', `unhoverPagesCell(${i})`);
    pagesP.setAttribute('ondblclick', `editPagesCell(${i})`);
    pagesDiv.append(pagesToolTip);
    pagesDiv.append(pagesP);
    column3.append(pagesDiv);

    const statusDiv = document.createElement('div');
    const statusP = document.createElement('p');
    statusP.setAttribute('id', `statusP-${i}`);
    statusP.setAttribute('class', 'statusP');
    statusP.innerText = item.status;
    statusDiv.setAttribute('class', `cell render-cell status-cell text-cell cell-${i} line-${i} row-${i}`);
    statusDiv.setAttribute('id', `status-cell-${i}`);
    statusDiv.setAttribute('onmouseover', `hoverStatusCell(${i})`);
    statusDiv.setAttribute('onmouseleave', `unhoverStatusCell(${i})`);
    statusP.setAttribute('onclick', `editStatusCell(${i})`);
    statusDiv.append(statusP);
    column4.append(statusDiv);

    const removeDiv = document.createElement('div');
    removeDiv.setAttribute('class', `cell render-cell remove-div remove-div-${i} row-${i}`);
    removeDiv.setAttribute('onclick', `removeRow(${i})`);
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.setAttribute('class', `remove-btn remove-btn-${i}`);
    removeButton.setAttribute('id', `remove-btn-${i}`);
    removeDiv.append(removeButton);
    column5.append(removeDiv);
    i++;
  });

}

function removeRow(i) {
  myLibrary.splice(i, 1);
  saveToStorage();
  document.getElementById(`remove-btn-${i}`).style.opacity = 0;
  document.getElementById(`remove-btn-${i}`).style.transition = '500ms';
  document.querySelectorAll(`.row-${i}`)
    .forEach((item) => {
      item.style.height = 0;
      item.style.opacity = 0;
      setTimeout(() => {
        item.remove();
        location.reload();
      }, 1000)
    })

};

function changePalette(theme) {
  let colorA, colorB;
  const tick = document.getElementById('popup-check');
  const plusSigns = document.querySelectorAll('.image');
  if (theme === 1) {
    colorA = '#eae151';
    colorB = '#2d2a32'
    currentTheme = 1;
    currentFilter = 'invert(70%) sepia(84%) saturate(338%) hue-rotate(10deg) brightness(115%) contrast(84%)';
    currentBackFilter = 'invert(16%) sepia(6%) saturate(1171%) hue-rotate(221deg) brightness(90%) contrast(92%)';

  } else if (theme === 2) {
    colorA = '#99e2b4';
    colorB = '#036666';
    currentTheme = 2;
    currentFilter = 'invert(88%) sepia(26%) saturate(458%) hue-rotate(80deg) brightness(94%) contrast(88%)';
    currentBackFilter = 'invert(24%) sepia(70%) saturate(1371%) hue-rotate(149deg) brightness(96%) contrast(98%)'

  } else if (theme === 3) {
    colorA = '#bce784';
    colorB = '#513b56';
    currentTheme = 3;
    currentFilter = 'invert(82%) sepia(93%) saturate(230%) hue-rotate(26deg) brightness(96%) contrast(89%)';
    currentBackFilter = 'invert(20%) sepia(8%) saturate(2420%) hue-rotate(243deg) brightness(101%) contrast(81%)'
  }

  const root = document.querySelector(':root');

  root.style.setProperty('--color1', `${colorA}`)
  root.style.setProperty('--color2', `${colorB}`)
  plusSigns.forEach((sign) => {
    sign.style.filter = currentFilter;
  });
  try {
    tick.style.filter = currentBackFilter;
  } catch (error) { };

  saveThemeToStorage();

};

let timer;

function hoverTitleCell(i) {

  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titlePlusSign = document.getElementById(`title-plus-sign-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  titleCell.style.transition = '200ms';
  authorCell.style.transition = '200ms';
  pagesCell.style.transition = '200ms';
  statusCell.style.transition = '200ms';
  titlePlusSign.style.opacity = 1;
  titleCell.style.backgroundColor = "var(--color2)";
  titleCell.style.color = "var(--color1)";
  authorCell.style.backgroundColor = "var(--color2)";
  authorCell.style.color = "var(--color1)";
  pagesCell.style.backgroundColor = "var(--color2)";
  pagesCell.style.color = "var(--color1)";
  statusCell.style.backgroundColor = "var(--color2)";
  statusCell.style.color = "var(--color1)";
  try {
    titleInput.style.backgroundColor = "var(--color2)";
    titleInput.style.color = "var(--color1)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color2)";
    authorInput.style.color = "var(--color1)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color2)";
    pagesInput.style.color = "var(--color1)";
  } catch (error) { };

  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      document.getElementById(`title-tooltip-${i}`).style.display = 'initial';
    } catch (error) { };
    isTooltip = 'yes';
    setTimeout(() => { document.getElementById(`title-tooltip-${i}`).style.opacity = 1; }, 100)
  }, 2000)
}

function hoverAuthorCell(i) {
  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const authorPlusSign = document.getElementById(`author-plus-sign-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  titleCell.style.transition = '200ms';
  authorCell.style.transition = '200ms';
  pagesCell.style.transition = '200ms';
  statusCell.style.transition = '200ms';
  authorPlusSign.style.opacity = 1;
  authorCell.style.backgroundColor = "var(--color2)";
  authorCell.style.color = "var(--color1)";
  titleCell.style.backgroundColor = "var(--color2)";
  titleCell.style.color = "var(--color1)";
  pagesCell.style.backgroundColor = "var(--color2)";
  pagesCell.style.color = "var(--color1)";
  statusCell.style.backgroundColor = "var(--color2)";
  statusCell.style.color = "var(--color1)";
  try {
    titleInput.style.backgroundColor = "var(--color2)";
    titleInput.style.color = "var(--color1)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color2)";
    authorInput.style.color = "var(--color1)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color2)";
    pagesInput.style.color = "var(--color1)";
  } catch (error) { };

  clearTimeout(timer);
  timer = setTimeout(() => {
    document.getElementById(`author-tooltip-${i}`).style.display = 'initial';
    isTooltip = 'yes';
    setTimeout(() => { document.getElementById(`author-tooltip-${i}`).style.opacity = 1; }, 100)
  }, 2000)
}

function hoverPagesCell(i) {
  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  titleCell.style.transition = '200ms';
  authorCell.style.transition = '200ms';
  pagesCell.style.transition = '200ms';
  statusCell.style.transition = '200ms';
  authorCell.style.backgroundColor = "var(--color2)";
  authorCell.style.color = "var(--color1)";
  titleCell.style.backgroundColor = "var(--color2)";
  titleCell.style.color = "var(--color1)";
  pagesCell.style.backgroundColor = "var(--color2)";
  pagesCell.style.color = "var(--color1)";
  statusCell.style.backgroundColor = "var(--color2)";
  statusCell.style.color = "var(--color1)";
  try {
    titleInput.style.backgroundColor = "var(--color2)";
    titleInput.style.color = "var(--color1)";
  } catch (error) { }
  try {
    authorInput.style.backgroundColor = "var(--color2)";
    authorInput.style.color = "var(--color1)";
  } catch (error) { }
  try {
    pagesInput.style.backgroundColor = "var(--color2)";
    pagesInput.style.color = "var(--color1)";
  } catch (error) { };

  clearTimeout(timer);
  timer = setTimeout(() => {
    document.getElementById(`pages-tooltip-${i}`).style.display = 'initial';
    isTooltip = 'yes';
    setTimeout(() => { document.getElementById(`pages-tooltip-${i}`).style.opacity = 1; }, 100)
  }, 2000)
}

function hoverStatusCell(i) {
  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  titleCell.style.transition = '200ms';
  authorCell.style.transition = '200ms';
  pagesCell.style.transition = '200ms';
  statusCell.style.transition = '200ms';
  authorCell.style.backgroundColor = "var(--color2)";
  authorCell.style.color = "var(--color1)";
  titleCell.style.backgroundColor = "var(--color2)";
  titleCell.style.color = "var(--color1)";
  pagesCell.style.backgroundColor = "var(--color2)";
  pagesCell.style.color = "var(--color1)";
  statusCell.style.backgroundColor = "var(--color2)";
  statusCell.style.color = "var(--color1)";
  try {
    titleInput.style.backgroundColor = "var(--color2)";
    titleInput.style.color = "var(--color1)";
  } catch (error) { }
  try {
    authorInput.style.backgroundColor = "var(--color2)";
    authorInput.style.color = "var(--color1)";
  } catch (error) { }
  try {
    pagesInput.style.backgroundColor = "var(--color2)";
    pagesInput.style.color = "var(--color1)";
  } catch (error) { };
}

function unhoverTitleCell(i) {

  try {
    clearTimeout(timer);
  } catch (error) { };
  try {
    document.getElementById(`title-tooltip-${i}`).style.opacity = '0';
  } catch (error) { };
  try {
    setTimeout(() => {
      try {
        document.getElementById(`title-tooltip-${i}`).style.display = 'none';
        isTooltip = 'no';
      } catch (error) { };
    }, 2000);

  } catch (error) { };


  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titlePlusSign = document.getElementById(`title-plus-sign-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  titlePlusSign.style.opacity = 0;

  titleCell.style.backgroundColor = "var(--color1)";
  titleCell.style.color = "var(--color2)";
  titleCell.style.borderRadius = "2rem 0 0 2rem";
  authorCell.style.backgroundColor = "var(--color1)";
  authorCell.style.color = "var(--color2)";
  pagesCell.style.backgroundColor = "var(--color1)";
  pagesCell.style.color = "var(--color2)";
  statusCell.style.backgroundColor = "var(--color1)";
  statusCell.style.color = "var(--color2)";
  statusCell.style.borderRadius = "0 2rem 2rem 0";
  try {
    titleInput.style.backgroundColor = "var(--color1)";
    titleInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color1)";
    authorInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color1)";
    pagesInput.style.color = "var(--color2)";
  } catch (error) { };


}

function unhoverAuthorCell(i) {

  try {
    clearTimeout(timer);
  } catch (error) { };
  try {
    document.getElementById(`author-tooltip-${i}`).style.opacity = '0';
  } catch (error) { };
  try {
    setTimeout(() => {
      document.getElementById(`author-tooltip-${i}`).style.display = 'none';
      isTooltip = 'no';
    }, 2000);
  } catch (error) { };

  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const authorPlusSign = document.getElementById(`author-plus-sign-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);

  authorPlusSign.style.opacity = 0;

  titleCell.style.backgroundColor = "var(--color1)";
  titleCell.style.color = "var(--color2)";
  authorCell.style.backgroundColor = "var(--color1)";
  authorCell.style.color = "var(--color2)";
  pagesCell.style.backgroundColor = "var(--color1)";
  pagesCell.style.color = "var(--color2)";
  statusCell.style.backgroundColor = "var(--color1)";
  statusCell.style.color = "var(--color2)";
  try {
    titleInput.style.backgroundColor = "var(--color1)";
    titleInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color1)";
    authorInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color1)";
    pagesInput.style.color = "var(--color2)";
  } catch (error) { };

  clearTimeout(timer);
}

function unhoverPagesCell(i) {

  try {
    clearTimeout(timer);
  } catch (error) { };
  try {
    document.getElementById(`pages-tooltip-${i}`).style.opacity = '0';
  } catch (error) { };
  try {
    setTimeout(() => {
      document.getElementById(`pages-tooltip-${i}`).style.display = 'none';
      isTooltip = 'no';
    }, 2000);
  } catch (error) { };

  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);


  titleCell.style.backgroundColor = "var(--color1)";
  titleCell.style.color = "var(--color2)";
  authorCell.style.backgroundColor = "var(--color1)";
  authorCell.style.color = "var(--color2)";
  pagesCell.style.backgroundColor = "var(--color1)";
  pagesCell.style.color = "var(--color2)";
  statusCell.style.backgroundColor = "var(--color1)";
  statusCell.style.color = "var(--color2)";
  try {
    titleInput.style.backgroundColor = "var(--color1)";
    titleInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color1)";
    authorInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color1)";
    pagesInput.style.color = "var(--color2)";
  } catch (error) { };
}

function unhoverStatusCell(i) {
  try {
    clearTimeout(timer);
  } catch (error) { };
  try {
    document.getElementById(`pages-tooltip-${i}`).style.opacity = '0';
  } catch (error) { };
  try {
    setTimeout(() => {
      document.getElementById(`pages-tooltip-${i}`).style.display = 'none';
      isTooltip = 'no';
    }, 2000);
  } catch (error) { };

  const titleCell = document.getElementById(`title-cell-${i}`);
  const authorCell = document.getElementById(`author-cell-${i}`);
  const pagesCell = document.getElementById(`pages-cell-${i}`);
  const statusCell = document.getElementById(`status-cell-${i}`);
  const titleInput = document.getElementById(`titleInput${i}`);
  const authorInput = document.getElementById(`authorInput${i}`);
  const pagesInput = document.getElementById(`pagesInput${i}`);


  titleCell.style.backgroundColor = "var(--color1)";
  titleCell.style.color = "var(--color2)";
  authorCell.style.backgroundColor = "var(--color1)";
  authorCell.style.color = "var(--color2)";
  pagesCell.style.backgroundColor = "var(--color1)";
  pagesCell.style.color = "var(--color2)";
  statusCell.style.backgroundColor = "var(--color1)";
  statusCell.style.color = "var(--color2)";
  try {
    titleInput.style.backgroundColor = "var(--color1)";
    titleInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    authorInput.style.backgroundColor = "var(--color1)";
    authorInput.style.color = "var(--color2)";
  } catch (error) { };
  try {
    pagesInput.style.backgroundColor = "var(--color1)";
    pagesInput.style.color = "var(--color2)";
  } catch (error) { };
}

let isTitleExpanded = 'no';

function expandTitle() {
  if (isAuthorExpanded === 'yes') {
    for (let index = 0; index < myLibrary.length; index++) {
      document.getElementById(`author-plus-sign-${index}`)
        .src = "imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
    }
    isAuthorExpanded = 'no';
  } if (isTitleExpanded === 'no') {
    const structure = document.querySelector('.table');
    structure.style.gridTemplateColumns = '4fr 1fr 1fr 1fr 1fr';

    for (let index = 0; index < myLibrary.length; index++) {
      try {
        document.getElementById(`title-plus-sign-${index}`)
          .src = "imgs/remove_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
      } catch (error) { };
    }
    isTitleExpanded = 'yes';
    isAuthorExpanded = 'no'

  } else if (isTitleExpanded === 'yes') {
    const structure = document.querySelector('.table');
    structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';

    for (let index = 0; index < myLibrary.length; index++) {
      try {
        document.getElementById(`title-plus-sign-${index}`)
          .src = "imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
      } catch (error) { };
    }
    isTitleExpanded = 'no';
  }
};

let isAuthorExpanded = 'no';

function expandAuthor() {
  if (isTitleExpanded === 'yes') {
    for (let index = 0; index < myLibrary.length; index++) {
      document.getElementById(`title-plus-sign-${index}`)
        .src = "imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
    }
    isTitleExpanded = 'no';
  } if (isAuthorExpanded === 'no') {
    const structure = document.querySelector('.table');
    structure.style.gridTemplateColumns = '1fr 4fr 1fr 1fr 1fr';

    for (let index = 0; index < myLibrary.length; index++) {
      try {
        document.getElementById(`author-plus-sign-${index}`)
          .src = "imgs/remove_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
      } catch (error) { };
    }
    isAuthorExpanded = 'yes';
    isTitleExpanded = 'no';
  } else if (isAuthorExpanded === 'yes') {
    const structure = document.querySelector('.table');
    structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';

    for (let index = 0; index < myLibrary.length; index++) {
      setTimeout(() => {
        document.getElementById(`author-plus-sign-${index}`)
          .src = "imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
      }, 1000)
    }
    isAuthorExpanded = 'no';
  }
};

function editTitleCell(i) {
  expandTitle();

  const divToAppend = document.getElementById(`title-cell-${i}`);
  const cellToEdit = document.getElementById(`titleP-${i}`);

  cellToEdit.remove();
  const titleInput = document.createElement('input');
  titleInput.setAttribute('id', `titleInput${i}`);
  titleInput.setAttribute('value', `${myLibrary[i].title}`);
  divToAppend.append(titleInput);

  const input = document.getElementById(`titleInput${i}`);
  input.focus();

  document.querySelector(`.remove-btn-${i}`).innerText = 'Update';
  document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
  document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `updateLibrary(${i})`);
};

function editAuthorCell(i) {
  expandAuthor();

  const divToAppend = document.getElementById(`author-cell-${i}`);
  const cellToEdit = document.getElementById(`authorP-${i}`);

  cellToEdit.remove();
  const authorInput = document.createElement('input');
  authorInput.setAttribute('id', `authorInput${i}`);
  authorInput.setAttribute('value', `${myLibrary[i].author}`);
  divToAppend.append(authorInput);

  const input = document.getElementById(`authorInput${i}`);
  input.focus();
};

function editPagesCell(i) {

  const divToAppend = document.getElementById(`pages-cell-${i}`);
  const cellToEdit = document.getElementById(`pagesP-${i}`);

  cellToEdit.remove();
  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('id', `pagesInput${i}`);
  pagesInput.setAttribute('value', `${myLibrary[i].pages}`);
  divToAppend.append(pagesInput);

  const input = document.getElementById(`pagesInput${i}`);
  input.focus();

};

function editStatusCell(i) {

  const cellToEdit = document.getElementById(`statusP-${i}`);

  if (cellToEdit.innerText === 'Not read yet') {
    cellToEdit.innerText = 'Read';
  } else {
    cellToEdit.innerText = 'Not read yet';
  }

}

let newBookTitle, newBookAuthor, newBookPages, newBookStatus;

function addBook() {

  const popUp = document.createElement('div');
  popUp.setAttribute('class', 'input-popup');
  const message = document.createElement('h1');
  message.setAttribute('class', 'message');
  message.innerText = `What's the book called?`;
  popUp.appendChild(message);
  const input = document.createElement('input');
  input.setAttribute('id', 'popup-input');
  input.setAttribute('onkeydown', `if (event.key === 'Enter') {submitTitle()}`);
  input.setAttribute('placeholder', 'Insert title');
  input.setAttribute('type', 'text');
  input.setAttribute('autocomplete', 'off');
  popUp.appendChild(input);
  const check = document.createElement('img');
  check.setAttribute('id', 'popup-check');
  check.style.filter = currentBackFilter;
  check.setAttribute('src', 'imgs/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
  check.setAttribute('onclick', 'submitTitle()');
  popUp.appendChild(check);
  const closeTag = document.createElement('p');
  closeTag.setAttribute('class', 'close-tag');
  closeTag.innerText = 'X';
  closeTag.setAttribute('onclick', 'closePopUp()');
  popUp.appendChild(closeTag);
  document.body.append(popUp);
  input.focus();

};

function closePopUp() {
  document.querySelector('.input-popup').remove()
};

function submitTitle() {
  let input = document.getElementById('popup-input');
  newBookTitle = input.value;
  document.querySelector('.message').innerText = `What's the author called?`;
  input.value = '';
  input.setAttribute('onkeydown', `if (event.key === 'Enter') {submitAuthor()}`);
  input.removeAttribute('placeholder');
  input.setAttribute('placeholder', 'Insert author');
  document.getElementById('popup-check').removeAttribute('onclick');
  document.getElementById('popup-check').setAttribute('onclick', 'submitAuthor()');
};

function submitAuthor() {
  let input = document.getElementById('popup-input');
  newBookAuthor = input.value;
  document.querySelector('.message').innerText = `How many pages does the book have?`;
  input.value = '';
  input.setAttribute('onkeydown', `if (event.key === 'Enter') {submitPages()}`);
  input.removeAttribute('placeholder');
  input.setAttribute('placeholder', 'Insert number of pages');
  document.getElementById('popup-check').removeAttribute('onclick');
  document.getElementById('popup-check').setAttribute('onclick', 'submitPages()');
};

function submitPages() {
  newBookPages = document.getElementById('popup-input').value;
  document.getElementById('popup-input').remove();
  document.querySelector('.message').innerText = "Have you read it?";
  document.getElementById('popup-check').remove();
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'inner-div');
  const check = document.createElement('img');
  check.setAttribute('id', 'popup-check');
  check.style.filter = currentBackFilter;
  check.setAttribute('src', 'imgs/check_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
  check.setAttribute('onclick', `submitNewBook('Read')`);
  newDiv.appendChild(check);
  const cross = document.createElement('img');
  cross.style.filter = currentBackFilter;
  cross.setAttribute('id', 'popup-cross');
  cross.setAttribute('src', 'imgs/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
  newDiv.appendChild(cross);
  cross.setAttribute('onclick', 'submitNewBook(`Not read yet`)');
  const yesNo = document.createElement('div');
  yesNo.setAttribute('class', 'inner-div-2');
  const yes = document.createElement('h2');
  yes.setAttribute('class', 'yes');
  yes.innerText = 'Yes';
  const no = document.createElement('h2');
  no.setAttribute('class', 'no');
  no.innerText = 'No';
  yesNo.appendChild(yes);
  yesNo.appendChild(no);
  const divToAppendTo = document.querySelector('.input-popup');
  document.querySelector('.input-popup').appendChild(newDiv);
  divToAppendTo.appendChild(yesNo);
};

function submitNewBook(value) {
  console.log('working');
  newBookStatus = value;
  const newBook = new Book(`${newBookTitle}`, `${newBookAuthor}`, `${newBookPages}`, `${newBookStatus}`);
  addBookToLibrary(newBook);
  renderLibrary();
  document.querySelector('.input-popup').remove();
};

let titleOrder = 0;

function sortByTitle() {
    const myLibrary2 = myLibrary.slice();
  if (titleOrder === 1) {
    myLibrary = myLibrary.sort((a, b) => a.title > b.title ? 1 : -1);
    document.getElementById('title-head').innerHTML = 'Title ◭';
    titleOrder++;
  } else {
    myLibrary = myLibrary.sort((a, b) => a.title < b.title ? 1 : -1);
    document.getElementById('title-head').innerHTML = 'Title ⧨';
    titleOrder = 1;

    saveToStorage();
    location.reload();
  }
}

function updateLibrary(i) {
  const newTitle = document.getElementById(`titleInput${i}`);
  const newAuthor = document.getElementById(`authorInput${i}`);
  const newPages = document.getElementById(`pagesInput${i}`);
  const newStatus = document.getElementById(`statusP-${i}`);


  if (newTitle) { myLibrary[i].title = newTitle.value; };
  if (newAuthor) { myLibrary[i].author = newAuthor.value; };
  if (newPages) { myLibrary[i].pages = newPages.value; };
  myLibrary[i].status = newStatus.innerText;

  document.querySelector(`.remove-btn-${i}`).innerText = 'Remove';
  document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
  document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `removeRow(${i})`);
  saveToStorage()
  location.reload();
};

changePalette(currentTheme);
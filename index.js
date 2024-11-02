let myLibrary = [];

if (localStorage.library === undefined || localStorage.library === "[]") {

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
  myLibrary.push(book);
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



if (localStorage.theme !== undefined) {
  currentTheme = JSON.parse(localStorage.getItem('theme'));
} else currentTheme = 2;

renderLibrary();

titleHead = document.getElementById('title-head')
  .addEventListener('click', () => {
    if (isTitleExpanded === 'yes') {
      sequenceTitleOrder()
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else if (isAuthorExpanded === 'yes') {
      sequenceTitleOrder();
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else {
      sequenceTitleOrder();
      location.reload();
    }
  });

authorHead = document.getElementById('author-head')
  .addEventListener('click', () => {
    if (isAuthorExpanded === 'yes') {
      sequenceAuthorOrder()
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else if (isTitleExpanded === 'yes') {
      sequenceAuthorOrder();
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else {
      sequenceAuthorOrder();
      location.reload();
    }
  });

pagesHead = document.getElementById('pages-head')
  .addEventListener('click', () => {
    if (isAuthorExpanded === 'yes') {
      sequencePagesOrder()
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else if (isTitleExpanded === 'yes') {
      sequencePagesOrder();
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else {
      sequencePagesOrder();
      location.reload();
    }
  });

statusHead = document.getElementById('status-head')
  .addEventListener('click', () => {
    if (isAuthorExpanded === 'yes') {
      sequenceStatusOrder()
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else if (isTitleExpanded === 'yes') {
      sequenceStatusOrder();
      setTimeout(() => {
        location.reload();
      }, 1200);
    } else {
      sequenceStatusOrder();
      location.reload();
    }
  });

function sequenceTitleOrder() {
  const structure = document.querySelector('.table');
  structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
  increaseTitleOrder();
  changeOriginal();
  sortByTitle();
  updateTitleHeader();
  sortedBy = 'title';
  saveSortOrder();
  renderLibrary();
}

function sequenceAuthorOrder() {
  const structure = document.querySelector('.table');
  structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
  increaseAuthorOrder();
  changeOriginal();
  sortByAuthor();
  updateAuthorHeader();
  sortedBy = 'author';
  saveSortOrder();
  renderLibrary();
}

function sequencePagesOrder() {
  const structure = document.querySelector('.table');
  structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
  increasePagesOrder();
  changeOriginal();
  sortByPages();
  updatePagesHeader();
  sortedBy = 'pages';
  saveSortOrder();
  renderLibrary();
}

function sequenceStatusOrder() {
  const structure = document.querySelector('.table');
  structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
  increaseStatusOrder();
  changeOriginal();
  sortByStatus();
  updateStatusHeader();
  sortedBy = 'status';
  saveSortOrder();
  renderLibrary();
}

function renderLibrary() {

  document.querySelectorAll('.render-cell')
    .forEach((cell) => {
      cell.remove();
    });

  for (let i = 0; i < myLibrary.length; i++) {

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
    titleP.innerText = myLibrary[i].title;
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
    authorP.innerText = myLibrary[i].author;
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
    pagesP.innerText = `${myLibrary[i].pages} pages`;
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
    statusP.innerText = myLibrary[i].status;
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
  };

}
setTimeout(() => {
  document.querySelector('.arrow-container').style.opacity = '0';
}, 2500)

function removeRow(i) {
  myLibrary.splice(i, 1);
  myLibrary2 = [];
  myLibrary.forEach((book) => {
    myLibrary2.push(book);
  });
  myLibrary = [];
  myLibrary2.forEach((book) => {
    myLibrary.push(book);
  });
  localStorage.setItem('library', JSON.stringify(myLibrary));
  localStorage.setItem('library2', JSON.stringify(myLibrary2));
  document.getElementById(`remove-btn-${i}`).style.opacity = 0;
  document.getElementById(`remove-btn-${i}`).style.transition = '500ms';
  document.querySelectorAll(`.row-${i}`)
    .forEach((item) => {
      item.style.height = 0;
      item.style.opacity = 0;
      setTimeout(() => {
        item.remove();
      }, 1000)
    })
};

const tick = document.getElementById('popup-check');

function changePalette(theme) {

  let colorA, colorB;

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
  root.style.setProperty('--currentFilter', `${currentFilter}`)
  root.style.setProperty('--currentBackFilter', `${currentBackFilter}`)

  try {
    document.getElementById('popup-check').style.filter = currentBackFilter;
  } catch (error) { };
  try {
    document.getElementById('popup-cross').style.filter = currentBackFilter;
  } catch (error) { };
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
    editOneCellAtATime();

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
    editOneCellAtATime();

    for (let index = 0; index < myLibrary.length; index++) {
      try {
        document.getElementById(`title-plus-sign-${index}`)
          .src = "imgs/add_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg";
      } catch (error) { };
    }
    isTitleExpanded = 'no';
  }
};

function editOneCellAtATime() {
  for (let i = 0; i < myLibrary.length; i++) {
    const authorInput = document.getElementById(`authorInput${i}`);
    const titleInput = document.getElementById(`titleInput${i}`);
    const pagesInput = document.getElementById(`pagesInput${i}`);

    if (authorInput !== null) {
      // myLibrary[i].author = authorInput.value;
      authorInput.remove();
      const authorP = document.createElement('p');
      authorP.setAttribute('id', `authorP-${i}`);
      authorP.setAttribute('class', 'authorP');
      authorP.setAttribute('ondblclick', `editAuthorCell(${i})`);
      authorP.innerText = myLibrary[i].author;
      const authorDiv = document.getElementById(`author-cell-${i}`);
      authorDiv.appendChild(authorP);
    }

    if (titleInput !== null) {
      // myLibrary[i].title = titleInput.value;
      titleInput.remove();
      const titleP = document.createElement('p');
      titleP.setAttribute('id', `titleP-${i}`);
      titleP.setAttribute('class', 'titleP');
      titleP.setAttribute('ondblclick', `editTitleCell(${i})`);
      titleP.innerText = myLibrary[i].title;
      const titleDiv = document.getElementById(`title-cell-${i}`);
      titleDiv.appendChild(titleP);
    }

    if (pagesInput !== null) {
      // myLibrary[i].pages = pagesInput.value;
      pagesInput.remove();
      const pagesP = document.createElement('p');
      pagesP.setAttribute('id', `pagesP-${i}`);
      pagesP.setAttribute('class', 'pagesP');
      pagesP.setAttribute('ondblclick', `editPagesCell(${i})`);
      pagesP.innerText = myLibrary[i].pages + ' ' + 'pages';
      const pagesDiv = document.getElementById(`pages-cell-${i}`);
      pagesDiv.appendChild(pagesP);
    }

    try {
    document.querySelector(`.remove-btn-${i}`).innerText = 'Remove';
    document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
    document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `removeRow(${i})`);
  } catch (error) { };
  }
}

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
    editOneCellAtATime();
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
    editOneCellAtATime();

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
  if (isTitleExpanded === 'no') {
    expandTitle();
    isTitleExpanded = 'yes';
  }

  editOneCellAtATime();


  const divToAppend = document.getElementById(`title-cell-${i}`);
  const cellToEdit = document.getElementById(`titleP-${i}`);

  cellToEdit.remove();
  const titleInput = document.createElement('input');
  titleInput.setAttribute('id', `titleInput${i}`);
  titleInput.setAttribute('value', `${myLibrary[i].title}`);
  divToAppend.append(titleInput);

  const input = document.getElementById(`titleInput${i}`);
  input.focus();
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      updateLibrary(i)
    }
  });

  document.querySelector(`.remove-btn-${i}`).innerText = 'Update';
  document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
  document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `updateLibrary(${i})`);

};

function editAuthorCell(i) {
  if (isAuthorExpanded === 'no') {
    expandAuthor();
    isAuthorExpanded = 'yes';
  }
  editOneCellAtATime();


  const divToAppend = document.getElementById(`author-cell-${i}`);
  const cellToEdit = document.getElementById(`authorP-${i}`);

  cellToEdit.remove();
  const authorInput = document.createElement('input');
  authorInput.setAttribute('id', `authorInput${i}`);
  authorInput.setAttribute('value', `${myLibrary[i].author}`);
  divToAppend.append(authorInput);

  const input = document.getElementById(`authorInput${i}`);
  input.focus();

  document.querySelector(`.remove-btn-${i}`).innerText = 'Update';
  document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
  document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `updateLibrary(${i})`);
};

function editPagesCell(i) {
  if (isTitleExpanded === 'yes') {
    expandTitle();
  } if (isAuthorExpanded === 'yes') {
    expandAuthor();
  }

  editOneCellAtATime();

  const divToAppend = document.getElementById(`pages-cell-${i}`);
  const cellToEdit = document.getElementById(`pagesP-${i}`);

  cellToEdit.remove();
  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('id', `pagesInput${i}`);
  pagesInput.setAttribute('value', `${myLibrary[i].pages}`);
  divToAppend.append(pagesInput);

  const input = document.getElementById(`pagesInput${i}`);
  input.focus();

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      updateLibrary(i)
    }
  });

  document.querySelector(`.remove-btn-${i}`).innerText = 'Update';
  document.querySelector(`.remove-div-${i}`).removeAttribute('onclick');
  document.querySelector(`.remove-div-${i}`).setAttribute('onclick', `updateLibrary(${i})`);
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
let isPopUpShowing = 'no'

function addBook() {
  if (isPopUpShowing === 'no') {
    isPopUpShowing = 'yes';
    document.getElementById('table').style.opacity = 0;
    const structure = document.querySelector('.table');
    structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
    editOneCellAtATime();
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
    check.removeAttribute('display');
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
    popUp.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closePopUp();
      }
    })
    document.body.append(popUp);
    input.focus();

  };
}

function closePopUp() {
  document.querySelector('.input-popup').remove();
  document.getElementById('table').style.opacity = 1;
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
  input.focus();
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
  input.focus();
};

function submitPages() {
  newBookPages = document.getElementById('popup-input').value;
  document.getElementById('popup-input').remove();
  document.querySelector('.message').innerText = "Have you read it?";
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closePopUp();
    }
  })
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
  cross.removeAttribute('display');
  cross.style.filter = currentBackFilter;
  cross.setAttribute('id', 'popup-cross');
  cross.setAttribute('src', 'imgs/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg');
  newDiv.appendChild(cross);
  cross.setAttribute('onclick', 'submitNewBook(`Not read yet`)');
  const yesNo = document.createElement('div');
  yesNo.setAttribute('class', 'inner-div-2');
  const yes = document.createElement('h2');
  yes.setAttribute('class', 'yes');
  yes.setAttribute('onclick', `submitNewBook('Read')`);
  yes.innerText = 'Yes';
  const no = document.createElement('h2');
  no.setAttribute('class', 'no');
  no.setAttribute('onclick', `submitNewBook('Not read yet')`);
  no.innerText = 'No';
  yesNo.appendChild(yes);
  yesNo.appendChild(no);
  const divToAppendTo = document.querySelector('.input-popup');
  document.querySelector('.input-popup').appendChild(newDiv);
  divToAppendTo.appendChild(yesNo);
};

function submitNewBook(value) {
  newBookStatus = value;
  const newBook = new Book(`${newBookTitle}`, `${newBookAuthor}`, `${newBookPages}`, `${newBookStatus}`);
  addBookToLibrary(newBook);
  myLibrary.unshift(myLibrary.pop());
  saveToStorage();
  renderLibrary();
  myLibrary2 = [];
  myLibrary.forEach((item) => {
    myLibrary2.unshift(item);
  });
  localStorage.setItem('library2', JSON.stringify(myLibrary2));
  original = 'yes';
  saveOriginalStatus();
  titleOrder = 2;
  saveTitleOrder();
  sortedBy = 'none';
  saveSortOrder;
  closePopUp();
  renderLibrary();
  setTimeout(() => {
  location.reload();
  }, 1100);
};

let titleOrder;

if (localStorage.titleorder !== undefined) {
  titleOrder = JSON.parse(localStorage.getItem('titleorder'))
} else {
  titleOrder = 2;
}

let authorOrder;

if (localStorage.authororder !== undefined) {
  authorOrder = JSON.parse(localStorage.getItem('authororder'))
} else {
  authorOrder = 2;
}

let pagesOrder;

if (localStorage.pagesorder !== undefined) {
  pagesOrder = JSON.parse(localStorage.getItem('pagesorder'))
} else {
  pagesOrder = 2;
}

let statusOrder;

if (localStorage.statusorder !== undefined) {
  statusOrder = JSON.parse(localStorage.getItem('statusorder'))
} else {
  statusOrder = 2;
}


let sortedBy;

if (localStorage.sortedby !== undefined) {
  sortedBy = localStorage.getItem('sortedby');
} else {
  sortedBy = 'none';
}

let original;

if (localStorage.originalstatus !== undefined) {
  original = localStorage.getItem('originalstatus');
} else {
  original = 'no';
}

let myLibrary2 = [];

if (localStorage.library2 !== undefined) {
  myLibrary2 = JSON.parse(localStorage.getItem('library2'));
} else {
  myLibrary2 = myLibrary;
}

function saveSortOrder() {
  localStorage.setItem('sortedby', sortedBy);
}

function increaseTitleOrder() {
  if (titleOrder === 0) {
    titleOrder = 1;
  }
  else if (titleOrder === 1) {
    titleOrder = 2;
  }
  else if (titleOrder === 2) {
    titleOrder = 0;
  };
}

function increaseAuthorOrder() {
  if (authorOrder === 0) {
    authorOrder = 1;
  }
  else if (authorOrder === 1) {
    authorOrder = 2;
  }
  else if (authorOrder === 2) {
    authorOrder = 0;
  };
}

function increasePagesOrder() {
  if (pagesOrder === 0) {
    pagesOrder = 1;
  }
  else if (pagesOrder === 1) {
    pagesOrder = 2;
  }
  else if (pagesOrder === 2) {
    pagesOrder = 0;
  };
}

function increaseStatusOrder() {
  if (statusOrder === 0) {
    statusOrder = 1;
  }
  else if (statusOrder === 1) {
    statusOrder = 2;
  }
  else if (statusOrder === 2) {
    statusOrder = 0;
  };
}

function changeOriginal() {
  if (titleOrder === 1) { orignal = 'no' }
  else if (titleOrder === 2) { orignal = 'no' }
  else if (titleOrder === 0) { orignal = 'yes' }
}

function saveTitleOrder() {
  localStorage.setItem('titleorder', JSON.stringify(titleOrder))
};

function saveAuthorOrder() {
  localStorage.setItem('authororder', JSON.stringify(authorOrder))
};

function savePagesOrder() {
  localStorage.setItem('pagesorder', JSON.stringify(pagesOrder))
};

function saveStatusOrder() {
  localStorage.setItem('statusorder', JSON.stringify(statusOrder))
};

function saveOriginalStatus() {
  localStorage.setItem('originalstatus', original);
}

function updateTitleHeader() {
  if (titleOrder === 0) {
    document.getElementById('title-head').innerHTML = 'Title ⧨';
  }
  else if (titleOrder === 1) {
    document.getElementById('title-head').innerHTML = 'Title  ◭';
  }
  else if (titleOrder === 2) {
    document.getElementById('title-head').innerHTML = 'Title';
  };
}

function updateAuthorHeader() {
  if (authorOrder === 0) {
    document.getElementById('author-head').innerHTML = 'Author ⧨';
  }
  else if (authorOrder === 1) {
    document.getElementById('author-head').innerHTML = 'Author  ◭';
  }
  else if (authorOrder === 2) {
    document.getElementById('author-head').innerHTML = 'Author';
  };
}

function updatePagesHeader() {
  if (pagesOrder === 0) {
    document.getElementById('pages-head').innerHTML = 'Pages ⧨';
  }
  else if (pagesOrder === 1) {
    document.getElementById('pages-head').innerHTML = 'Pages  ◭';
  }
  else if (pagesOrder === 2) {
    document.getElementById('pages-head').innerHTML = 'Pages';
  };
}

function updateStatusHeader() {
  if (statusOrder === 0) {
    document.getElementById('status-head').innerHTML = 'Status ⧨';
  }
  else if (statusOrder === 1) {
    document.getElementById('status-head').innerHTML = 'Status  ◭';
  }
  else if (statusOrder === 2) {
    document.getElementById('status-head').innerHTML = 'Status';
  };
}

function sortByTitle() {

  if (titleOrder === 0) {
    myLibrary = myLibrary.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);

  } else if (titleOrder === 1) {
    myLibrary = myLibrary.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
  } else if (titleOrder === 2) {
    myLibrary = [];
    myLibrary2.forEach((book) => {
      myLibrary.unshift(book);
    })
  };
  saveTitleOrder();
  saveOriginalStatus();
  renderLibrary();
}

function sortByAuthor() {

  if (authorOrder === 0) {
    myLibrary = myLibrary.sort((a, b) => a.author > b.author ? 1 : -1);

  } else if (authorOrder === 1) {
    myLibrary = myLibrary.sort((a, b) => a.author < b.author ? 1 : -1);
  } else if (authorOrder === 2) {
    myLibrary = [];
    myLibrary2.forEach((book) => {
      myLibrary.unshift(book);
    })
  };
  saveAuthorOrder();
  saveOriginalStatus();
  renderLibrary();
}

function sortByPages() {

  if (pagesOrder === 0) {
    myLibrary = myLibrary.sort((a, b) => Number(a.pages) > Number(b.pages) ? 1 : -1);

  } else if (pagesOrder === 1) {
    myLibrary = myLibrary.sort((a, b) => Number(a.pages) < Number(b.pages) ? 1 : -1);

  } else if (pagesOrder === 2) {
    myLibrary = [];
    myLibrary2.forEach((book) => {
      myLibrary.unshift(book);
    });

  };
  savePagesOrder();
  saveOriginalStatus();
  renderLibrary();
}

function sortByStatus() {

  if (statusOrder === 0) {
    myLibrary = myLibrary.sort((a, b) => a.status > b.status ? 1 : -1);

  } else if (statusOrder === 1) {
    myLibrary = myLibrary.sort((a, b) => a.status < b.status ? 1 : -1);

  } else if (statusOrder === 2) {
    myLibrary = [];
    myLibrary2.forEach((book) => {
      myLibrary.unshift(book);
    });

  };
  saveStatusOrder();
  saveOriginalStatus();
  renderLibrary();
}

function sort(type) {
  if (type === 'title') {
    sortByTitle();
    updateTitleHeader();
  } else if (type === 'author') {
    sortByAuthor();
    updateAuthorHeader();
  } else if (type === 'pages') {
    sortByPages();
    updatePagesHeader();
  } else if (type === 'status') {
    sortByStatus();
    updateStatusHeader();
  } else if (type === 'none') {
    return
  }
}

sort(sortedBy);


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
  localStorage.setItem('library2', JSON.stringify(myLibrary2));
  saveToStorage();
  const structure = document.querySelector('.table');
  structure.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
  setTimeout(() => {
    location.reload();
  }, 1200)
};

changePalette(currentTheme);
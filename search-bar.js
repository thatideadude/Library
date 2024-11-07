let isSearchBarShowing = 'no'

window.addEventListener('click', (e) => {
  if (isSearchBarShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closeSearchBar();
  }
})

document.querySelector('.search-icon').addEventListener('click', () => {
  if (isSearchBarShowing === 'no') { createSearchBar() };
  if (isSearchBarShowing === 'yes') { closeSearchBar() };
})

function createSearchBar() {
  const searchContainer = document.createElement('div');
  searchContainer.setAttribute('class', 'search-bar-container');
  const input = document.createElement('input');
  input.setAttribute('class', 'search-bar-input');
  input.setAttribute('placeholder', 'What are you looking for?');
  searchContainer.appendChild(input);
  const separationLine = document.createElement('div');
  separationLine.setAttribute('class', 'separation-line');
  searchContainer.appendChild(separationLine);
  document.querySelector('.search-wrapper').appendChild(searchContainer);

  document.querySelector('.search-wrapper').style.opacity = 1;
  document.querySelector('.table').style.transition = '1s';
  document.querySelector('.table').style.opacity = 0;
  setTimeout(() => { document.querySelector('.table').style.display = 'none' }, 1000)
  document.querySelector('.search-bar-input').focus();
  document.querySelector('.search-bar-input').addEventListener('keyup', () => {
    searchLibrary(document.querySelector('.search-bar-input').value);
  });

  hideFooter();

  setTimeout(() => { isSearchBarShowing = 'yes'; }, 500)
}


function hideFooter() {
  document.querySelectorAll('.palette').forEach((button) => {
    button.style.opacity = '0';
  })
  document.querySelector('.search-icon').style.opacity = 0;
  document.querySelector('.add-book-icon').style.opacity = 0;
  document.querySelector('.footer').style.transition = 'height 1000ms';
  setTimeout(() => {
    document.querySelectorAll('palette').forEach((button) => {
      button.style.display = 'none';
    })
    document.querySelector('.palette-1').style.display = 'none';
    document.querySelector('.palette-2').style.display = 'none';
    document.querySelector('.palette-3').style.display = 'none';
    document.querySelector('.search-icon').style.display = 'none';
    document.querySelector('.add-book-icon').style.display = 'none';
    document.querySelector('.footer').style.height = '0px';

  }, 220)
}

function showFooter() {
  document.querySelector('.footer').style.height = '3.9rem';
  document.querySelector('.palette-1').style.display = 'initial';
  document.querySelector('.palette-2').style.display = 'initial';
  document.querySelector('.palette-3').style.display = 'initial';
  document.querySelector('.search-icon').style.display = 'initial';
  document.querySelector('.add-book-icon').style.display = 'initial';
  document.querySelectorAll('palette').forEach((button) => {
    button.style.display = 'initial';
  })
  setTimeout(() => {
    document.querySelector('.footer').style.transition = 'background-color 300ms';
  }, 1000)
  setTimeout(() => {
    document.querySelector('.search-icon').style.opacity = 1;
    document.querySelector('.add-book-icon').style.opacity = 1;
    document.querySelectorAll('.palette').forEach((button) => {
      button.style.transition = '300ms';
      button.style.opacity = '1';
    })
  }, 300)
}

function closeSearchBar() {
  setTimeout(() => { isSearchBarShowing = 'no'; }, 500)
  showFooter();
  document.querySelector('.search-wrapper').style.opacity = 0;
  document.querySelector('.table').style.display = 'grid';
  document.querySelector('.table').style.transition = 'opacity 1s';
  try {
    document.querySelector('.results-container').remove();
  } catch (error) { };
  setTimeout(() => {
    document.querySelector('.table').style.opacity = 1;
    document.querySelector('.search-bar-container').remove();
  }, 100)

};

let searchResults = ['', '', '', ''];

function searchLibrary(input) {
  searchResults = ['', '', '', ''];
  for (let i = 0; i < myLibrary.length; i++) {
    let titleForSearch = myLibrary[i].title.toLowerCase();
    let authorForSearch = myLibrary[i].author.toLowerCase();

    if (titleForSearch.includes(input.toLowerCase()) || authorForSearch.includes(input.toLowerCase())) {
      searchResults.unshift(myLibrary[i]);
      searchResults.pop();
    }
  }
  showResults();
};

function showResults() {
  try {
    document.querySelector('.results-container').remove();
  } catch (error) { };

  if (document.querySelector('.search-bar-input').value !== '') {
    document.querySelector('.separation-line').style.display = 'flex';
    const resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('class', 'results-container');
    document.querySelector('.search-wrapper').appendChild(resultsContainer);
    document.querySelector('.search-bar-container').style.borderRadius = '2rem 2rem 0 0';
    for (let i = 0; i < 4; i++) {
      if (searchResults[i].title !== undefined) {
        const resultDiv = document.createElement('div');
        resultDiv.setAttribute('class', `search-result-div search-result-div-${i}`);
        // resultDiv.setAttribute('onclick', `showBookCard('${searchResults[i].title}')`);
        const resultP = document.createElement('p');
        resultP.setAttribute('class', `resultP resultP-${i}`);
        resultP.innerText = `${searchResults[i].title} by ${searchResults[i].author}`;
        resultDiv.appendChild(resultP);
        resultsContainer.appendChild(resultDiv);
      }
    }
  }
  if (searchResults[0] === '' || document.querySelector('.search-bar-input').value === '') {
    document.querySelector('.search-bar-container').style.borderRadius = '2rem';
    document.querySelector('.separation-line').style.display = 'none';



  }
};

// function showBookCard(result) {
//   let index;
//   for (let i = 0; i < myLibrary.length; i++) {
//     if (myLibrary[i].title.includes(result) || myLibrary[i].author.includes(result)) { index = i; }
//   }

//   document.querySelector('.search-wrapper').style.opacity = 0;
//   const card = document.createElement('div');
//   card.setAttribute('class', `book-card-${index} book-card`);
//   const cardTitle = document.createElement('p');
//   cardTitle.setAttribute('class', `card-title-${index} card-title`);
//   cardTitle.innerHTML = myLibrary[index].title;
//   card.appendChild(cardTitle);
//   document.body.prepend(card);
// };


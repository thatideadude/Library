let isSearchBarShowing = 'no'

window.addEventListener('click', (e) => {
  if (isSearchBarShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closeSearchBar();
  } if (isPopUpShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closePopUp();
  }
})

document.querySelector('.search-icon').addEventListener('click', () => {
  if (isSearchBarShowing === 'no') { createSearchBar() };
  if (isSearchBarShowing === 'yes') {
    setTimeout(() => { closeSearchBar() }, 1000)
  }
})

function createSearchBar() {
  if (isSearchBarShowing === 'no') {
    setTimeout(() => { isSearchBarShowing = 'yes' }, 10)
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
    setTimeout(() => {
      document.querySelector('.table').style.transition = 'grid-template-columns 1000ms';
    }, 1000)
    document.querySelector('.table').style.opacity = 0;
    setTimeout(() => { document.querySelector('.table').style.display = 'none' }, 1000)
    document.querySelector('.search-bar-input').focus();
    document.querySelector('.search-bar-input').addEventListener('keyup', () => {
      searchLibrary(document.querySelector('.search-bar-input').value);
    });

    hideFooter();
  }
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
  setTimeout(() => {
    document.querySelector('.table').style.transition = 'grid-template-columns 1000ms';
  }, 1000)
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
        resultDiv.setAttribute('onclick', `showAuthorCard('${searchResults[i].title}')`);
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

let isAuthorCardShowing = 'no';

let wikiFetchAuthorResult = '';

async function showAuthorCard(result) {

  if (isAuthorCardShowing === 'no') {

    let index;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title.includes(result)) { index = i; }
    }

    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&exsentences=5&prop=extracts&exintro&explaintext&format=json&origin=*&titles=${convertToFectchWikipedia(myLibrary[index].author)}`
      );
      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      if (page.extract) {
        wikiFetchAuthorResult = page.extract;
        


        document.querySelector('.search-wrapper').style.transition = '300ms';
        document.querySelector('.search-wrapper').style.opacity = 0;
        setTimeout(() => { document.querySelector('.search-bar-container').remove() }, 500)
        isSearchBarShowing = 'no';


        const cardsWrapper = document.createElement('div');
        cardsWrapper.setAttribute('class', 'cards-wrapper');
        const authorCard = document.createElement('div');
        authorCard.setAttribute('class', `author-book-card-${index} author-book-card book-card`);
        const authorCardP = document.createElement('p');
        authorCardP.setAttribute('class', `card-author-p-${index} card-author-p`);
        authorCard.appendChild(authorCardP);
        cardsWrapper.appendChild(authorCard);
        document.body.prepend(cardsWrapper);
        // renderFetchedWikipediaInfo(convertToFectchWikipedia(myLibrary[index].author), 5)
        setTimeout(() => {

          document.querySelector('.card-author-p').innerHTML =
            `<h1>About ${myLibrary[index].author}</h1>` + (wikiFetchAuthorResult) + `<br><span class="fetched-menssage"><i>Continue reading about ${myLibrary[index].author} on <a href="https://en.wikipedia.org/wiki/${convertToFectchWikipedia(myLibrary[index].author)}">Wikipedia</a></i></span>`

          document.querySelector(`.author-book-card-${index}`).style.padding = '0.5rem';
          document.querySelector(`.author-book-card-${index}`).style.height = '21rem';
          document.querySelector(`.card-author-p-${index}`).style.opacity = 1;
          // showTitleCard(myLibrary[index].title)
          isAuthorCardShowing = 'yes';
        }, 500)

      } else {
        console.log(2)
      }
    } catch (error) {
      console.log(error)
    }

  }
};

function closeCard(selector) {
  if (isAuthorCardShowing === 'yes') {
    document.querySelector(selector).style.transition = '500ms';

    setTimeout(() => {
      document.querySelector(selector).style.height = 0;
      document.querySelector(selector).style.padding = 0;

      document.querySelector(selector).remove();

      isAuthorCardShowing === 'no';

    }, 500)
  }
}

let isTitleCardShowing = 'no';

// function showTitleCard(result) {

//   if (isTitleCardShowing === 'no') {
//     let index;
//     for (let i = 0; i < myLibrary.length; i++) {
//       if (myLibrary[i].title.includes(result)) { index = i; }
//     }

//     const titleCard = document.createElement('div');
//     titleCard.setAttribute('class', `title-book-card-${index} title-book-card book-card`);
//     const titleP = document.createElement('p');
//     titleP.setAttribute('class', `card-title-${index} card-title`);
//     titleCard.appendChild(titleP);
//     document.querySelector('.cards-wrapper').appendChild(titleCard);
//     renderFetchedWikipediaInfo(convertToFectchWikipedia(myLibrary[index].title), 5, `.card-title-${index}`, '.title-book-card', `${myLibrary[index].title}`)
//     setTimeout(() => {

//       document.querySelector(`.title-book-card-${index}`).style.padding = '0.5rem';
//       document.querySelector(`.title-book-card-${index}`).style.height = '21rem';
//       document.querySelector(`.card-title-${index}`).style.opacity = 1;
//       isTitleCardShowing = 'yes';
//     }, 400)
//   }
// };

function convertToFectchWikipedia(input) {
  let convertedString;
  convertedString = input.replace(' ', '_');
  convertedString = input.replace('.', "._")
  return convertedString;
}
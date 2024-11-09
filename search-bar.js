let isSearchBarShowing = 'no';
let isAuthorCardShowing = 'no';
let isTitleCardShowing = 'no';
let wikiFetchAuthorResult = '';
let wikiFetchTitleResult = '';
let searchResults = ['', '', '', ''];

window.addEventListener('click', (e) => {
  if (isSearchBarShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closeSearchBar();
  } if (isPopUpShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closePopUp();
  } if (isAuthorCardShowing === 'yes' || isTitleCardShowing === 'yes'
    && e.target === document.querySelector('.container')) {
    closeCard();
    console.log('event working')
  }

})

document.querySelector('.search-icon').addEventListener('click', () => {
  if (isSearchBarShowing === 'no') { createSearchBar() };
  if (isSearchBarShowing === 'yes') {
    setTimeout(() => { closeSearchBar() }, 1000)
  }
})

function createSearchBar() {
  if (!document.querySelector('.search-bar-container')) {
    if (isSearchBarShowing === 'no') {
      setTimeout(() => { isSearchBarShowing = 'yes' }, 100)

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
      document.querySelector('.search-wrapper').style.display = 'flex';
      document.querySelector('.table').style.transition = '1s';
      setTimeout(() => { document.querySelector('.search-wrapper').style.opacity = 1; }, 300)
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
        resultDiv.setAttribute('onclick', `showAuthorCard('${searchResults[i].title}'); showTitleCard('${searchResults[i].title}'); 
          showeMoreFromThisAuhor('${searchResults[i].author}') `);
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

async function showAuthorCard(result) {
  document.querySelector('.cards-container').style.display = 'inline';
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
        setTimeout(() => {
          try {
            document.querySelector('.search-bar-container').remove();
            document.querySelector('.results-container').remove();
          } catch (error) { };
        }, 1000)
        setTimeout(() => { document.querySelector('.search-wrapper').style.display = 'none' }, 500)
        isSearchBarShowing = 'no';


        const authorCard = document.createElement('div');
        authorCard.setAttribute('class', `author-book-card-${index} author-book-card book-card`);
        const authorCardP = document.createElement('p');
        authorCardP.setAttribute('class', `card-author-p-${index} card-author-p`);
        authorCard.appendChild(authorCardP);
        document.querySelector('.cards-wrapper').appendChild(authorCard);
        document.querySelector('.cards-wrapper').style.display = 'flex';
        setTimeout(() => {
          document.querySelector('.card-author-p').innerHTML =
            `<h1>About ${myLibrary[index].author}</h1>${wikiFetchAuthorResult}<br><span class="fetched-menssage"><i>Continue reading about ${myLibrary[index].author} on <a href="https://en.wikipedia.org/wiki/${convertToFectchWikipedia(myLibrary[index].author)}">Wikipedia</a></i></span>`

          document.querySelector(`.author-book-card-${index}`).style.padding = '0.5rem';
          document.querySelector(`.author-book-card-${index}`).style.height = '21rem';
          document.querySelector(`.card-author-p-${index}`).style.opacity = 1;
          isAuthorCardShowing = 'yes';
        }, 500)

      } else {
        const authorCard = document.createElement('div');
        authorCard.setAttribute('class', `author-book-card-${index} author-book-card book-card`);
        authorCard.setAttribute('style', 'height:0px');
        authorCard.setAttribute('style', 'width:0px');
        authorCard.setAttribute('style', 'display: none');
        document.querySelector('.cards-wrapper').appendChild(authorCard);
        console.log(2)
      }
    } catch (error) {
      console.log(error)
    }
  }
};

async function showTitleCard(result) {

  if (isTitleCardShowing === 'no') {

    let index;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title.includes(result)) { index = i; }
    }
    fetchBookCover(`${convertToFectchWikipedia(myLibrary[index].title)}`)
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&exsentences=5&prop=extracts&exintro&explaintext&format=json&origin=*&titles=${convertToFectchWikipedia(myLibrary[index].title)}`
      );

      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      if (page.extract) {
        wikiFetchTitleResult = page.extract;

        document.querySelector('.search-wrapper').style.transition = '300ms';
        document.querySelector('.search-wrapper').style.opacity = 0;
        setTimeout(() => {
          try {
            document.querySelector('.search-bar-container').remove();
            document.querySelector('.results-container').remove();
          } catch (error) { };
        }, 1000)
        setTimeout(() => { document.querySelector('.search-wrapper').style.display = 'none' }, 500)
        isSearchBarShowing = 'no';


        const titleCard = document.createElement('div');
        titleCard.setAttribute('class', `title-book-card-${index} title-book-card book-card`);
        const titleCardP = document.createElement('p');
        titleCardP.setAttribute('class', `card-title-p-${index} card-title-p`);
        titleCard.appendChild(titleCardP);
        document.querySelector('.cards-wrapper').appendChild(titleCard);


        document.querySelector('.cards-wrapper').style.display = 'flex';



        setTimeout(() => {

          document.querySelector('.card-title-p').innerHTML =
            `<h1>About ${myLibrary[index].title}</h1><img src=${fetchedImage} class="image-book-card image-book-card${index}">${wikiFetchTitleResult}<br><span class="fetched-menssage"><i>Continue reading about ${myLibrary[index].title} on <a href="https://en.wikipedia.org/wiki/${convertToFectchWikipedia(myLibrary[index].title)}">Wikipedia</a></i></span>`

          document.querySelector(`.title-book-card-${index}`).style.padding = '0.5rem';
          document.querySelector(`.title-book-card-${index}`).style.height = '21rem';
          document.querySelector(`.card-title-p-${index}`).style.opacity = 1;
          isTitleCardShowing = 'yes';
          isAuthorCardShowing = 'yes';
        }, 500)

      } else {
        console.log(2);
        return
      }
    } catch (error) { }

  }
};

function closeCard() {
  if (document.querySelector('.author-book-card') || document.querySelector('.tile-book-card')) {
    try {
      document.querySelector('.author-book-card').style.transition = '500ms';
      document.querySelector('.author-book-card').style.height = 0;
      document.querySelector('.author-book-card').style.padding = 0;
      document.querySelector('.title-book-card').style.transition = '500ms';
      document.querySelector('.title-book-card').style.height = 0;
      document.querySelector('.title-book-card').style.padding = 0;
    } catch (error) { }
    setTimeout(() => {
      document.querySelector('.cards-wrapper').style.display = 'none';
      try {
        document.querySelector('.author-book-card').remove();
        document.querySelector('.title-book-card').remove();
      } catch (error) { }
      document.querySelector('.table').style.display = 'grid';
      setTimeout(() => {
        document.querySelector('.table').style.transition = '1s'
        document.querySelector('.table').style.opacity = '1';
        showFooter();
      }, 200)

      isAuthorCardShowing = 'no';
      isTitleCardShowing = 'no';
    }, 500)
  }


}


function convertToFectchWikipedia(input) {
  input = input.replaceAll(' ', '_');
  input = input.replaceAll('.', '._')
  return input
}

let fetchedImage;
async function fetchBookCover(book) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyC167ps-nXmldEKbv8YtyhqIKc0PJglvYA`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const book = data.items[0];
      fetchedImage = book.volumeInfo.imageLinks.thumbnail;
      return;
    } else {
      document.getElementById('book-cover').innerText = 'No book cover available.';
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
}


// async function fetchGoogleBooks(author) {
//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${author}&key=AIzaSyC167ps-nXmldEKbv8YtyhqIKc0PJglvYA`
//     );
//     const data = await response.json();

//     if (data.items && data.items.length > 0) {
//       const book = data.items[0];
//       console.log(data);
//       fetchedImage = book.volumeInfo.imageLinks.thumbnail;
//       return;
//     } else {
//       document.getElementById('book-cover').innerText = 'No book cover available.';
//     }
//   } catch (error) {
//     console.error("Error fetching book data:", error);
//   }
// }


let a = 0;
async function showeMoreFromThisAuhor(author) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&AIzaSyC167ps-nXmldEKbv8YtyhqIKc0PJglvYA`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {

      const otherTitlesContainer = document.createElement('div')
      otherTitlesContainer.setAttribute('class', 'other-titles-container');
      document.querySelector('.cards-container').appendChild(otherTitlesContainer)
      for (let i = 0; i < data.items.length; i++) {
        const book = data.items[i];
        console.log(book);
        if (book.volumeInfo.imageLinks) {

          fetchedImage = book.volumeInfo.imageLinks.thumbnail;
          const otherTitlesDiv = document.createElement('div');
          otherTitlesDiv.setAttribute('class', `other-titles-div other-titles-div-${i}`)
          const otherTitlesP = document.createElement('p');
          otherTitlesP.setAttribute('class', `other-titles-p other-titles-p=${i}`)
          otherTitlesP.innerText = `${book.volumeInfo.title}+${book.volumeInfo.subtitle} by ${book.volumeInfo.author}`
          otherTitlesDiv.appendChild(otherTitlesP);
          const otherTitlesImg = document.createElement('img');
          otherTitlesImg.setAttribute('class', `other-titles-img other-titles-img-${i}`);
          otherTitlesImg.setAttribute('src', `${book.volumeInfo.imageLinks.thumbnail}`);
          otherTitlesDiv.appendChild(otherTitlesImg);
          otherTitlesContainer.appendChild(otherTitlesDiv);
        } if (a < 5) {showeMoreFromThisAuhor(author); a++};
      }
      return;
    } else {
      // fetchedImage = 'No book cover available.';
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }

};



// showAuthorCard(myLibrary[1].title);
// showTitleCard(myLibrary[1].title);
// hideFooter();
// document.querySelector('.table').style.display = 'none';

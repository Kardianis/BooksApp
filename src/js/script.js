/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
      bookClass: 'book__image',
      checkedClass: 'checked',
      hiddenClass: 'hidden'
    }
  };

  function render() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;

    for (const book of thisBooksList.data) {

      /* make a template for a book */

      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);

      /* generate HTML from template */

      const generatedHTML = bookTemplate(book);


      /* create DOM element */

      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);


      /* find container of books*/

      const bookContainer = document.querySelector(select.containerOf.booksList);

      /* add element to list */

      bookContainer.appendChild(thisBooksList.element);

    }
  }
  
  const favoriteBooks = [];
  const filters = [];
  function initActions() {

    const booksList = document.querySelector(select.containerOf.booksList);
    
    const event = 'dblclick';
    booksList.addEventListener(event, function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {

        
        let id = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(id)) {
          event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);
          console.log(id);
          favoriteBooks.push(id);
        } else {
          event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
          const indexOfId = favoriteBooks.indexOf(id);
          favoriteBooks.splice(indexOfId, 1);
        }



      }

    });
    const filter = document.querySelector('.filters');
    
    filter.addEventListener('change', function (event) {
      event.preventDefault();
      const value = event.target.value;
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
       
        if (!event.target.classList.contains('checked') == true) {
          event.target.classList.add(classNames.bookCart.checkedClass);
          filters.push(value);


        } else {
          event.target.classList.remove(classNames.bookCart.checkedClass);
          const indexOfFilters = filters.indexOf(value);
          filters.splice(indexOfFilters, 1);

        }
        filterBooks(filters);

      }

    });

  }

  function filterBooks(filters) {

    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }

      }

      const bookImage = document.querySelector(`${select.imageOf.bookImage}[data-id="${book.id}"]`);

      if (shouldBeHidden) bookImage.classList.add(classNames.bookCart.hiddenClass);
      else bookImage.classList.remove(classNames.bookCart.hiddenClass);

    }

  }

  render();
  //getElements();
  initActions();
}
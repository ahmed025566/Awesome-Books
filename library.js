const booksDiv = document.querySelector('.books');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const add = document.querySelector('.add');
/* eslint no-undef: "off" */
let books = Storage.getFromTheStorage();

let count = 1;
class Libraray {
  static displayData() {
    booksDiv.innerHTML = '';
    books.forEach((book) => {
      const div = document.createElement('div');
      div.className = 'book';
      if (count % 2 === 0) {
        div.classList.add('gray');
      }
      count += 1;
      div.setAttribute('data-id', book.id);
      const text = document.createElement('p');
      text.append(document.createTextNode(book.title));
      text.append(document.createTextNode(' by '));
      text.append(document.createTextNode(book.author));
      div.append(text);
      const remove = document.createElement('button');
      remove.className = 'remove';
      remove.appendChild(document.createTextNode('Remove'));
      div.appendChild(remove);
      booksDiv.append(div);
    });
  }

  static clearInput() {
    title.value = '';
    author.value = '';
  }

  static removebook() {
    booksDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
      }
      const btnId = e.target.parentElement.getAttribute('data-id');
      Libraray.deleteBook(btnId);
    });
  }

  static deleteBook(bookID) {
    books = books.filter((book) => book.id !== +bookID);
    Storage.addToLocalStorage(books);
  }
}
add.addEventListener('click', () => {
  if (author.value !== '' && title.value !== '') {
    const id = Date.now();

    const newBook = new Book(id, title.value, author.value);
    books.push(newBook);
    Libraray.displayData();
    Libraray.clearInput();
    Storage.addToLocalStorage(books);
  }
});
window.addEventListener('DOMContentLoaded', () => {
  Libraray.displayData();
  // remove from the dom
  Libraray.removebook();
});

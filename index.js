let count = 1;
class BookManager {
  constructor() {
    this.booksDiv = document.querySelector('.books');
    this.title = document.querySelector('.title');
    this.author = document.querySelector('.author');
    this.add = document.querySelector('.add');
    this.books = [];
    this.getBooksFromLocalStorage();
    this.addElementsToPage();
    this.addEventListeners();
  }

  addElementsToPage() {
    this.booksDiv.innerHTML = '';
    this.books.forEach((book) => {
      const div = document.createElement('div');
      div.className = 'book';
      if (book.count % 2 === 0) {
        div.classList.add('gray');
      }
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

      this.booksDiv.append(div);
    });
  }

  addToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook() {
    if (this.title.value !== '' && this.author.value !== '') {
      const book = {
        id: Date.now(),
        title: this.title.value,
        author: this.author.value,
        count,
      };
      this.books.push(book);
      this.addElementsToPage();
      this.addToLocalStorage();
      this.title.value = '';
      this.author.value = '';
    }
    count += 1;
  }

  getBooksFromLocalStorage() {
    const data = localStorage.getItem('books');
    if (data) {
      this.books = JSON.parse(data);
    }
  }

  deleteBook(bookID) {
    this.books = this.books.filter((book) => book.id !== +bookID);
    this.addToLocalStorage();
  }

  addEventListeners() {
    this.add.onclick = this.addBook.bind(this);

    this.booksDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        this.deleteBook(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
      }
    });
  }
}
const bookManager = new BookManager();
bookManager.addElementsToPage();

function displayDate() {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  document.getElementById('displayDateTime').innerHTML = dateTime;
}

const list = document.getElementById('list');
const addNew = document.getElementById('add-book');
const contact = document.getElementById('contact');

list.onclick = function () {
  const addNew = document.querySelector('.add-section');
  addNew.classList.add('display-none');
  const contact = document.querySelector('.Contact-section');
  contact.classList.add('display-none');
  const list = document.querySelector('.books');
  list.classList.remove('display-none');
  const intro = document.getElementById('intro');
  intro.innerHTML = 'All Awesome Books';
  displayDate();  
};
addNew.onclick = function () {
  const list = document.querySelector('.books');
  list.classList.add('display-none');
  const contact = document.querySelector('.Contact-section');
  contact.classList.add('display-none');
  const addNew = document.querySelector('.add-section');
  addNew.classList.remove('display-none');
  const intro = document.getElementById('intro');
  intro.innerHTML = 'Add a new book';
  displayDate();
};
contact.onclick = function () {
  const list = document.querySelector('.books');
  list.classList.add('display-none');
  const contact = document.querySelector('.Contact-section');
  contact.classList.remove('display-none');
  const addNew = document.querySelector('.add-section');
  addNew.classList.add('display-none');
  const intro = document.getElementById('intro');
  intro.innerHTML = 'Conatct Information';
  displayDate();
};
window.onload = function () {
  const addNew = document.querySelector('.add-section');
  addNew.classList.add('display-none');
  const contact = document.querySelector('.Contact-section');
  contact.classList.add('display-none');
  const list = document.querySelector('.books');
  list.classList.remove('display-none');
  const intro = document.getElementById('intro');
  intro.innerHTML = 'All Awesome Books';
  displayDate();
};

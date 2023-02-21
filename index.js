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
      div.setAttribute('data-id', book.id);
      div.append(document.createTextNode(`${book.title} by ${book.author}`));
      div.append(document.createElement('br'));
      const remove = document.createElement('button');
      div.append(document.createElement('br'));
      remove.className = 'remove';
      remove.appendChild(document.createTextNode('Remove'));
      div.appendChild(remove);
      const borderBottom = document.createElement('hr');
      div.append(borderBottom);
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
      };
      this.books.push(book);
      this.addElementsToPage();
      this.addToLocalStorage();
      this.title.value = '';
      this.author.value = '';
    }
  }

  getBooksFromLocalStorage() {
    const data = localStorage.getItem('books');
    if (data) {
      this.books = JSON.parse(data);
    }
  }

  deleteBook(bookID) {
    this.books = this.books.filter((book) => book.id != bookID);
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
bookManager.displayBooks();
/* eslint eqeqeq: "off" */
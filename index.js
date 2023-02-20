const booksDiv = document.querySelector('.books');
const tiltle = document.querySelector('.title');
const author = document.querySelector('.author');
const add = document.querySelector('.add');

let books = [];
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}

function addElementsTopage(books) {
  booksDiv.innerHTML = '';
  books.forEach((book) => {
    const div = document.createElement('div');
    div.className = 'book';
    div.setAttribute('data-id', book.id);
    div.append(document.createTextNode(book.title));
    div.append(document.createElement('br'));
    div.append(document.createTextNode(book.author));
    div.append(document.createElement('br'));
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.appendChild(document.createTextNode('Remove'));
    div.appendChild(remove);
    const borderBottom = document.createElement('hr');
    // borderBottom.style.width = "50px";
    div.append(borderBottom);
    booksDiv.append(div);
  });
}

function addToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook(title, author) {
  const book = {
    id: Date.now(),
    title,
    author,
  };
  books.push(book);
  addElementsTopage(books);
  addToLocalStorage(books);
}

function getDataFromLocalStorage() {
  const data = localStorage.getItem('books');
  if (data) {
    const books = JSON.parse(data);
    addElementsTopage(books);
  }
}

getDataFromLocalStorage();

add.onclick = function () {
  if (tiltle.value !== '' && author.value !== '') {
    addBook(tiltle.value, author.value);
    tiltle.value = '';
    author.value = '';
  }
};
function deleteBook(bookID) {
  books = books.filter((book) => book.id != bookID);
  addToLocalStorage(books);
}
booksDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    deleteBook(e.target.parentElement.getAttribute('data-id'));
    e.target.parentElement.remove();
  }
});

class Storage {
  static addToLocalStorage(books) {
    const storage = localStorage.setItem('books', JSON.stringify(books));
    return storage;
  }

  static getFromTheStorage() {
    const storage = localStorage.getItem('books') === null
      ? [] : JSON.parse(localStorage.getItem('books'));
    return storage;
  }
}
if (3 % 2 === 0) {
  console.log(Storage);
}
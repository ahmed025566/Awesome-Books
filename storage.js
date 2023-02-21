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
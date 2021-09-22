class Libraries {
    static books=[];

    static id = 0;

    static add = (bookTitle, bookAuthor) => {
      this.id += 1;
      const newBook = { id: this.id, title: bookTitle, author: bookAuthor };
      this.books.push(newBook);
      localStorage.setItem('books', JSON.stringify(this.books));
      localStorage.setItem('id', this.id);
      this.displayData(this.books);
    }

    static loadData = () => {
      if (localStorage.getItem('books')) {
        this.books = JSON.parse(localStorage.getItem('books'));
        this.displayData();
      }
      if (localStorage.getItem('id')) this.id = parseInt(localStorage.getItem('id'), 10);
    }
}

const title = document.querySelector('#text_title');
const author = document.querySelector('#text_author');
const add = document.querySelector('#add');

Libraries.loadData();
// Libraries.displayData();
add.addEventListener('click', () => {
  Libraries.add(title.value, author.value);
  title.value = '';
  author.value = '';
});

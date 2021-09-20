let books = [];
const container = document.querySelector('#books_display');
const title = document.querySelector('#text_title');
const author = document.querySelector('#text_author');
const add = document.querySelector('#add');
const remove = () => {
  const remove = document.querySelectorAll('.remove');
  remove.forEach((element) => {
    const id = parseInt(element.id, 10);
    element.addEventListener('click', () => {
      const newbooks = books.filter((book) => {
        if (book.id !== id) return book;
      });
      books = newbooks;
      localStorage.setItem('books', JSON.stringify(books));
      // eslint-disable-next-line no-use-before-define
      displayData(books);
    });
  });
};
const displayData = (books) => {
  let tmp = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < books.length; i++) {
    tmp += `
        <div>
            <div>${books[i].title}</div>
            <div>${books[i].author}</div>

            <button class = "remove" id="${books[i].id}">remove</button>
        </div> <hr>
        `;
  }
  container.innerHTML = tmp;
  remove();
};
const loadData = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
    displayData(books);
  }
};
const saveData = () => {
  add.addEventListener('click', () => {
    if (title.value.length !== 0 && author.value.length !== 0) {
      const num = books.length + 1;
      const book = { id: num, title: title.value, author: author.value };
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      displayData(books);
      title.value = '';
      author.value = '';
    // eslint-disable-next-line no-alert
    } else alert('the title and author should not be empty!');
  });
};

loadData();
saveData();

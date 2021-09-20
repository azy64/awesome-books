let books = [];
const container = document.querySelector('#books_display');
const title = document.querySelector('#text_title');
const author = document.querySelector('#text_author');
const add = document.querySelector('#add');
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
        `
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
    const num = books.length + 1;
    const book = { id: num, title: title.value, author: author.value };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayData(books);
  });
};
const remove = () =>{
  const remove = document.querySelectorAll('.remove');
  remove.forEach(function (element) {
    let id = parseInt(element.id);
    element.addEventListener('click',() => {
      let newbooks = books.filter (function (book) {
        console.log('this is the id ',book.id);
        if (book.id !== id)
        return book;
      })
      books = newbooks;
      localStorage.setItem('books', JSON.stringify(books));
      displayData(books);
    })
  })
}
loadData();
saveData();



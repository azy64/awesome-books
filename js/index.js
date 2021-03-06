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

    static displayData = () => {
      const container = document.querySelector('#books_display');
      let tmp = '';
      for (let i = 0; i < this.books.length; i += 1) {
        tmp += `
        <div id="l${this.books[i].id}" class="grid grid-col-2 grid-col-gap book">
            <div class="wpx-100 p-10">
                &#8220; ${this.books[i].title} &#8221; by ${this.books[i].author} 
            </div>
            <div class="text-right wpx-100 p-10">
                <button class = "remove btn btn-shadow" id="${this.books[i].id}">Remove</button>
            </div>
        </div>
        `;
      }
      container.innerHTML = tmp;
      const bookToRemove = document.querySelectorAll('.remove');
      bookToRemove.forEach(this.remove);
    }

    static remove = (element) => {
      const id = parseInt(element.id, 10);
      const container = document.querySelector('#books_display');
      element.addEventListener('click', () => {
        const newbooks = this.books.filter((book) => {
          if (book.id !== id) return book;
          return '';
        });
        this.books = newbooks;
        localStorage.setItem('books', JSON.stringify(this.books));
        const el = `l${id}`;
        const children = container.childNodes;
        children.forEach((element) => {
          if (element.id === el) {
            container.removeChild(element);
          }
        });
      });
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
// const for GUI
const item1 = document.querySelector('#item1');
const item2 = document.querySelector('#item2');
const item3 = document.querySelector('#item3');
const bigContainer = document.querySelector('.big-container');
const anchors = document.querySelectorAll('nav ul a');
Libraries.loadData();
Libraries.displayData();
add.addEventListener('click', () => {
  if (title.value && author.value) {
    Libraries.add(title.value, author.value);
    title.value = '';
    author.value = '';
  }
});
item1.addEventListener('click', (e) => {
  bigContainer.classList.remove('ml-less-100');
  bigContainer.classList.remove('ml-less-200');
  bigContainer.classList.add('ml-less-0');
  anchors.forEach((elementNode) => {
    elementNode.classList.remove('active');
  });
  item1.classList.add('active');
  e.preventDefault();
});
item2.addEventListener('click', (e) => {
  bigContainer.classList.remove('ml-less-0');
  bigContainer.classList.remove('ml-less-200');
  bigContainer.classList.add('ml-less-100');
  anchors.forEach((elementNode) => {
    elementNode.classList.remove('active');
  });
  item2.classList.add('active');
  e.preventDefault();
});
item3.addEventListener('click', (e) => {
  bigContainer.classList.remove('ml-less-0');
  bigContainer.classList.remove('ml-less-100');
  bigContainer.classList.add('ml-less-200');
  anchors.forEach((elementNode) => {
    elementNode.classList.remove('active');
  });
  item3.classList.add('active');
  e.preventDefault();
});

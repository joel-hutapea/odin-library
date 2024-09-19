var myLibrary = [];

let table = document.querySelector("#library-table");
let dialog = document.querySelector("dialog");
let addButton = document.querySelector("#add-button");
let submitButton = document.querySelector("#submit-button");
let cancelButton = document.querySelector("#cancel-button");

addButton.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    var formData = new FormData(document.querySelector("form"));
    
    var title = "";
    var author = "";
    var pages = 0;
    var read = false;

    for (item of formData) {
        switch (item[0]) {
            case 'title':
                title = item[1];
                break;
            
            case 'author':
                author = item[1];
                break;

            case 'pages':
                pages = item[1];
                break;

            case 'read':
                read = item[1] ? true : false;
                break;
        
            default:
                break;
        }
    }

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
})

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    table.replaceChildren(table.firstElementChild);

    myLibrary.forEach((book, index) => {
        var row = document.createElement("tr");

        var title = document.createElement("td");
        title.textContent = book.title;

        var author = document.createElement("td");
        author.textContent = book.author;

        var pages = document.createElement("td");
        pages.textContent = book.pages;

        var read = document.createElement("td");
        read.textContent = book.read ? "Yes" : "No"

        var readButtonCell = document.createElement("td");
        var readButton = document.createElement("button");
        readButton.textContent = "Toggle Read";
        readButton.addEventListener("click", () => {
            toggleRead(index);
        });

        var deleteButtonCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            removeBook(index);
        })

        readButtonCell.appendChild(readButton)
        deleteButtonCell.appendChild(deleteButton)

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(readButtonCell);
        row.appendChild(deleteButtonCell);

        table.appendChild(row);
    })
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

addBookToLibrary("book1", "author1", 123, true);
addBookToLibrary("book2", "author2", 234, false);
addBookToLibrary("book3", "author3", 345, true);

displayBooks();
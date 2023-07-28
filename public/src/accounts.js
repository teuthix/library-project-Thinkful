function findAccountById(accounts, id) {
  return accounts.find(key => key.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) => accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  //It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
  let total = 0;
  for (let book in books) {
    const bookKey = books[book];
    const bookBorrows = bookKey.borrows;
    for (let borrowsId in bookBorrows) {
      const bookBorrowsId = bookBorrows[borrowsId];
      const bID = bookBorrowsId.id;
      if (bID === account.id){
        total = total + 1;
      }
    }
  }
  return total;
}

//use map() to get an array of book objects + author information
function getBooksPossessedByAccount(account, books, authors) {
  let allBorrowed = [];
  //get all the books checked out by the account that haven't been returned
  // loop through books array, if the id matches, and the returned key value is false, push to array
  books.forEach(book => {
    let bookBorrows = book.borrows;
    //bookBorrows is each item's borrow's key's value, which is an array
    bookBorrows.forEach(borrow => {
      if (borrow.id === account.id && borrow.returned === false) {
        /*
        each item in the borrows array is now represented by borrow
        if the id of the item currently being assessed is the same as the account's id's value
        AND the currently being assessed item's returned value is false, then push book into array
        */
        allBorrowed.push(book);
      }
    });
  });
  
  //add the authors data into each book in the new array. Then return
  let result = allBorrowed.map(book => {
    /* 
    map changes the array we currently have, currently it just has each book object
    now we return the book object WITH author key added
    the author key's value is the output of the findAuthor helper function
    */
    return {...book, author: findAuthor(book, authors)};
  });
  return result;
};

function findAuthor(book, authors){
  /* 
  This helper function takes in the current book in the array, and the authors array
  author looks for if the id key in each object being assessed matches the authorId in the book obj
  */
  const author = authors.find(author => author.id === book.authorId);
  return author;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

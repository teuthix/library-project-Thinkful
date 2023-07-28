function findAuthorById(authors, id) {
let authorFound = authors.find(author => {
  if (author.id === id){
    return author;
  }
})
return authorFound;
};

function findBookById(books, id) {
  let bookFound = books.find( book => {
    if (book.id === id) {
      return book;
    };
  });
  return bookFound;
};

function partitionBooksByBorrowedStatus(books) {
  /* 
  returns ARRAY with TWO ARRAYS INSIDE
  filter method iterates through books array
  BORROWED filters books based on whether first entry in the borrows array of each book has the returned
  property set to false. Meaning book is currently borrowed bc that is most recent transaction
  RETURNED filters books based on whether first entry in borrows array of each book 
  has returned property set to true. meaning book has been returned*/
 const borrowed = books.filter((book) => book.borrows[0].returned === false);
 const returned = books.filter((book) => book.borrows[0].returned === true);
 return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  /* return array of TEN OR LESS of accounts from book's borrowers array
  access the book's borrowers array
  find corresponding accounts from accounts array
  add the returned status to each borrower and return array
  */

  //accesses book's borrows array
  const borrowers = book.borrows;
  //get info from borrows array
  const result = borrowers.map((borrower) => {
    //use the findAccountById function to get an array of account info matching the borrower.id
    const accountInfo = findAccountById(accounts, borrower.id);
    //this new array contains the borrower info, each item in book's borrows array
    //accountInfo which is the information with each account that matches the id of the borrower being evaluated
    const newArray = {
      ...borrower,
      ...accountInfo,
    };
    return newArray;
  });
result.splice(10);
return result;
};

function findAccountById(accounts, id) {
  return accounts.find(key => key.id === id);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

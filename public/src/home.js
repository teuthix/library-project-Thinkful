function getTotalBooksCount(books) {
  return books.length;
};

function getTotalAccountsCount(accounts) {
  return accounts.length;
};

function getBooksBorrowedCount(books) {
  //returns NUMBER of currently checked out books
  // if books.borrows.returned === false
  //try using filter to get an object o book sthat have bneen checked out. Then use .length 
  let totalNumber = 0;
  for (let book in books) {
    const bookCheck = books[book];
    const borrowers = bookCheck.borrows;
    for (let borrow in borrowers){
      if(borrowers[borrow].returned === false){
        totalNumber++;
      };
    };
  };
  return totalNumber;
};

function getMostCommonGenres(books) {
  //return ARRAY of <5 items from most to least common genres
  /* each object has two keys, 
  name - name of genre
  count - number of times the genre occurs
  */

 // create a bunch of piles for each genre
   //loop through every book to get every possible genre
   //loop through genres and filter books to just get that genre
   //or forEach or reduce
 // count how many in each pile and then sort from highest to lowest
 //write down top 5

 const genrePiles = books.reduce((genreCounter, book) => {
  if(genreCounter[book.genre]) {
    genreCounter[book.genre] += 1;
  } else {
    genreCounter[book.genre] = 1;
  };
  return genreCounter;
 }, {});
 //genreCount is now an object of genres and their count
 const genreArray = Object.keys(genrePiles); // [western, mystery, ...]
 const countsArray = genreArray.map(genre => {
  return {name: genre, count: genrePiles[genre]};
 });
 //sort the list to make sure it is in order of highest count to lowest
 const sorted = countsArray.sort((genreA, genreB) => genreB.count - genreA.count);
 return sorted.slice(0, 5);
};

function getMostPopularBooks(books) {
  //returns ARRAY 5 OR FEWER objects or most borrowed books
  /* each object has 2 key values
  name: title of book
  count: number of times it has been borrowed. borrows.length
  */
 //get a list of how many times each book has been borrowed
 const borrowsList = books.reduce((bookCounter, book) => {
  bookCounter[book.title] = book.borrows.length;
  return bookCounter;
  }, {});
  //bookCounter is an object of key values { Kraken: 3, 'Goodbye Eri': 5, ...}
  //now we want an array of the book titles
  const titles = Object.keys(borrowsList); // [Kraken, 'Goodbye Eri', ...]
  //now use map to turn the titles array into objects with the correct 
  const popularBooksArray = titles.map((title) => {
    return {name: title, count: borrowsList[title]};
  });
  const sortedPopularity = popularBooksArray.sort((titleA, titleB) => titleB.count - titleA.count);
  return sortedPopularity.slice(0, 5);
};


  function findBooksByAuthor(books, authorId){
    /* 
    This helper function takes in the current book in the array, and the authors array
    author looks for if the id key in each object being assessed matches the authorId in the book obj
    */
    return books.filter((book) => book.authorId === authorId);
  };

function getMostPopularAuthors(books, authors) {
  //parameters are both arrays
  /* return ARRAY WITH 5 OR LESS objects of most popular authors
  popularity determined by authors whos books has been checked out the most
  NAME - first and last name of author
  COUNT - number of times the author's books has been borrowed
  */
  const authorsArray = authors.map((author) => {
    const {
      id,
      name: {first, last},
    } = author;
    const authorName = `${first} ${last}`;
    const authorsBooks = findBooksByAuthor(books, author.id); //[book1, book2]
    const totalBorrows = authorsBooks.reduce((wip, book) => wip + book.borrows.length, 0);
    return {name: authorName, count: totalBorrows};
  });
  authorsArray.sort((count1, count2) => count2.count - count1.count);
  return authorsArray.slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  ErrorMessage: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        books: action.payload,
      };
    case "FETCH_BOOKS_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        ErrorMessage: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "DELETE_BOOK":
      const filteredBooks = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        books: filteredBooks,
      };
    case "EDIT_BOOK":
      //öncelikle edit kitabı sil sonrasın da güncel olanı ekle
      const filteredBooksEdit = state.books.filter(
        (item) => item.id != action.payload.id
      );
      return {
        ...state,
        books: [...filteredBooksEdit, action.payload],
      };

    default:
      return state;
  }
};

export default booksReducer;

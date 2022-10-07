import categoriesReducer from "./Reducers/Categories";
import { createStore } from "redux";
import { combineReducers } from "redux";
import booksReducer from "./Reducers/BooksReducer";

const rootReducers = combineReducers({
  categoriesState: categoriesReducer,
  booksState : booksReducer

});

const store = createStore(rootReducers);

export default store;

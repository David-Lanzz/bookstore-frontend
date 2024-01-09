import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/books/bookSlice';
import authenticationReducer from './features/authentication/authenticationSlice';
import schoolReducer from './features/schools/schoolSlice';
import departmentReducer from './features/departments/departmentSlice';
import levelReducer from './features/levels/levelSlice';
import categoriesReducer from './features/categories/categorySlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authenticationReducer,
    schools: schoolReducer,
    departments: departmentReducer,
    levels: levelReducer,
    categories: categoriesReducer
  },
});

export default store;

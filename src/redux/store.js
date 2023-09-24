import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/books/bookSlice';
import categoreReducer from './features/categories/categorySlice';
import authenticationReducer from './features/authentication/authenticationSlice';
import schoolReducer from './features/schools/schoolSlice';
import departmentReducer from './features/departments/departmentSlice';
import levelReducer from './features/levels/levelSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    categories: categoreReducer,
    auth: authenticationReducer,
    schools: schoolReducer,
    departments: departmentReducer,
    levels: levelReducer
  },
});

export default store;

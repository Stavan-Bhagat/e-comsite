import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../../redux/Slice/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const toggleTheme = () => {
    dispatch(setThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
  };

  return <span onClick={toggleTheme}> {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>;
};

export default ThemeToggle;

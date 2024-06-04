import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import store from "./redux/store/store";
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Provider } from "react-redux";

// // Define the theme object with proper configuration
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // Customize as needed
//     },
//     secondary: {
//       main: '#dc004e', // Customize as needed
//     },
//   },
//   typography: {
//     // Example typography customization
//     fontFamily: 'Roboto, sans-serif',
//   },
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );

// console.log("Theme object: ", theme); // Debugging line

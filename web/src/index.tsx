import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Nesse arquivo eu peço para o React renderizar o componente "App" dentro da div de Id root 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// O app.tsx é como se fosse o arquivo main do NLW starter
import React from 'react';
import './App.css';

// JSX: Sintaxe de XML dentro do JavaScript (HTML usa a sintaxe do XML)

import Routes from './routes';

// Renderiza o routes.tsx
function App() {
  return (
    <Routes /> 
  );
}

export default App;

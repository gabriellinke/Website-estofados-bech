import React from 'react';
import './App.css';

import {AuthProvider} from './contexts/auth'

import Routes from './routes/index';

// Renderiza o routes.tsx
const App:React.FC = () => {
  return (
    <AuthProvider>
        <Routes /> 
    </AuthProvider>
  );
}

export default App;

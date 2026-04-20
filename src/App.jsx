import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <h1>Formulario con Hijos</h1>
    </div>
  );
}

export default App;

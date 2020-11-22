import './App.css';
import React, { useState  } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={(event) => setMessages([...messages, 'hello']) }>
          Reload
        </button>
        <ul>
          {
            messages.map((message) =>
              <li>{ message }</li>
            )
          }
        </ul>
        <br/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

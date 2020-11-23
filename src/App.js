import './App.css';
import React, { useState  } from 'react';

function getLatest(lastId) {
  const dummy = [
    {'id': 1, 'name': 'ujihisa', 'body': 'hello'},
    {'id': 2, 'name': 'ujihisa', 'body': 'world'},
  ]
  return dummy.filter((x) => lastId < x.id)
}

function App() {
  const [lastId, setLastId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={(event) => {
          const newMessages = getLatest(lastId)
          console.log(newMessages)
          if (newMessages.length) {
            setLastId(newMessages[newMessages.length - 1].id)
            setMessages([...messages, ...newMessages])
          }
        }}>
          Reload
        </button>
        <button onClick={(event) => setPendingMessages([...pendingMessages, {'name': 'you', 'body': 'hi'}]) }>
          Post hi
        </button>
        <ul>
          {
            messages.map((m) =>
              <li>{ m.name }: { m.body }</li>
            )
          }
          {
            pendingMessages.map((m) =>
              <li className="message-pending">{ m.name }: { m.body }</li>
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

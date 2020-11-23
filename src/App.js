import './App.css';
import React, { useState  } from 'react';

function getLatest(lastId) {
  const dummy = [
    {'id': 1, 'name': 'ujihisa', 'body': 'hello'},
    {'id': 2, 'name': 'ujihisa', 'body': 'world'},
  ]
  return dummy.filter((x) => lastId < x.id)
}

function postMessage(name, body) {
  console.log("ok")
}

function App() {
  const [name, setName] = useState("");
  const [lastId, setLastId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <button disabled={ loading } onClick={(event) => {
          if (loading)
            return
          setLoading(true);
          fetch('/')
            .then(
              (response) => {
                setLoading(false)
                console.log(response)
                if (!response.ok) {
                  alert(`Failed: ${response}`);
                  return;
                }
                // response.json().then((data) => {
                response.text().then((data) => {
                  // setData(data);
                  const newMessages = getLatest(lastId)
                  if (newMessages.length) {
                    setLastId(newMessages[newMessages.length - 1].id)
                    setMessages([...messages, ...newMessages])
                  }
                })
              }
            ).catch((err) => {
              setLoading(false)
              alert(err)
            })
        }}>
          { loading ? "Loading..." : "Reload" }
        </button>
        <form>
          <input type="text" placeholder="name" value={ name } onChange={(e) => setName(e.target.value) }></input>
          <input type="text" placeholder="body" value={ body } onChange={(e) => setBody(e.target.value) }></input>
          <input type="submit" value="Post" disabled={ !name.length || !body.length } onClick={(e) => {
            e.preventDefault()
            if (name.length && body.length) {
              postMessage(name, body)
              setBody('')
            }
          }}></input>
        </form>
        <ul>
          {
            messages.map((m) =>
              <li>{ m.name }: { m.body }</li>
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

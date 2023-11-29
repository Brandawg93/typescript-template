import React from 'react';
import logo from './logo.svg';
import './App.css';

const getTime = async () => {
  const response = await fetch('/api/time');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

function App() {
  const [time, setTime] = React.useState('');
  const [lastAccessed, setLastAccessed] = React.useState('');
  React.useEffect(() => {
    getTime()
      .then((res) => {
        setTime(res.time);
        setLastAccessed(res.lastAccessed);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Current Time:</label>
        <p>
          {new Date(time).toLocaleDateString()}&nbsp;{new Date(time).toLocaleTimeString()}
        </p>
        <label>Last Access Time:</label>
        <p>
          {new Date(lastAccessed).toLocaleDateString()}&nbsp;{new Date(lastAccessed).toLocaleTimeString()}
        </p>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import { useState } from 'react';
import LoginDialog from './components/login/LoginDialog';

function App() {
  const [serverAuthentication, setServerAuthentication] = useState(false);

  const handleServerAuthentication = (toggle) => {
    setServerAuthentication(toggle);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login Application</h2>
        <LoginDialog setServerAuthentication = {handleServerAuthentication}/>
        {serverAuthentication ? (
          <div>Ready to serve</div>
        ) : (
          <div>Server is not authenticated</div>)}
      </header>
    </div>
  );
}

export default App;

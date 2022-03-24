import './App.css';
import { useState } from 'react';
import LoginDialog from './components/login/LoginDialog';

function App() {
  const [authorization, setAuthorization] = useState(false);

  const handleAuthorization = (toggle) => {
    setAuthorization(toggle);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Login Application</h2>
        <LoginDialog updateAuth={handleAuthorization}/>
        {authorization ? (
          <div>Ready to Serve</div>
        ) : (
          <div>Not Authorized</div>)}
      </header>
    </div>
  );
}

export default App;

import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';

const KEY_NAME = 'loginData';

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem(KEY_NAME)
      ? JSON.parse(localStorage.getItem(KEY_NAME)): null);

  // Environment variable must be set to enable login.
  // Login button will stay as inactive if there is no correct client id.
  // The name of the env variable must start with REACT_APP, that is react specific.
  // It is wise to implement this differently in production.
  // With default id there will be Error 401: invalid_client.
  // With undefined, the button will be insensitive.
  const clientId = process.env.REACT_APP_SEMI_SECRET_CLIENT_ID || "xyzhijk1";
  console.log('clientId=', clientId);

  const handleFailure = (result) => {
    console.log("Failure " + JSON.stringify(result));
  };

  const handleLogin = async (data) => {
    const token = data.tokenId
    const tokenData = {token: token}
    setLoginData(tokenData);
    localStorage.setItem(KEY_NAME, tokenData);
  };

  const handleLogout = () => {
    localStorage.removeItem(KEY_NAME);
    setLoginData(null);
  };

  console.log(KEY_NAME + '=', loginData);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Login Application</h2>
        <div>
          {loginData ? (
            <div>
              <h3>Login as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google Account"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

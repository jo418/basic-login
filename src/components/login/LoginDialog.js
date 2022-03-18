import GoogleLogin from 'react-google-login';
import { useState } from 'react';

const KEY_NAME = 'loginData';

function LoginDialog(props) {
    const [loginData, setLoginData] =
        useState(console.log(localStorage.getItem(KEY_NAME))
            ? JSON.parse(localStorage.getItem(KEY_NAME)) : null);

    // Environment variable must be set to enable login.
    // Login button will stay as inactive if there is no correct client id.
    // The name of the env variable must start with REACT_APP, that is react specific.
    // It is wise to implement this differently in production.
    // With default id there will be Error 401: invalid_client.
    // With undefined, the button will be insensitive.
    const clientId = process.env.REACT_APP_SEMI_SECRET_CLIENT_ID || "xyzhijk1";

    const handleFailure = (result) => {
        console.log("Failure " + JSON.stringify(result));
    };

    const handleLogin = async (data) => {
        const token = data.tokenId
        const name = data.profileObj.name;
        const tokenData = {
            token: token,
            name: name
        }
        setLoginData(tokenData);
        localStorage.setItem(KEY_NAME, tokenData);
    };

    const handleLogout = () => {
        localStorage.removeItem(KEY_NAME);
        setLoginData(null);
    };

    //console.log(KEY_NAME + '=', loginData);
    return (<div>
        {loginData ? (
            <div>
                <h3>Logged in as {loginData.name}</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google Account"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
            </div>
        )}
    </div>);
}

export default LoginDialog;

import GoogleLogin from 'react-google-login';
import { useState } from 'react';

const KEY_NAME = 'loginData';

function LoginDialog(props) {
    const [loginData, setLoginData] = useState(console.log(localStorage.getItem(KEY_NAME))
        ? JSON.parse(localStorage.getItem(KEY_NAME)) : null);

    const {updateAuth} = props;
    const handleAuthorization = toggle => {
        updateAuth(toggle);
    }

    // Environment variable must be set to enable login.
    // Login button will stay as inactive if there is no correct client id.
    // The name of the env variable must start with REACT_APP, that is react specific.
    // It is wise to implement this differently in production.
    // With default id there will be Error 401: invalid_client.
    // With undefined, the button will be insensitive.
    const clientId = process.env.REACT_APP_PUBLIC_CLIENT_ID || "xyzhijk1";

    const handleFailure = (result) => {
        console.log("Failure " + JSON.stringify(result));
    };

    const handleLogin = async (data) => {
        //console.log('data=', data);
        const token = data.tokenId
        const profile = data.profileObj;
        let email = profile.email;
        const tokenData = {
            token: token,
            email: email
        }
        handleSendToServer(token);
        setLoginData(tokenData);
        localStorage.setItem(KEY_NAME, tokenData);
    };

    const handleSendToServer = (token) => {
        const url = process.env.REACT_APP_SERVER_URL;
        if (url !== undefined) {
            const body = { token: token };
            const args = makeArgs(body);
            fetch(url, args).then(response => {
                handleAuthorization(response.status === 200);
                return response.status;
            }).catch(error => {
                console.log('There was an error!', error);
            });
        }
    }

    const makeArgs = (body) => {
        return {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
    }

    const handleLogout = () => {
        localStorage.removeItem(KEY_NAME);
        setLoginData(null);
        handleAuthorization(false);
    };

    //console.log(KEY_NAME + '=', loginData);
    return (<div>
        {loginData ? (
            <div>
                <h3>Logged in as {loginData.email}</h3>
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
 
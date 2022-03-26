import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import { getData, setData, deleteData } from './loginData';

function LoginDialog(props) {
    const [loginData, setLoginData] = useState(getData());

    const { setServerAuthentication } = props;

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
        const token = data.tokenId
        const profile = data.profileObj;
        let email = profile.email;
        const tokenData = {
            token: token,
            email: email
        }
        setLoginData(tokenData);
        setData(tokenData);
        askServerValidation();
    };

    const askServerValidation = () => {
        const tokenData = getData();
        const token = tokenData.token;
        const url = process.env.REACT_APP_SERVER_URL;
        if (url !== undefined) {
            const body = { token: token };
            const args = makeArgs(body);
            fetch(url, args).then(response => {
                setServerAuthentication(response.status === 200);
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
        deleteData();
        setLoginData(null);
        setServerAuthentication(false);
    };

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

 
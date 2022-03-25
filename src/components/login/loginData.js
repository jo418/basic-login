const KEY_NAME = 'loginData';

export const getData = () => {
    const data = localStorage.getItem(KEY_NAME);
    if (data === undefined || data === null) {
        return null;
    }
    return JSON.parse(data);
};

export const setData = (tokenData) => {
    localStorage.setItem(KEY_NAME, JSON.stringify(tokenData));
};

export const deleteData = () => {
    localStorage.removeItem(KEY_NAME);
};

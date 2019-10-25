import axios from "axios";

const auth = async (email, password) => {
    const url = `${process.env.REACT_APP_BASE_API}/signin`;
    const body = {
        email,
        password,
    }
    try {
        const loginUser = await axios.post(url, body);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginUser['data']['token']['accessToken'];
        localStorage.setItem('test-token', loginUser['data']['token']['accessToken']);
        return loginUser;
    } catch (err) {
        return err;
    }
};

export {
    auth,
};
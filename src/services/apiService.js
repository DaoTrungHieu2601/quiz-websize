import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('image', image);
    data.append('role', role);
    return axios.post('api/v1/participant', data)
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('image', image);
    data.append('role', role);
    return axios.put('api/v1/participant', data)
}

export {
    postCreateNewUser, getAllUser, putUpdateUser
}
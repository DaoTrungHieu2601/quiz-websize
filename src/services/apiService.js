import axios from "../utils/axiosCustomize";

//them moi
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

//hien thi
const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

// sua
const putUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('image', image);
    data.append('role', role);
    return axios.put('api/v1/participant', data)
}

//xoa
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUsersPaginate = (page, LIMIT_USER) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${LIMIT_USER}`)
}

//login
const postLogin = (email, password) => {
    return axios.post('api/v1/login',
        {
            email: email,
            password: password,
            // delay: 3000
        }
    )
}

// register
const postRegister = (email, password, username) => {
    return axios.post(`/api/v1/register`, { email, password, username });
}

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) => {
    return axios.post('/api/v1/quiz-submit', { ...data })
}

export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser, getUsersPaginate, postLogin, postRegister, getQuizByUser,
    getDataQuiz, postSubmitQuiz
}
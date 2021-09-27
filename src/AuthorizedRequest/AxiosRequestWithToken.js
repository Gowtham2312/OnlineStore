import axios from 'axios'
function getAxiosWithTokenObj() {
//GET TOKEN
let token=localStorage.getItem("token")
//add token to headers of req object
let apiURL="http://localhost:5050"
let axiosReqWithToken=axios.create({
    baseURL: apiURL,
    headers:{
        Authorization: `Bearer ${token}`//take 1 white space after bearer
    }
})
return axiosReqWithToken
}
export default getAxiosWithTokenObj
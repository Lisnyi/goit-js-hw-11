import axios from "axios"

const KEY = '29392869-c497197ba4768b72814411005'
const BASE_URL = 'https://pixabay.com/api/'
const FILTER = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40'

function fetchImages (searchingValue) {
    return axios.get(`${BASE_URL}?key=${KEY}&q=${searchingValue}&${FILTER}`)
}

export { fetchImages }
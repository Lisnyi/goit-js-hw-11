import { fetchImages } from './js/fetchImages'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector("#search-form")
const submitBtn = document.querySelector("button")
const inputField = document.querySelector("input")
const gallery = document.querySelector(".gallery")

form.addEventListener("submit", startSearch)

function startSearch (e) {
    e.preventDefault()
}
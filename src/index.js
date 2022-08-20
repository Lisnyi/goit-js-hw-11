import { fetchImages } from './js/fetchImages'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

const form = document.querySelector("#search-form")
const inputField = document.querySelector("input")
const galleryRef = document.querySelector(".gallery")

form.addEventListener("submit", startSearch)

function startSearch (e) {
    e.preventDefault()
    let searchingValue = inputField.value.trim()
    if (searchingValue !== "") {
        fetchImages(searchingValue)
        .then(data => {
        if (data.data.totalHits === 0) {
            failSearching()
            return
        }
        successSearching(data.data.totalHits)
        renderPhotoCard(data.data.hits)})
    }
}

function successSearching (data) {
    Notify.success(`Hooray! We found ${data} images.`)
}

function failSearching () {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

function renderPhotoCard (data) {
    const markup = data
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => ` 
    <a href="${largeImageURL}">
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${downloads}
                </p>
            </div>
        </div>
    </a>
        `)
    .join("")

    galleryRef.innerHTML = markup;
}
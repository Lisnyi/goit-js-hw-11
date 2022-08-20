import { fetchImages } from './js/fetchImages'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

const form = document.querySelector("#search-form")
const inputField = document.querySelector("input")
const galleryRef = document.querySelector(".gallery")

let gallery = new SimpleLightbox('.gallery a')
let searchingValue = ''
let pageCounter = 1
let totalHits = 0

form.addEventListener ("submit", startSearch)
window.addEventListener ("scroll", loadMoreImagesByScroll)

async function startSearch (e) {
    e.preventDefault()
    searchingValue = inputField.value.trim()
    galleryRef.innerHTML = ""
    pageCounter = 1
    if (searchingValue !== "") {
        try {
            const data = await fetchImages(searchingValue, pageCounter.toString())
            if (data.data.totalHits === 0) {
                failSearching()
                return
            }
            totalHits = data.data.totalHits
            renderPhotoCard(data.data.hits)
            successSearching(data.data.totalHits)}
        catch (error) {
            console.log(error)
        }
    } 
}


function successSearching (data) {
    Notify.success(`Hooray! We found ${data} images.`)
}

function failSearching () {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

function endOfSearchResults () {
    Notify.failure("We're sorry, but you've reached the end of search results.")
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

    galleryRef.insertAdjacentHTML("beforeend", markup);
    gallery.refresh()
}

async function loadMoreImagesByScroll () {
    const documentRect = document.documentElement.getBoundingClientRect()
    if (documentRect.bottom <= document.documentElement.clientHeight) {
        pageCounter += 1
        if (totalHits <= galleryRef.childElementCount) {
            endOfSearchResults()
            return
        }
       try {
        const data = await fetchImages(searchingValue, pageCounter.toString())
        renderPhotoCard(data.data.hits)
       } catch (error) {
        console.log(error)
       }
    }
}
// Unsplash api
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];



const count = 2;
const apiKey = '82C_9Ivbwkhn80LRcUQQNxgGfjEHrjSLQjh-6mtc8js';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// get photos from unsplash api
const getPhotos = async() => {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
}

getPhotos()

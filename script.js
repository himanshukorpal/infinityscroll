// Unsplash api
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];



const count = 5;
const orientation = 'landscape'
const apiKey = '82C_9Ivbwkhn80LRcUQQNxgGfjEHrjSLQjh-6mtc8js';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&orientation=${orientation}`;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready =  true;
        loader.hidden = true;
    }
}

// Helper function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Display pictures fetched from unsplash, create elements and links and add to dom
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        })


        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        })

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put image inside <a> then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })

}




// get photos from unsplash api
const getPhotos = async() => {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
}


// Check to see if scrolling near bottom of page, to load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready ){
        ready = false;
        getPhotos();
    }
})

getPhotos()

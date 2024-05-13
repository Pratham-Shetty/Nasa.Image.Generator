const apiKey = 'aIpI1vVf5lrhCSmAh0KX5dJdh2rG0meKzKOqTSMf';
const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const imageContainer = document.getElementById('image-container');
const getImageButton = document.getElementById('get-image-btn');

function getImages() {
  const url = new URL(baseUrl);
  url.searchParams.set('sol', 1000); // Specify Sol 1000
  url.searchParams.set('api_key', apiKey);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      imageContainer.innerHTML = ''; // Clear previous image
      if (data.photos.length > 0) {
        const photo = data.photos[0]; // Get the first photo
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        const image = document.createElement('img');
        image.src = photo.img_src;
        imageItem.appendChild(image);
        imageContainer.appendChild(imageItem);
      } else {
        imageContainer.innerHTML = '<p>No images found for Sol 1000.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      imageContainer.innerHTML = '<p>An error occurred while fetching images.</p>';
    });
}

getImageButton.addEventListener('click', getImages);

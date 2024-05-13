const apiKey = 'aIpI1vVf5lrhCSmAh0KX5dJdh2rG0meKzKOqTSMf'; // Replace with your actual API key (not provided here for security)
const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=';
const imageContainer = document.getElementById('image-container');
const buttons = document.querySelectorAll('button');

function getImages(searchTerm) {
  const url = new URL(baseUrl);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('q', searchTerm);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      imageContainer.innerHTML = ''; // Clear previous images
      const collection = data.collection;
      if (collection.items.length > 0) {
        collection.items.forEach(item => {
          const imageItem = document.createElement('div');
          imageItem.classList.add('image-item');
          const image = document.createElement('img');
          image.src = item.href;
          imageItem.appendChild(image);
          imageContainer.appendChild(imageItem);
        });
      } else {
        imageContainer.innerHTML = '<p>No images found for this category.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      imageContainer.innerHTML = '<p>An error occurred while fetching images.</p>';
    });
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const searchTerm = button.textContent.toLowerCase();
    getImages(searchTerm);
  });
});

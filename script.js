const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.close');
const categorySelect = document.getElementById('category-select');

// Create an array to store all images
let allImages = [];

// Fetch images from Unsplash API and populate the gallery
async function fetchImages() {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random?count=12', {
            headers: {
                Authorization: 'Client-ID Zx-74F478rMTwZhUKGvkVRIBEkoeIgzon2zCHkJ1Xcs'
            }
        });

        console.log('res', response);

        allImages = response.data;
        renderImages(allImages);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Function to render images in the gallery
function renderImages(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        // js function to create new elements in dom (document object model)
        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description || 'Unsplash Image';
        img.className = 'thumbnail';
        gallery.appendChild(img);
    });
}

// Update the categorySelect event listener to fetch images based on category
categorySelect.addEventListener('change', async () => {
    const selectedCategory = categorySelect.value;
    try {
        let response;
        if (selectedCategory === 'all') {
            response = await axios.get('https://api.unsplash.com/photos/random?count=12', {
                headers: {
                    Authorization: 'Client-ID Zx-74F478rMTwZhUKGvkVRIBEkoeIgzon2zCHkJ1Xcs'
                }
            });
        } else {
            // using string literals `${}` to append variable in the string
            response = await axios.get(`https://api.unsplash.com/photos/random?count=12&query=${selectedCategory}`, {
                headers: {
                    Authorization: 'Client-ID Zx-74F478rMTwZhUKGvkVRIBEkoeIgzon2zCHkJ1Xcs'
                }
            });
        }

        const newImages = response.data;
        renderImages(newImages);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
});

// Open modal when a thumbnail is clicked
gallery.addEventListener('click', e => {
    console.log('e', e);
    if (e.target.classList.contains('thumbnail')) {
        modalContent.src = e.target.src;
        modal.style.display = 'flex';
    }
});

// Close modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Initialize the gallery and fetch images when the page loads
fetchImages();

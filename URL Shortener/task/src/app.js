// URL Shortener
document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.querySelector('#button-create');
    const input = document.querySelector('#input-url');
    const list = document.querySelector('#list-url');
    const errorMessage = document.querySelector('p');

    // Function to generate a random string
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Function to validate URL
    function isValidURL(string) {
        const regex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
        return regex.test(string);
    }

    // Event listener for button click
    button.addEventListener('click', () => {
        const url = input.value;

        // Check if URL is valid
        if (isValidURL(url)) {
            errorMessage.style.display = 'none';

            // Generate random string for short URL
            const randomString = generateRandomString(5);
            const shortUrl = `localhost/${randomString}`;

            // Create list item for short URL
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${url}" target="_blank">${shortUrl}</a> - Original URL: ${url}<span>Clicks: 0</span>`;
            list.appendChild(listItem);

            // Add event listener to short URL link
            const shortLink = listItem.querySelector('a');
            shortLink.addEventListener('click', () => {
                // Increment click count
                const clickCountSpan = listItem.querySelector('span');
                let clickCount = parseInt(clickCountSpan.textContent.split(': ')[1]);
                clickCount++;
                clickCountSpan.textContent = `Clicks: ${clickCount}`;
            });

            // Clear input field
            // input.value = '';
        } else {
            errorMessage.style.display = 'block';
        }
    });
});

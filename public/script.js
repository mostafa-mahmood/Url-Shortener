document.getElementById('shortenBtn').addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput').value;
    const apiUrl = 'http://localhost:3000/shorten';
    const resultDiv = document.getElementById('result');

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: urlInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.shortUrl) {
            resultDiv.innerHTML = `
                Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a> 
                <button class="copy-btn">Copy</button>
            `;

            
            document.querySelector('.copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(data.shortUrl);
            });
        } else {
            resultDiv.innerHTML = `Error: ${data.error || 'Could not shorten URL'}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Error: Could not shorten URL';
    });
});

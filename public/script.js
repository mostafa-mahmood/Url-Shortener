document.getElementById('shortenBtn').addEventListener('click', function() {
          const url = document.getElementById('urlInput').value;
      
          // Replace with your backend API endpoint
          const apiUrl = 'https://your-backend-api.com/shorten';
      
          fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: url }),
          })
          .then(response => response.json())
          .then(data => {
              const resultDiv = document.getElementById('result');
              if (data.shortUrl) {
                  resultDiv.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
              } else {
                  resultDiv.innerHTML = 'Error: Could not shorten URL';
              }
          })
          .catch(error => {
              console.error('Error:', error);
              document.getElementById('result').innerHTML = 'Error: Could not shorten URL';
          });
      });
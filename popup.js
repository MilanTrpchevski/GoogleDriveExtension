document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search');
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        const query = document.getElementById('query').value;
  
        chrome.runtime.sendMessage({action: 'search', query: query}, (response) => {
          if (response.status === 'success') {
            const results = document.getElementById('results');
            results.innerHTML = '';
            response.data.files.forEach(file => {
              const li = document.createElement('li');
              const link = document.createElement('a');
              const download = document.createElement('a');
              openingLink = `https://drive.google.com/file/d/${file.id}/view`;
              downloadLink = `https://drive.google.com/uc?id=${file.id}`;
              
              link.href = openingLink;
              link.textContent = file.name;
              link.target = '_blank';

              download.href = downloadLink;
              download.textContent = "Download";  
              link.target = '_blank';

              download.style.color = 'blue'; 
              download.style.fontWeight = 'bold';
              
              li.appendChild(link);
              li.appendChild(document.createTextNode(' - '))
              li.appendChild(download)

              results.appendChild(li);
            });
          } else {
            console.error('Error:', response.message);
          }
        });
      });
    } else {
      console.error('Search button not found');
    }
  });
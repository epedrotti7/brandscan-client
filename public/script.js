document.getElementById('brandForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const terms = document.getElementById('terms').value;
    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');
    const loadingElement = document.getElementById('loading');
    const modalElement = document.getElementById('modal');
    const closeModalElement = document.getElementById('closeModal');

    loadingElement.style.display = 'flex';

    try {
        const response = await fetch('https://brandscan-a6c6cb3c528e.herokuapp.com/search-ads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: terms, email: email }),
        });

        if (response.ok) {
            document.getElementById('terms').value = '';
            document.getElementById('email').value = '';

            setTimeout(() => {
                loadingElement.style.display = 'none';
                modalElement.style.display = 'flex';
            }, 1000);
        } else {
            const error = await response.json();
            loadingElement.style.display = 'none';
            messageElement.textContent = 'Erro: ' + (error.error || 'Algo deu errado');
            messageElement.style.color = 'red';
        }
    } catch (error) {
        loadingElement.style.display = 'none';
        messageElement.textContent = 'Erro: ' + error.message;
        messageElement.style.color = 'red';
    }

    closeModalElement.onclick = function() {
        modalElement.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modalElement) {
            modalElement.style.display = 'none';
        }
    };
});

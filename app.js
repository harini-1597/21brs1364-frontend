document.getElementById('submit-btn').addEventListener('click', function() {
    const inputField = document.getElementById('json-input');
    const errorMsg = document.getElementById('error-msg');
    const dropdownSection = document.getElementById('dropdown-section');
    const responseSection = document.getElementById('response-section');
    const responseContent = document.getElementById('response-content');
    
    errorMsg.textContent = '';
    responseContent.innerHTML = '';
    inputField.classList.remove('error');

    try {
        const inputData = JSON.parse(inputField.value);

        fetch('https://your-deployed-api-url/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
        .then(response => response.json())
        .then(data => {
            dropdownSection.classList.remove('hidden');
            responseSection.classList.remove('hidden');
            document.getElementById('response-filter').addEventListener('change', function() {
                const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
                responseContent.innerHTML = '';

                selectedOptions.forEach(option => {
                    const div = document.createElement('div');
                    div.innerHTML = `<strong>${option}:</strong> ${JSON.stringify(data[option])}`;
                    responseContent.appendChild(div);
                });
            });
        })
        .catch(error => {
            errorMsg.textContent = 'Error processing the request.';
        });
    } catch (e) {
        inputField.classList.add('error');
        errorMsg.textContent = 'Invalid JSON format.';
    }
});

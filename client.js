const PORT = process.env.PORT || 3000;

fetch(`http://localhost:${PORT}/param_test`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        param: 'test parameter'
    }),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
// Iport the Connect and URL packages
const connect = require('connect');
const url = require('url');

// Create a Connect server
const app = connect();

// Function to calculate the math operation
function calculate(method, x, y) {
  switch (method) {
    case 'add':
      return x + y;
    case 'subtract':
      return x - y;
    case 'multiply':
      return x * y;
    case 'divide':
      return y !== 0 ? x / y : 'Error: Division by zero';
    default:
      return 'Error: Invalid method';
  }
}

// Handle incoming request
app.use((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/') {
    // Send HTML response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
      <head>
        <title>Calculator</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <style>
          body {
            background-color: #34568B; /* Change background color */
            color: #F0F3BD; /* Change text color */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column; /* Adjust flex direction */
            height: 100vh;
            margin: 0;
          }

          h1 {
            color: #6C5B7B; /* Change heading color */
            text-align: center;
          }

          form {
            width: 300px;
          }
        </style>
      </head>
      <body>
         <h1 class="mb-4" style="color: white;">Parveen's Calculator</h1>
        <form action="/LAB2" method="get"> <!-- Change form action -->
        <div class="form-group">
          <label for="method">Method:</label>
          <select class="form-control" name="method">
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
            <option value="divide">Division</option>
          </select>
        </div>
          <div class="form-group">
            <label for="x">X:</label>
            <input type="text" class="form-control" name="x" required>
          </div>
          <div class="form-group">
            <label for="y">Y:</label>
            <input type="text" class="form-control" name="y" required>
          </div>
          <button type="submit" class="btn btn-success mx-auto d-block w-75">Calculate</button>
        </form>
      </body>
      </html>`); // Display calculator form
    res.end(); // End the response
  }

  // If the request is for the LAB2 path
  else if (pathname === '/LAB2') { // Adjust pathname
    // Extract parameters from query string
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    // Check if parameters are valid 
    if (!isNaN(x) && !isNaN(y)) {
      //Calculation
      let result;
      switch (method) {
        case 'add':
          result = x + y;
          break;
        case 'subtract':
          result = x - y;
          break;
        case 'multiply':
          result = x * y;
          break;
        case 'divide':
          result = y !== 0 ? x / y : 'Error: Division by zero, choose another number';
          break;
        default:
          result = 'Error: Invalid method';
      }

      // Send the result as response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`${x} ${method} ${y} = ${result}`);
      res.end();
    } else {
      // Send an error response for invalid numbers
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('400 Bad Request: Invalid numbers');
      res.end();
    }
  }

  // of the request is for an unknown path set 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

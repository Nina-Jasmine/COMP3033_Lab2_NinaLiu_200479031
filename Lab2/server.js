 // Link to the connect and url packages
const connect = require("connect");
const { json } = require("stream/consumers");

const url = require("url");

//create app object
 
const app = connect();

 // Handle /lab2 requests
  function Lab2Handler(req, res, next) {
    const urlParts = url.parse(req.url, true);
    const { method, x, y } = urlParts.query;
    const numX = parseFloat(x);
    const numY = parseFloat(y)
    let result;     

switch (method) {
     case "add":
         result = numX + numY;
         break;
        case "subtract":
            result = numX - numY;
            break;
        case "multiply":
            result = numX * numY;
            break;
        case "divide":
            result = numY !== 0 ? numX / numY : 'Error: divide by zero';
            break;
        default:
            result = "Unknown method, please use add, subtract, multiply, or divide.";
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        json({
            "x": numX,
            "y": numY,
            "operation": method,
            "result": String(result)
        })    
     );
  } 



app.use("lab2", Lab2Handler);

// Start the server on port 3000
const PORT = 3000;      
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});     
// To run the server, use the command: node server.js
// Sample Inputs:
// - URL: http://localhost:3000/lab2?method=add&x=16&y=4
// - URL: http://localhost:3000/lab2?method=subtract&x=16&y=4
// - URL: http://localhost:3000/lab2?method=multiply&x=16&y=4
// - URL: http://localhost:3000/lab2?method=divide&x=16&y=4

 
 
 
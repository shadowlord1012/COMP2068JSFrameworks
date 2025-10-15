const http = require("http");
const connect = require("connect");
const url = require("url");

const app = connect();

//Simply calculator function
function calculator(givenParams){

    //gets what methods is chosen
    var methodChosen = givenParams.method;

    //converts the string to a number using the Number function
    var x = Number(givenParams.x);
    var y = Number(givenParams.y);

    //returns what the value will be dependin on the chosen method
    //it will default to and error if there is no valid method chosen
    switch(methodChosen){
        case 'add':
            return `Method: ${methodChosen}. ${x} + ${y} = ${x+y}`;
        case 'subtract':
            return `Method: ${methodChosen}. ${x} - ${y} = ${x-y}`;
        case 'multiply':
            return `Method: ${methodChosen}. ${x} * ${y} = ${x*y}`;
        case 'divide':
            if(y <= 0){
                return "Cannot divide by 0";
            }
            else {
                return `Method: ${methodChosen}. ${x} / ${y} = ${x/y}`;
            }
        default:
            return 'error invalid method';
    }
}

app.use((req,res,next) => {

    //Parse the url to get the parameters
    const parsedUrl = url.parse(req.url, true);

    //Access the parameters
    const queryParams = parsedUrl.query;

    //displays what the final value is from the parameters
    res.end(calculator(queryParams));
});

//Add a 404 fallback, that catchs any other urls except for the ones that are needed
app.use((req,res) => {
    res.writeHead(404, {"Content-Type":"text/plain"});
    res.end("Page Not Found");
});

//the server is listening
app.listen(3000, () => {
    console.log("connect serve listening on port 3000");
});
const http = require('http');
const url = require('url');

const mock = [
    {id: "fileid1", file: "fileNr1"},
    {id: "fileid2", file: "fileNr2"},
    {id: "fileid9001", file: "fileNr9001"},
]

const requestListener = function (req, res) {
    if (req.url.includes("/api/files/batch")) {
        const params = url.parse(req.url,true).query;
        const files = mock.filter(file => params['ids[]']?.includes(file.id))

        console.log("Requested files: ", params);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(files))
        res.end()
    } else {
        res.writeHead(404).end("Not Found!")
    }
}

const server = http.createServer(requestListener);

console.log("Running server on port 8000!");

server.listen(8000);
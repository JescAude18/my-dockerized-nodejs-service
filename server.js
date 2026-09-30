const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!');
    } else if (req.url === '/secret') {
        if(req.headers.authorization) {
            const auth = req.headers.authorization;
            const [type, credentials] = auth.split(' ');
            if (type !== "Basic") {
                res.writeHead(401, { 'Content-Type': 'text/plain', 'WWW-Authenticate': 'Basic'});
                res.end('Authentication not supported!');
            } else {
                const decoded = Buffer.from(credentials, 'base64').toString('utf8');
                const [username, password] = decoded.split(':');
                if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(process.env.SECRET_MESSAGE);
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/plain', 'WWW-Authenticate': 'Basic' });
                    res.end('Unauthorized!');
                }
            }
        } else {
            res.writeHead(401, { 'Content-Type': 'text/plain', 'WWW-Authenticate': 'Basic' });
            res.end('Authentication not supported!')
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found!');
    }
});

server.listen(3000);

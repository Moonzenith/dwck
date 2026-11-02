const http = require('http');
const url = require('url');

const port = 3000;

// Local-only authentication experiment with fictional data, not production auth.
const users = [{ id: 1, email: 'demo@example.com', password: 'demo-only' }];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );

  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/authenticate') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { email, password } = JSON.parse(body);

      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        console.log('authenticated');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // Keep the fixture's password out of responses as well as application logs.
        res.end(
          JSON.stringify({
            message: 'Authentication successful',
            user: { id: user.id, email: user.email },
            token: 'demo-token',
          }),
        );
      } else {
        console.log('not authenticated');
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Authentication failed' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
});

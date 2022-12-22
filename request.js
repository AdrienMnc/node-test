const http = require("http");

const server = http.createServer((req, res) => {
  console.log("test");
  const path = req.url; // Chemin
  const method = req.method; // Verbe HTTP
  const body = []; // Corps de la requête

  if (path === "/units" && method === "GET") {
    const responseBody = JSON.stringify({
      temperature: ["celcius", "farenheit"],
    });
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": responseBody.length,
    });
    res.end(responseBody);
  }

  if (path === "/convert/temperature" && method === "POST") {
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const requestBody = JSON.parse(Buffer.concat(body).toString());
      console.log(requestBody);
    });
  }
});

const port = process.env.PORT || 3000;
server.listen(port);

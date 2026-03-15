// Minimal static file server for Railway production
const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4321;
const DIST = path.join(__dirname, "dist");

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
};

http.createServer((req, res) => {
  let p = path.join(DIST, req.url === "/" ? "/index.html" : req.url);
  if (!fs.existsSync(p)) p = path.join(DIST, req.url.replace(/\/$/, ""), "index.html");
  if (!fs.existsSync(p)) p = path.join(DIST, "404.html");
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end("Not found"); }
  const ext = path.extname(p);
  res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
  fs.createReadStream(p).pipe(res);
}).listen(PORT, () => console.log(`Firefly Digital site running on :${PORT}`));

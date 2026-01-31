const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = 5500;
const ROOT = __dirname;
const HF_MODEL = "stabilityai/stable-diffusion-2";

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  });
};

const handleGenerate = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { inputs } = JSON.parse(body || "{}");
      const apiKey = process.env.HF_API_KEY || req.headers["x-hf-key"] || "";
      if (!apiKey) {
        send(res, 401, JSON.stringify({ error: "Missing HF_API_KEY on server" }), { "Content-Type": "application/json" });
        return;
      }
      const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        body: JSON.stringify({ inputs, options: { wait_for_model: true } }),
      });

      if (!response.ok) {
        const text = await response.text();
        send(res, response.status, text || "AI generation failed", { "Content-Type": "text/plain" });
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      send(res, 200, Buffer.from(arrayBuffer), { "Content-Type": "image/png" });
    } catch (error) {
      send(res, 500, JSON.stringify({ error: error.message }), { "Content-Type": "application/json" });
    }
  });
};

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  if (requestUrl.pathname === "/api/generate" && req.method === "POST") {
    handleGenerate(req, res);
    return;
  }

  let filePath = path.join(ROOT, requestUrl.pathname === "/" ? "creation outfique.html" : requestUrl.pathname);
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }
    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    serveFile(filePath, res);
  });
});

server.listen(PORT, () => {
  console.log(`Outfique server running on http://127.0.0.1:${PORT}`);
});

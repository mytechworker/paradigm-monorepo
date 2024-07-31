const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = process.env.PORT || 80;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  key: fs?.readFileSync("backend/certificates/privkey.pem"),
  cert: fs?.readFileSync("backend/certificates/cert.pem"),
  ca: fs?.readFileSync(
    "backend/certificates/paradigmresear_ch.ca-bundle",
    "utf8"
  ),
};
app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("started server on url: https://localhost:" + port);
  });
});

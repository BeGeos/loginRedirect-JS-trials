const express = require("express");
const path = require("path");

app = express();

// Static files middleware
app.use(express.static("public"));

// Body encoder/decoder
app.use(express.urlencoded({ extended: true }));

// HTML engine to serve html files
app.engine("html", require("ejs").renderFile);

// Parsing url Redirect link for login
function parseURL(url) {
  return url.replace(/\//g, "%");
}

function redirectParser(link) {
  return link.replace(/%/g, "/");
}

// Main Routes

app.get("/", (req, res) => {
  res.render("index.html", { url: parseURL(req.url) });
});

app.get("/about", (req, res) => {
  res.render("about.html", { url: parseURL(req.url) });
});

app.get("/complex/url/casual", (req, res) => {
  res.render("complex.html", { url: parseURL(req.url) });
});

app.get("/login", (req, res) => {
  // console.log(req.headers.referer);
  res.render("login.html");
});

app.post("/login", (req, res) => {
  // Verify user
  let user = req.body.username;
  let password = req.body.password;

  let redirectLink;

  if (req.query.ref) {
    redirectLink = redirectParser(req.query.ref);
  } else {
    redirectLink = "/";
  }

  // If login creadentials are valid
  res.redirect(redirectLink);
});

app.listen(3000, () => console.log("Listening on port 3000"));

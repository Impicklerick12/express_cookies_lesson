const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { signedCookies } = require('cookie-parser');

const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser("Coding is fun!"));

app.get('/', (req, res) => {

    // Log cookies received on server (unsigned)
    console.log("Cookies:", req.cookies);
    let cookies = req.cookies;
    // Get the cookie names - these will be the keys from the hash returned by req.cookies
    let cookieNames = Object.keys(cookies);
    console.log("Cookie names:", cookieNames);

    console.log("Signed Cookies:", req.signedCookies);
    // Get the signed cookie names - these will be the keys
    let signedCookieNames = Object.keys(req.signedCookies);
    console.log("Signed Cookie names:", signedCookieNames);

    // Send a cookie from the server if we havent sent one before
    if (!cookieNames.includes("serverCookie")) {
        res.cookie("serverCookie", "pistachio", {
            signed: true
        });
    } 
  
    // Send cookie names back to client
    res.setHeader("Content-type", "text/html");
    if (cookieNames.length > 0) {
        res.send(`On server have cookies for: ${cookieNames} and signed: ${signedCookieNames}`);
    } else {
        res.send("Got no cookies!");
    }
  
})

app.get('/clearCookie', (req, res) => {
    console.log("In clearCookie got cookies: ", req.cookies);
    console.log("Got query string ", req.query);

    let cookieName = req.query["name"];
    res.clearCookie(cookieName);
    res.send(`Cleared cookie: ${cookieName}`);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

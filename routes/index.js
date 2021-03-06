const express = require('express');
const router = express.Router();
const md5 = require('md5');
const fetch = require("node-fetch");
const app = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'URL Shortner'
  });
});

router.post('/', function (req, res, next) {
  let longURL = req.body.longURL;
  let shorten = md5(longURL).substring(0, 6);
  // save shorten urls in a-z,0-9 collections, make search faster
  let section = shorten.substring(0, 1);

  //-------check if key exist-------------

  fetch(req.protocol + "://" + req.hostname + ":" + app.jsonServerPort + "/" + section + '/?short=' + shorten, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(json => json.json()).then(data => {
    // if key exixt
    if (data.length !== 0) {
      // if key exist but long doesn't match, creat new key
      if (data[0].long !== longURL) {
        insertRecord(res, req, md5(shorten + longURL), longURL, req.protocol, req.hostname, section)
      } else {
        res.render('index', {
          title: 'URL Shortner',
          shortResult: req.protocol + "://" + req.get('host') + '/' + shorten
        });
      }
    } else {
      //--------if key doesn't exist, insert to database----------------------
      insertRecord(res, req, shorten, longURL, req.protocol, req.hostname, section)
    }
  });
});
const date = new Date();
let insertRecord = (res, req, short, long, portocol, hostname, section) => {

  fetch(portocol + "://" + hostname + ":" + app.jsonServerPort + "/" + section, {
    method: "POST",
    body: JSON.stringify({
      expire: date.setDate(date.getDate() + 7), // set expire date
      short: short,
      long: long
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  res.render('index', {
    title: 'URL Shortner',
    shortResult: req.protocol + "://" + req.get('host') + '/' + short
  });
};
router.get('/favicon.ico', (req, res) => res.status(204));
//---------receive short url then redirect to long-------------------------------------
router.get('/:short', function (req, res, next) {
  let shortParams = req.params.short;
  let section = shortParams.substring(0, 1);

  fetch(req.protocol + "://" + req.hostname + ":" + app.jsonServerPort + "/" + section + '/?short=' + shortParams).then(json => json.json()).then(data => (
    fetch(req.protocol + "://" + req.hostname + ":" + app.jsonServerPort + "/" + section + '/' + data[0].id, {
      method: "PUT",
      body: JSON.stringify({
        expire: date.setDate(date.getDate() + 7), // update expire date
        short: data[0].short,
        long: data[0].long
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  )).then(json => json.json()).then(data => (
    res.redirect(data.long)));
});

module.exports = router;
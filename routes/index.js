var express = require('express');
var router = express.Router();
var md5 = require('md5');
var fetch = require("node-fetch");


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
  fetch(req.protocol + "://" + req.hostname + ':3001/' + section + '/?short=' + shorten, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(json => json.json()).then(data => {
    // if key exixt
    if (data.length !== 0) {
      // if key exist but long doesn't match, creat new key
      if (data[0].long !== longURL) {
        insertRecord(res, req, md5(shorten + Date.now()), longURL, req.protocol, req.hostname, section)
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

let insertRecord = (res, req, short, long, portocol, hostname, section) => {
  const date = new Date();
  fetch(portocol + "://" + hostname + ':3001/' + section, {
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

router.get('/:short', function (req, res, next) {
  let shortParams = req.params.short;
  let section = shortParams.substring(0, 1);
  fetch(req.protocol + "://" + req.hostname + ':3001/' + section + '/?short=' + shortParams, {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(json => json.json()).then(data => (
    data = data[0].long.replace(/"/g, ""),
    res.redirect(data)));
});

module.exports = router;
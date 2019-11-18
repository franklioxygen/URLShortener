# URL Shortener

![Alt text](/screenshot.png "screenshot")

#### automated test with mocha:

npm test

#### start service command:

npm start

#### view in:

http://localhost:3000/

This is an url shortener implementation of ExpressJS.
JSON-server is the backend database and provides API.
It convert long url to short url with MD5 encoding, cutted first 6 chatacters as key, set 7 days as expire days.  
Once a long url post to backend, the backend will check if it is in database.

- If exists, check this key's long url in databse crashes with new long url or not.
  - If crashes, creat new key for crashed new long url. (add timestamp to shorturl then do md5)
  - If no crash, return existing long url.
- If not exists, insert new key value pair.
- URL RegExp validation is in frontend by javascript


# URL Shortener


![Alt text](/screenshot.png "screenshot")

  
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


# STORD URL Shortener Exercise

The goal of this exercise is to create a URL shortener web application in the same vein as [bitly](https://bitly.com/), [TinyURL](https://tinyurl.com/), or the now defunct [Google URL Shortener](https://goo.gl/). It is intentionally open-ended and you are welcome to implement your solution using the language and tech stack of your choice, but the core functionality of the application should be expressed through your own original code. This is your opportunity to show off your design and development strengths to our engineering team.

## Application Requirements

- When navigating to the root path (e.g. `http://localhost:8080/`) of the app in a browser a user should be presented with a form that allows them to paste in a (presumably long) URL (e.g. `https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8`).
- When a user submits the form they should be presented with a simplified URL of the form `http://{domain}/{slug}` (e.g. `http://localhost:8080/h40Xg2`). The format and method of generation of the slug is up to your discretion.
- When a user navigates to a shortened URL that they have been provided by the app (e.g. `http://localhost:8080/h40Xg2`) they should be redirected to the original URL that yielded that short URL (e.g `https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8`).

## Deliverable

- Fork or clone this repository
- Implement your solution, including test cases for your application code.
- We will execute your code using the `make` targets specified in `Makefile`. Edit the contents of `Makefile` to provide an interface for running and testing your application.
- Include any other notes for our engineering team that you would like regarding your approach, assumptions you have made, how to run your code, how to use your application, etc in a file named `notes.txt`.
- E-mail the point of contact that sent you this exercise and include either a link to a hosted repository (GitHub, GitLab, etc) or a compressed archive (.zip, .tar.gz) containing your solution and `Makefile`.

# Prupose
This project is a result of a 3 hours onsite interview. The main requirements of the project are:
- 1: Extract the following information from a given URL:
a. Screenshot
b. IP address
c. Source and destination URLs (in case of redirection)
- 2: In addition to data gathered in Stage 1, gather:
a. ASN information for IP address
b. SSL Certificate details in case of HTTPS site
- 3: In addition to Stage 2, gather:
a. Page source
b. Natural language content extracted from the source.

# How I approached the task
Essentially it requires a web crawler and implement the above listed features. So I went to Git Hub and did a quick search on `web crawler`, `puppeteer`, and `node`. After quickly reading a few projects's `ReadMe` files, I quickly settled on using [this repo](https://github.com/ReedD/crawler) as a base to drive the exploring process.

My high-level ideas are:
1. Please the base project and learn how to use Puppeteer to crawl the web.
2. based on the store crawler Page source functionality out of the box provided by the base project, we can add other required features. 

Here are the actual changes I made within the interview process that made a somewhat demo-able project:
1. since I installed a new version of Mongodb, the existing crawler script does not run.
Resolution: I switched out the old `mongodb` package, and installed the `mongoose` package to make the script able to run.
2. After 1, I found out that when providing a crawling URL, the script crashed with the error message "Page Crashed". After a few googling, it seems it related to insufficient memory and how the `puppeteer` launched the browser.
Resolution:
a. checked local memory, and stopped a few memory hogs. It still does not resolve the issue.
b. tweak the puppeteer launch parameter to make it `headless` and a few other command lines `args` and the script is finally able to run and I can observe pages written to configured local mongo db `pages` collection.
3. installed `express` and add a `app.js` server as the base API server to receive the `/v1/startcrawler` call to start crawling from the given {startUrl: "url"} JSON object in the request body. In the handler, call the based projects crawler script to do the actual job.
4. made a change to the `crawler.js` file to add the `take screenshot` functions by adding a few lines right after the page is loaded(need more code here to actually check the page load result, i.e., we only take screenshot after page actually loaded. Existing code does not have enough guide to check conditions). Also, there is an issue in the store screenshot functionality(reporting not being able to find the file directory, no time to further debug), 
5. added ip lookup and store(console log only!) skeleton code. Note, existing code is NOT actually saved to db, just use the console log to demo we can.
6. Add the code to retrieve ANS info given an ip.  I used an existing ipinfo.io website to get the ANS by passing ip to the end of the url. Note, existing code currently only prints out the whole response from the service, not extracting the `data` object that only contains ANS data yet. Also, not sure if this is a free service or not, from the short description I read, it seems like you might need to provide an Auth token in case of commercial access to the service. Otherwise, I guess free access will be rate-limited.
7. Also add the certificate info code to the `crawler.js` code, by console log out the `securityDetails` object which should be enough for all the certificate-related info.

The above 7 or 8 changes are all I can squeeze in the 3 hours of onsite interview coding time.  One feature I did miss is the extraction of all the language out of the returned page. I guess either some package in `puppeteer` or some other third party should provide  that functionality. I only have 5 minutes left before the deadline, so I do not pursue that last un-investigated feature.

# How to run the system
1. clone to your local.
2. run `npm ci` to install the needed package.
3. at the project base directory run `npm run dev`. This will invoke the `nodemon` and start the web server.
4. use `curl` of any HTTP client tools to interact with the endpoint and see the console as well as output for what the system is doing or trying to do.

# Postmortem summary and some loose ends and future improvements.
1. Spent too much time on the research Page crash issue. At a hinder sight, should check whether the existing code launches the browser in headless mode first.
2. The actual storage to db part of a few features is not actually implemented, only  using console logs to make a point that we can.
3. currently I call the script from the web server code using the command-line and redirect output to the output stream and error stream. This is okay for a demo, should consider implementing a function inside the crawler to do it. This is the fastest way to use the existing crawler project, but NOT the right way to integrate it into our project, especially if some error happens or there is a vast amount of output to the output stream.
4. As I said, this is an interview demo project. So I just found some crawler as fast as possible for me to use as a base to demo something. I realized that web crawling is a big and well-investigated field. If we need to build a true product on the crawler, we need to do more research on available open-source crawlers as currently, a lot of data-rich websites intentionally devise technique to turn away crawler bots.
5. For more features of the underlying crawler implementation, please refer to the original repo [here](https://github.com/ReedD/crawler). And you can change the code to play more, I personally have not even finished reading the original README.md file due to time constraints.

# License Claim.
The purpose of this write-up is to submit it to the company I interviewed for review. So this writeup as well as all the code I contributed to the project is free for anybody to use on the basis of AS IS and with no guarantee of any kind.   I realized that the original project does not contain any license file, so if you want to use the software in any other way you need to contact the original author(s) to acquire a proper license if necessary. Use it at your own risk. 

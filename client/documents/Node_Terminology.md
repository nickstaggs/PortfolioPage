One of the hardest things to do is being able to talk about something without knowing any of the terminology that it uses. So I am going to walk though some basic Node.js terms and phrases, give their definition and maybe include a code example or two where appropriate. I am going to start out with the higher level terminology in the first sections of this article and then delve deeper and deeper in each following section.
### Event-driven, Non-blocking I/O
Node.js' catch phrase and selling point is that it uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

The first part is fairly self explanatory, Node.js sleeps until an event occurs. When an event occurs a handler for that specific event, if there is one, is invoked. Node.js being event driven is a product of it being built upon the V8 JavaScript engine which also resides in the Google Chrome Browser. Since web browsers are inherently event-driven, i.e. mouse clicks and button presses, Node.js receives this characteristic. However, in the context of a web server the events are requests made to the server. In general, this is an HTTP request such as a GET, PUT, PATCH, POST, or DELETE.

The second part is a little less obvious but still relatively straight forward. Non-blocking I/O means that requests, such as to disk and the network, being fulfilled by the server do not block other parts of the code from executing and do not block other requests being made. In other words Node.js is asynchronous. Pieces of code may finish executing in an order other than the one they were coded in. Here is an example using the file system module in Node.js:
```javascript
const fs = require('fs');

// prints contents of file1
fs.readFile('~/file1.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("this happens second");

// Output:
// this happens second
// (contents of file1.txt)
```
One might assume that the contents of file1 would be printed out before "this happens second." However, most, if not all of the time "this happens second" would be printed first. This because Node.js would see the request to read the contents of file1, put the request into the libuv event loop to be processed by the operating system(OS), and then continue to execute the rest of the code while the OS fetches the file and reads it. This piece of code also does not block other requests being made to the server such as a query to a database. This bit of code also demonstrates Node's error-first callback convention which will be explained later on.
### V8 JavaScript Engine
The V8 JavaScript engine is what compiles the JavaScript in Node applications into machine language, such as x86, ARM and MIPS, so it can executed by the machine that the Node application is running on. This component of Node can be switched out with any of the other JavaScript engines and has been in a couple of forked projects of Node such as SpiderNode which is Node built with Mozilla's JavaScript engine SpiderMonkey.
### libuv
libuv is a library that Node uses to provide access to all of the functions of the underlying OS such as file system operations, and network connections. It does all of this asynchronously via its event loop which is the central part of libuv. The event loop establishes I/O content for all I/O operations which are performed on non-blocking sockets which are polled using the best polling mechanism on the given platform such as epoll on Linux or IOCP on Windows.
### Error-first Callback
### libuv Event Loop
### NPM

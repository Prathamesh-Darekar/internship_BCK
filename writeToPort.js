// WORKER THREAD TO WRITE TO PORT - worker thread 2
let readFromPort = new Worker("readFromPort.js");
self.onmessage = (message) => {
  console.log(message.data);
  readFromPort.postMessage("read from port");
};

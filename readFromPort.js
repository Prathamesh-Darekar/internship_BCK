// WORKER THREAD TO READ DATA FROM PORT - worker thread 3
let writeToFile = new Worker("writeToFile.js");
self.onmessage = (message) => {
  console.log(message.data);
  writeToFile.postMessage("write to file");
};

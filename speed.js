let intervalId;
let counter = 0;
let bytes;
self.onmessage = (e) => {
  if (e.data.type == "start") {
    intervalId = setInterval(() => {
      counter++;
    }, 1000);
    bytes = e.data.fileLength;
  }
  if (e.data.type == "finish") {
    clearInterval(intervalId);
    console.log(`Task completed in ${counter} seconds`);
    console.log(`Speed : ${(bytes / counter).toFixed(1)} bytes/sec`);
  }
};

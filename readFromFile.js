//  THIS IS A MAIN THREAD USED FOR READING DATA FROM FILE - worker thread 1
async function startProcess() {
  let writeToPort = new Worker("writeToPort.js");
  console.log("Read from file");
  writeToPort.postMessage("write to port");
}

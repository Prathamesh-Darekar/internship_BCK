//  THIS IS A MAIN THREAD USED FOR READING DATA FROM FILE - worker thread 1
let writeToPort = new Worker("writeToPort.js");

if (window.isSecureContext) console.log("secure");

const sharedMemory = new SharedArrayBuffer(1000);

const sharedArray = new Uint8Array(sharedMemory);

writeToPort.postMessage(sharedMemory);

sharedarray[0]  = encoder.encode("000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000111110000011111000001111100000");


async function startProcess() {
  console.log("Read from file");

  const [fileHandler] = await window.showOpenFilePicker();
  const file = await fileHandler.getFile();
  writeToPort.postMessage("write to port");
}

if ("serial" in navigator) {
  console.log("Ready to go!");
} else {
  console.log("Your browser does not support Web Serial API.");
}

let port;
let dataLength = 0;
let chunkSize = 8;
const worker1 = new Worker("fileReader.js");
const worker2 = new Worker("writeToFile.js");
const worker3 = new Worker("speed.js");

async function createFileObjects() {
  let [fileHandle1] = await window.showOpenFilePicker();
  let file1 = await fileHandle1.getFile();
  dataLength = file1.size;
  let fileHandle2 = await window.showSaveFilePicker({
    suggestedName: `newFile.${file1.name.split(".").pop()}`,
    types: [],
  });
  worker3.postMessage({ type: "start", fileLength: dataLength });
  worker1.postMessage({ type: "read", readFile: file1 });
  worker2.postMessage({
    type: "init",
    writeFileHandle: fileHandle2,
    fileLength: file1.size,
  });
}

worker1.onmessage = (e) => {
  let { type, chunk } = e.data;
  if (type == "portOperation") {
    let arr = new Uint8Array(chunk);
    writeToPort(arr);
  }
};
worker2.onmessage = (e) => {
  console.log(e.data.type);
  if (e.data.type == "finish") {
    worker3.postMessage({ type: "finish" });
  }
};

function startOperation() {
  createFileObjects();
}

async function SelectPort() {
  try {
    port = await navigator.serial.requestPort();
    console.log("Port has been connected to the application");
  } catch (e) {
    alert("Please select a Port");
    console.log(
      `Encountered error while connecting to the port : ${e.message} `
    );
  }
}

async function openPort() {
  try {
    await port.open({ baudRate: 9600 });
    console.log(`Port has been opened for further operations `);
  } catch (e) {
    console.log(`Encountered error while opening the port : ${e.message} `);
  }
}

async function writeToPort(fileData) {
  let writer = await port.writable.getWriter();
  try {
    let start = 0;
    let end = chunkSize;
    let chunk;
    let binaryData = fileData;
    dataLength = binaryData.length;
    while (start < dataLength) {
      chunk = binaryData.slice(start, end);
      await writer.write(chunk);
      start = end;
      end = end + chunkSize;
      console.log("chunk written to port");
      readFromPort(chunk.length);
    }
    console.log("Data written into the port");
  } catch (e) {
    console.log(`Encountered error while writing to the port : ${e.message} `);
  } finally {
    writer.releaseLock();
  }
}

async function readFromPort(chunkLength) {
  let reader = await port.readable.getReader();
  try {
    while (chunkLength > 0) {
      let { value } = await reader.read();
      console.log("reading from port");
      worker2.postMessage({ type: "write", chunk: value });
      chunkLength -= value.length;
    }
  } catch (e) {
    console.log(
      `Encountered error while reading from the port : ${e.message} `
    );
  } finally {
    reader.releaseLock();
    console.log("reader released");
  }
}

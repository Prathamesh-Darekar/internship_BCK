let writer;
let fileLength;
onmessage = async (e) => {
  if (e.data.type == "init") {
    fileLength = e.data.fileLength;
    let fileHandle = e.data.writeFileHandle;
    writer = await fileHandle.createWritable();
    console.log("writer initialised");
  } else if (e.data.type == "write") {
    if (writer) {
      let { chunk } = e.data;
      console.log("writing");
      await writer.write(chunk);
      fileLength -= chunk.length;
    }
    if (fileLength <= 0) {
      console.log("Task Completed Successfully");
      writer.close();
      postMessage({ type: "finish" });
    }
  }
};

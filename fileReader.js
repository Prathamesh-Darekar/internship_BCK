function delay() {
  return new Promise((resolve) => setTimeout(resolve, 100));
}

onmessage = async (e) => {
  let { type, readFile } = e.data;
  if (type == "read") {
    const reader = new FileReader();
    let file = readFile;
    let chunksize = 8;
    let offset = 0;
    while (offset < file.size) {
      let end = Math.min(file.size, offset + chunksize);
      chunk = file.slice(offset, end);
      offset = end;
      reader.onload = async (e) => {
        console.log("reading from file");
        let arrayBuffer = e.target.result;
        postMessage({ type: "portOperation", chunk: arrayBuffer });
      };
      await delay();
      reader.readAsArrayBuffer(chunk);
    }
  }
};

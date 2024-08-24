async function openFile() {
    let inputData,outputData;
    let [fileHandle1]=await window.showOpenFilePicker()
    let file1=await fileHandle1.getFile();
    const reader = new FileReader();
    reader.onload = () => {
        let file1Data=new Uint8Array(reader.result)
        // console.log(file1Data);  
        inputData=file1Data;             
    };
        reader.onerror = () => {
        console.error('Error reading file:', reader.error);
    };
    reader.readAsArrayBuffer(file1);
    // console.log(file1);      

    let [fileHandle2]=await window.showOpenFilePicker()
    let file2=await fileHandle2.getFile();
    const reader2 = new FileReader();
    reader2.onload = () => {
        let fileData=new Uint8Array(reader2.result)
        // console.log(fileData); 
        outputData=fileData; 
        // console.log(outputData) 
        compareFiles(inputData,outputData)
          
    };
        reader.onerror = () => {
        console.error('Error reading file:', reader2.error);
    };
    reader2.readAsArrayBuffer(file2);
    // console.log(file2);     
} 

function compareFiles(file1,file2){
console.log(file1);
console.log(file2)
file1.every((value,index)=>{
    if(value!==file2[index]){
        console.log("Flipped")
        return;
    }
})
}

function start(){
    openFile();
}
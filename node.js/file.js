// import {readFile} from 'node:fs';
const fsPromises = require("fs").promises;
const path = require('path');
const fs=require('fs');

// const operation = async () =>{
//     try{
//         const data = await fsPromises.readFile(path.join(__dirname,"files","start.txt"),"utf-8");
//         console.log(data);
        
//         await fsPromises.writeFile(path.join(__dirname, 'files', 'writeFile.txt'), "this is content");
        
//         console.log("write successfull")

//         await fsPromises.appendFile("./files/start.txt", "this is additional content");
        
//         console.log("append successfull")

//         await   fsPromises.rename(path.join(__dirname,"files","writeFile.txt"),path.join(__dirname,"files","wadfs.txt"))
        
//         console.log("rename successfull")


//         await fsPromises.unlink(path.join(__dirname,"files","start.txt"));
//         console.log("delete successfull")
//     }
//     catch(err){
//         console.error(err);
//     }
// }

// operation();
const rf = fs.createReadStream(path.join(__dirname, "files", "large.txt"), "utf-8");

// const rf= fs.createRaadStream(path.join(__dirname,"files","large.txt"),"utf-8");
const wf=fs.createWriteStream(path.join(__dirname,"files","copy.txt"));
rf.pipe(wf)
// fs.readFile(path.join(__dirname, 'files', 'start.txt'), "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// fs.writeFile(path.join(__dirname, 'files', 'writeFile.txt'), "this is content", (err) => {
//     if (err) throw err;

//     fs.appendFile("./files/start.txt", "this is additional content", (err) => {
//         if (err) throw err;
//         fs.rename(path.join(__dirname,"files","writeFile.txt"),path.join(__dirname,"files","w.txt"),err=>{
//             if(err) throw err;
//         })
//     })
// })


// fs.unlink("./files/writeFile.txt",(err)=>{
//     if(err) throw err;
// })

// process.on("uncaughtException", err => {
//     console.log(`there is some uncaught error: ${err}`);
//     process.exit(1)
// });
   


// catch(console.log(err))
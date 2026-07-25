const add= (a,b) => a+b;
const sub= (a,b) => a-b;
const mul= (a,b) => a*b;
const div= (a,b) => a/b;

//or
// exports.add= (a,b) => a+b;

module.exports={
add,sub,mul,div
}

const fs=require('fs');

if(fs.existsSync("./new")) {
    fs.rmdir("./new",(err)=>{
        if(err) throw err;
    })
}

if(!fs.existsSync("./new")) {
    fs.mkdir("./new",(err)=>{
        if(err) throw err;
    })
}


5
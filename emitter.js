const EventEmitter=require('events');
const http=require('http');
const myEmitter= new EventEmitter();

myEmitter.on("haanji",()=>{
    console.log("Har Har Mahadev")
})
myEmitter.on("haanji",()=>{
    console.log("Haanji Good Edm ")
})
myEmitter.on("haanji",yoo=>{
    console.log(`What is your mobile Number ${yoo}`);
})
myEmitter.emit("haanji",10);

const server=http.createServer();

server.on('request',(req,res)=>{
    console.log(req.url);
    res.end("yoo habbbib");
});
server.on('request',(req,res)=>{
    console.log("haanji good edm");
    //res.end("nota");
});
server.listen(8000,()=>{
    console.log(`server is active in port http://localhost:8000/`);
})
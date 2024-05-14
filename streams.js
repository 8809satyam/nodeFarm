const fs=require('fs');
const http=require('http');


const server=http.createServer();

server.on('request',(req,res)=>{
    // fs.readFile('./text/final.txt','utf8',(err,data)=>{
    //    if (err) {
    //     res.end(err);
    //    }
    //    res.end(data);
    // })
    const readable=fs.createReadStream('./text/final.txt');
    // readable.on('data',chunk=>{
    //     res.write(chunk);
    // })
    // readable.on('end',()=>{
    //     res.end("haanji Good Edm");
    // })
    // readable.on('err',err=>{
    //     res.statusCode=500;
    //     res.end("Error aa gya haa bhai ");
    // })
    readable.pipe(res);
})

server.listen(8000,()=>{
    console.log(`port is active on http://localhost:8000`);
})
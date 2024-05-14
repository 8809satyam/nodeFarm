const fs = require('fs');
const http=require('http');
const url=require('url');

// Define an async function to read the file and then write to another file
// const readAndWriteFile=async()=> {
//     try {
//         // Read the file asynchronously
//         const textIn = await fs.readFile('./text/into.txt', 'utf8');
//         console.log(textIn);

//         // Write to another file asynchronously
//         await fs.writeFile('./text/asout.txt', textIn);
//         console.log("haanji ho gya haa ");
//     } catch (err) {
//         console.log(`error aaa gya haa guys : ${err}`);
//     }
// }

// Call the async function
// readAndWriteFile();
// var yelo=fs.readFile('./text/into.txt','utf-8',(err,data)=>{
//     console.log(data);
//     console.log("executing files 2");
//      fs.readFile('./text/output.txt','utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./text/into.txt','utf-8',(err,data3)=>{
//             console.log(`  data3 -->   ${data3}`);

//             fs.writeFile('./text/final.txt',`${data} \n ${data3}`,'utf8',err=>{
//                 console.log("Your file has benn writeen and is been survilanced by them");
//             })
        
//         })
    
//     })

// });

// console.log('File Written');

// top level code will execute only once and our server code will excute agan and again 
// when new url request or route will be changed.
const replaceTemplate=(temp,product)=> {
    let output =temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%DESCRIPTION%}/g,product.description);
    output=output.replace(/{%ID%}/g,product.id);
    if(product.organic==false){
        output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    }
 return output;
}



const dataji=fs.readFileSync('./dev-data/file.json','utf8');
const dataObt=JSON.parse(dataji);// dataji  is in string wheras dataobj will be in json format
const over=fs.readFileSync('./template/overview.html','utf8');
const prod=fs.readFileSync('./template/product.html','utf8');
const crd=fs.readFileSync('./template/card.html','utf8');

const server=http.createServer((req,res)=>{
    const { query,pathname}= url.parse(req.url,true);
    console.log(url.parse(req.url,true));
    // overview page
   if(pathname ==='/'|| pathname==='/overview'){
    res.writeHead(200,{
        'Content-type':'text/html'
    });
    const cardList=  dataObt.map(item=> replaceTemplate(crd,item) ).join('');
    const output=over.replace('{%PRODUCT_CARDS%}',cardList);
    res.end(output);

   }
   // product page
   else if(pathname==='/product'){
    res.writeHead(200,{
        'Content-type':'text/html'
    });
    const prodct=dataObt[query.id];
    console.log(query);
    const output=replaceTemplate(prod,prodct);
    res.end(output); 
   }
   // api
   else if(pathname==='/api'){
    res.writeHead(200,{
        'Content-type':'application/json'
    });
   
       res.end(dataji);
   }
   // Not Found
   else{
    res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header':'hello-world'
    });
    res.end("<h1>Hello from the server </h1>");
   }
   

});
server.listen(8000,()=>{
    console.log("listening at request on port 8000");
})

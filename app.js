const http = require('http');
const fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");
var express = require("express");
const { data } = require('cheerio/lib/api/attributes');
// const { CLIENT_RENEG_WINDOW } = require('tls');
//const { resolve } = require('path/posix');

const hostname = '127.0.0.1';
var app = express();
 
//define the route for "/"
app.get("/", function (req, res){
    res.sendFile(__dirname+"/index.html");
});
app.set('view engine', 'ejs');
app.get("/getbkname", async function (req, res){
    var bookname = req.query.bookname;
    if (bookname != "") {
        //const read1 = await readbkprice_amzn(bookname).then(data => res.render(__dirname+'/result.ejs',  {datas :data }));
        const read1 = await readbkprice_amzn(bookname);
        const read2 = await readbkprice_amzn2('python coding');
        Promise.all([read1,read2]).then(data  => res.render(__dirname+'/result.ejs',  {datas :data.flat() }));
    } else {
        res.send("Please provide us book name");
    }
});

//start the server
app.listen(8080);

//.log("Something awesome to happen at http://localhost:8080");


const readbkprice_amzn = (bookname) => {
    return new Promise((resolve, reject) =>{
    request({
        url: "https://www.amazon.com/s?k="+bookname+"&i=stripbooks-intl-ship",
        method: "GET"
    }, (error, res, body) => {
        // 如果有錯誤訊息，或沒有 body(內容)，就 return
        if (error || !body) {
            reject(err)
            return;
        }
        let data = [];
        const $ = cheerio.load(body); // 載入 body
        
        const list = $("div.a-section.a-spacing-small.a-spacing-top-small");
        for (let i = 0; i < list.length; i++) {
            const title = list.eq(i).find('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-size-medium.a-color-base.a-text-normal').text();
            const price = list.eq(i).find('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-offscreen').text();
            data.push({ title, price});
        }
        resolve(data);
        ////.log(data);
    });
    });
};

const readbkprice_amzn2 = (bookname) => {
    return new Promise((resolve, reject) =>{
    request({
        url: "https://www.amazon.com/s?k="+bookname+"&i=stripbooks-intl-ship",
        method: "GET"
    }, (error, res, body) => {
        // 如果有錯誤訊息，或沒有 body(內容)，就 return
        if (error || !body) {
            reject(err)
            return;
        }
        let data = [];
        const $ = cheerio.load(body); // 載入 body
        
        const list = $("div.a-section.a-spacing-small.a-spacing-top-small");
        for (let i = 0; i < list.length; i++) {
            const title = list.eq(i).find('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-size-medium.a-color-base.a-text-normal').text();
            const price = list.eq(i).find('a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal span.a-offscreen').text();
            data.push({ title, price});
        }
        resolve(data);
        //console.log(data);
    });
    });
};


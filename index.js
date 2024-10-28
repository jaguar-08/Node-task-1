import express from "express";
import { format } from 'date-fns';
import fs from "fs";
import path from "path";
import { readFileSync } from "fs";

const app = express();

const port = 5000;

app.listen(port, () => {
    console.log(`app is running = ${port}`)
});


app.get('/', (req, res) => {

    let today = format(new Date(), 'dd-MM-yyy-hh-mm-ss');
    console.log(("Today :", today));
    const filepath = `TimeStamp/${today}.txt`;
    fs.writeFileSync(filepath, today, 'utf8')

    let data = readFileSync(filepath, 'utf8');


    
    res.status(200).send(data)
});

app.get("/textFile", (req, res) => {
    const filePath = "TimeStamp";

    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.log(err);
            res
                .status(500)
                .send("An error occurred");
        } else {
            const textFiles = files.filter((file) => path.extname(file) === ".txt");
           
            res.status(200).json(textFiles);
        }
    });
});
import express from 'express'
import async from 'async'
import fs from 'fs'
import bodyParser from 'body-parser'
import { log, error } from "console"

const app = express()
app.use(bodyParser.json())


app.get("/api/server", (req,res)=>{
    fs.readFile('./file.json', 'utf-8', (err, data) =>{
        if(err){
            error('Error reading file : ', err)
            return;
        }
        const jsonData = JSON.parse(data)
        // log('json to send : ', jsonData)
        res.send(jsonData)
    })
})

app.post('/api/button', (req, res) => {
    const receivedData = req.body
    // log('received json : ', receivedData)
    const strJson = JSON.stringify(receivedData)
    log('Data received from front end:', receivedData)
    fs.writeFile('./file.json', strJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err)
      return
    }
    log('Data written to file successfully!');
    });
    res.json({ message: 'Data received successfully' })
})


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    log(`Serve at http://localhost:${port}`)
})

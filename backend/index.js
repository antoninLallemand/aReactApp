import express from 'express'
import async from 'async'
import fs from 'fs'
import bodyParser from 'body-parser'
import { log, error } from "console"
import jwt from 'jsonwebtoken'

const secretKey = 'e78gdf9_n4ud*'

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

//users management

app.post('/api/credentials', (req, res) => {
    const credentials = req.body
    log('Data received from front end:', credentials)
    fs.readFile('./credentials.json', 'utf-8', (err, data) =>{
        if(err){
            error('Error reading file : ', err)
            return res.json({ message: 'error' })
        }
        const savedCredentials = JSON.parse(data)
        log('saved credentials : ',savedCredentials)

        // Check if credentials match
        const user = savedCredentials.credentials.find(element => {
            return element.username === credentials.username && element.password === credentials.password
        })

        // Send appropriate response based on whether credentials match
        if(user){
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })
            log('token : ', token)
            return res.json({ token })
        } else {
            return res.status(401).json({ error: 'invalid credentials' })
        }
    })
})

app.get('/protected', verifyToken, (req, res) => {
    // If token is verified, user is authenticated
    res.json({ message: 'You are authenticated' });
});

function verifyToken(req, res, next) {
const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
}

jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
    return res.status(401).json({ error: 'Unauthorized' })
    }
    req.userId = decoded.userId
    next();
});
}

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    log(`Serve at http://localhost:${port}`)
})

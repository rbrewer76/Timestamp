// server.js
// where your node app starts

// init project
const express = require("express")
const app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require("cors")
app.use(cors({optionSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: "hello API"})
})


app.get("/api/timestamp", (req, res) => {
  const date = new Date()
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() })  
})


app.get("/api/timestamp/:date_string", (req, res) => {
  const dateString = req.params.date_string
  let date = ""
  
  // The numbers passed from html are a --String--. Date expects a --Number-- of milliseconds
  if (!isNaN(Number(dateString))) 
    date = new Date(Number(dateString))
  // The string is not a Number so try and make a date with it
  else 
    date = new Date(dateString)  

  // If there is a valid Date object
  if (date instanceof Date && !isNaN(date.valueOf())) 
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
  else 
    res.json({"error": "Invalid Date"})

})


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
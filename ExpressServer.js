require("dotenv").config();

const fs = require("fs");
const fsPromises = require("fs").promises;
const http = require("http");
const express = require("express");
const { connect } = require("http2");
const app = express();
const path = require("path");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

//ConnectDB
connectDB();

//Custom middleware function
app.use(logger);

//CORS
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//to handle static files in main and sub Dir
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subDir",express.static(path.join(__dirname,"/public")));

//Routes
app.use("/",require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/auth", require("./routes/subDir"));

//API route
app.use("./states", require("./routes/api/states"));


const serveFile = async (filePath, contentType, response) => {
    try{
        const rawData = await fs.promises.readFile(filePath, "utf8");
        const data =
            contentType === "application/json" ? JSON.parse(rawData) : rawData;
        response.writeHead(200, {"Content-Type": contentType});
        //response.end (rawData);
        response.end(
            contentType === "APPLICATION/JSON" ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
};

const server = http.createServer((req, res) => {
    console.log(req.url);

let contentType;
const extension = path.extname(req.url);
switch (extension) {
    case ".css":
        contentType = "text/css";
        break;
    case ".js":
        contentType = "text/javascript";
        break;
    case ".txt":
        contentType = "text/plain";
        break;
    case ".json":
        contentType = "application/json";
        break;
    case ".img":
        contentType = "image/jpeg";
        break;
    case ".png":
        contentType = "image/png";
        break;
    default:
        contentType = "text/html";
    }
let filePath = 
    contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", "index.html")
        :contentType === "text/html" && req.url.slice(-1) === "/"
        contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", "index.html")
        :contentType === "text/html"
        contentType === "text/html" && req.url === "/"
        ? path.join(__dirname, "views", req.url)
        :path.join(__dirname,  req.url);

if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

const fileExits = fs.existsSync(filePath);

if (fileExits) {
    serveFile(filePath, contentType, res);
} else {
    //404
    switch (path.parse(filePath).base) {
        case "old-page.html":
            res.writeHead(301, { Location: "./views/new-page.html" });
            res.end();
            break;
        default:
            serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
}
});

//404 Route for un-defined
app.all("*", (req,res) => {
    res.status(404);
    if (req.accepts(html)) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if (req.accepts("json")) {
        res.json({error:"404 Not Found"});
    }else {
        res.type("txt").send("404 Not Found");
    }
});

//Error Logger
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});

/* GET method route
app.get('/', (req, res) => {
    res.send('Howdy!')
  }); */

  

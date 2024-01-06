import express from "express";
import bodyParser from "body-parser"
import bookRoute from "./app/routes/bookRoute";

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// PUG
app.set("view engine","pug");
app.set('views', './app/views');
app.set("view cache", false);

// Routes
app.use('/', bookRoute);

// Run The Server
const port:number = 3000;

app.listen(port,()=>{
    console.log(`Express app is listening on the port: ${port}!`);
});
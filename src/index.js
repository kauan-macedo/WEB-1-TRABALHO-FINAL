const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./models/dbConnect');
const routes = require("./routes");


db.testConnection().catch((err) => {
    console.error(
        "Couldn't connect to DataBase. Killing the API."
    );
    process.exit(1);
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static('public')); // Isso permite o envio de arquivos estáticos referenciados nas nossas páginas
app.use(routes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});

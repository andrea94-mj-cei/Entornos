import express from 'express';
import cors from 'cors';
import indexRoutes from './routes/index.routes.js'
import mongoRoutes from './routes/mongodb.routes.js'
import { PORT, DOMAIN, URL } from './config/config.js'

const app = express();

// ----------------------------------
// Midlewares: Funciones que se ejecutan segun el orden que queremos 
// ----------------------------------

app.use(cors());

// interpreta la info como si fuera un json
app.use(express.json());
// interpreta la info como si fuera un formulario
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

// Rutas sql
app.use("/API/v1/", indexRoutes);

// Rutas con mongo (no se pone mongo, pero lo hemos puesto para diferenciar entre mysql y mongo)
app.use("/API/v1/mongo", mongoRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "No estoy funcionando",
        data: null,
        success:"ok",
        cant: 0
    })
})

// ----------------------------------
// Server
// ----------------------------------

// app.get("/")

app.listen(PORT, () => {
    console.log(`Server running on ${URL}`);
});
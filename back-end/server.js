const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mariadb = require("mariadb");
const {Sequelize} = require("sequelize"); // test
let cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DTB, 
//     connectionLimit: 10,
//     waitTimeout: 10000, 
//     maxConcurrency: 10,
// });

app.get("/user", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Connexion à la base de données réussie");
        const rows = await conn.query("SELECT * FROM user");
        console.log("Utilisateurs récupérés:", rows);
        return res.status(200).json(rows);
    } catch (error) {
        if (error.code === 'ER_GET_CONNECTION_TIMEOUT') {
            console.error("Timeout lors de la récupération de la connexion", error);
            return res.status(500).json({ error: "Timeout lors de la récupération de la connexion" });
        }
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    } finally {
        if (conn) conn.end();
    }
});

// const sequelize = new Sequelize('apllergie', 'root', 'moino121923', {
//     host : 'localhost',
//     dialect : 'mariadb'
// }); // test

// ( async() => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })();


app.listen(3001, () => {
    console.log("Serveur à l'écoute sur le port 3001");
});

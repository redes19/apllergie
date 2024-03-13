const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mariadb = require("mariadb");
let cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DTB, 
    connectionLimit: 10,
    waitTimeout: 10000, 
    maxConcurrency: 10,
});

app.get("/api/user", async (req, res) => {
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

app.post("/api/user", async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();
        console.log("lancement de la requette");

        const result = await conn.query("Select * FROM user WHERE email =?",
        [req.body.email]
        );

        console.log('email', req.body.email);

        if(result.length > 0){
            return res.status(400).json({error: "cet email existe deja"});
        }

        console.log( "mot de passe", req.body.motdepasse);

        const hashage = await bcrypt.hash(req.body.motdepasse, 10);
        console.log(hashage);

        const query = "INSERT INTO user (user, email, motdepasse) VALUE (?,?,?)";

        const resutlInsert = await conn.query(query, [
            req.body.user,
            req.body.email,
            hashage,
        ]);

        res.json({
            message: "Utilisateur ajouté avec succés",
            userId: req.body.id,
        })

    } catch (error) {
        console.error("erreur", error);

        res
            .status(500)
            .json({error : "erreur lors de la création"})
    } finally{
        if (conn) conn.end();
    }
});

app.listen(3001, () => {
    console.log("Serveur à l'écoute sur le port 3001");
});

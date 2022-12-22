/**
 * server.js - Fichier du serveur
 */

/* Imports */
const http = require("http"); // Module http
const app = require("./app"); // Fonction app

/* Configuration */
const port = process.env.PORT || 3000; // PORT
const server = http.createServer(app);

/* Démarrage du serveur */
server.listen(port);

/* Evènements serveur */

// Ecoute
server.addListener("listening", () => {
  console.log("[SERVER] Listening on port " + port);
});

// Erreur
server.addListener("error", (e) => {
  console.log("[SERVER] The server encoutered an error");
  console.log(e);
});

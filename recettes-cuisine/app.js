const response = require("./lib/response");
const fs = require("fs");
const unlink = require("fs").unlink;
const path = require("path");
let recipes = require("./recettes.json");

function handleRequest(req, res) {
  const method = req.method; // Verbe HTTP
  const path = req.url; // Chemin
  let rawBody = []; // Corps brut (Buffer)
  let body = null; // Corps exploitable ("parsé")

  // Récupération du body
  req.on("data", (chunk) => {
    rawBody.push(chunk);
  });

  // Traitement de la requête
  req.on("end", () => {
    // Parsing du body brut si nécessaire
    if (rawBody.length > 0) {
      body = JSON.parse(rawBody);
    }
  });

  // Ajouter une recette dans un fichier data/[nom_de_la_recette].json puis répondant un message de confirmation
  if (path.startsWith("/recipes/") && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // Récupérer le nom de la recette dans l'URL
      const recipeName = path.split("/")[2];

      // Ajouter l'extension ".json" au nom de la recette
      const fileName = `${recipeName}.json;`;

      // Écrire le contenu de la requête dans le fichier JSON
      fs.writeFile(`data/${fileName}`, body, (err) => {
        if (err) {
          response.code(res, 500);
          return;
        }
      });

      //Vérifier si le fichier a bien été créé
      fs.stat(`data/${fileName}`, (err, stats) => {
        if (err || !stats.isFile()) {
          response.code(res, 500);
          return;
        }
      });

      // Répondre avec un message de confirmation status 201
      response.json(res, 201, {}, { message: "Recette ajoutée avec succès" });
    });
    return;
  }

  //Récupérer une recette aléatoire
  if (path === "/recipes/daily" && method === "GET") {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    response.json(res, 200, {}, randomRecipe);
    return;
  }

  //Récupérer toute les recettes
  if (path === "/recipes" && method === "GET") {
    response.json(res, 200, {}, recipes);
    return;
  }

  //Récupérer une recette par son nom
  if (path.startsWith("/recipes/") && method === "GET") {
    const recipeName = path.split("/")[2];
    const recipe = recipes.find((recipe) => recipe.name === recipeName);
    if (recipe) {
      response.json(res, 200, {}, recipe);
      return;
    }
    response.code(res, 404);
    return;
  }

  //Supprimer une recette par son nom en utilisant la methode DELETE et fs.unlink
  if (path === "/recipes/" && method === "DELETE") {
    fs.unlink(`data/${recipeName}.json`, (err) => {
      if (err) {
        response.code(res, 500, "Internal Server Error");
        return;
      }
    });
    response.json(res, 200, {}, { message: "Recette supprimée avec succès" });
    return;
  } else {
    response.code(res, 404, "Not found");
    return;
  }
}

module.exports = handleRequest;

const response = require("./lib/response");
let recipes = require("./recettes.json");

function handleRequest(req, res) {
  const method = req.method; // Verbe HTTP
  const path = req.url; // Chemin

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
}

module.exports = handleRequest;

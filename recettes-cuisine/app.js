const response = require("./lib/response");
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
  if (path === "/recipes" && method === "POST") {
    const recipe = body;
    recipes.push(recipe);
    response.json(res, 201, {}, { message: "Recette ajoutée" });
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
}

module.exports = handleRequest;

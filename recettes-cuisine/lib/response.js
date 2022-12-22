/**
 * lib/response.js - Utilitaires de réponse
 */

/**
 * Envoie une réponse au format JSON
 * @param {http.ServerResponse} res Objet réponse
 * @param {number} status Code de statut
 * @param {object} headers En-têtes
 * @param {object | array } body Corps
 * @returns
 */
function json(res, status = 200, headers = {}, body = null) {
  res.writeHead(status, {
    ...headers,
    "Content-Type": "application/json",
  });

  if (!body) {
    res.end();
    return;
  }

  res.end(JSON.stringify(body));
}

/**
 * Envoie une réponse contenant uniquement un code de statut
 * et des headers
 * @param {http.ServerResponse} res
 * @param {number} status
 */
function code(res, status = 200, headers = {}) {
  res.writeHead(status, headers);
  res.end();
}

module.exports = {
  json,
  code,
};

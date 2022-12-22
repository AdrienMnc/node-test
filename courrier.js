// const nom = "Vador";
// const prenom = "Dark";
// const serviceResiliation = "Etoiles Noires";
// const dateResiliation = "01/01/2021";
const fs = require("fs");

const arguments = process.argv;

info = {
  nom: arguments[2],
  prenom: arguments[3],
  serviceResiliation: arguments[4],
  dateResiliation: arguments[5],
};

fs.writeFile(
  "courrier-résiliation.txt",
  //ajouter mes constantes dans le texte créee
  "Madame, Monsieur, Par la présente, je vous demande de bien vouloir mettre fin au contrat de " +
    String(info.serviceResiliation).toUpperCase() +
    ", dès le " +
    info.dateResiliation +
    ". La possibilité de résilier ce contrat m’est offerte puisque le présent contrat est sans engagement. J’ai bien noté, qu‘en application des dispositions contractuelles qui nous lient, cette résiliation devrait prendre effet immédiatement ou selon les délais prévus dans le cas d’une résiliation anticipée. Bien cordialement, " +
    String(info.prenom).toUpperCase() +
    " " +
    info.nom +
    "",
  function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  }
);

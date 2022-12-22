const readline = require("readline");
const fs = require("fs");

// Création de l'interface de lecture avec readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Tableau de questions et de réponses
const questions = [
  {
    question: "Quel est le capital de la France ?",
    answers: ["Paris", "Marseille", "Lyon", "Toulouse"],
    correctAnswer: 1,
  },
  {
    question: "Combien y a-t-il de pays dans l'Union européenne ?",
    answers: ["25", "27", "28", "30"],
    correctAnswer: 3,
  },
  {
    question: 'Qui a écrit "Le petit prince" ?',
    answers: [
      "Victor Hugo",
      "Jules Verne",
      "Antoine de Saint-Exupéry",
      "Maurice Druon",
    ],
    correctAnswer: 3,
  },
  {
    question: "Quel est le plus haut sommet de France ?",
    answers: [
      "Le Mont Blanc",
      "Le Mont Blanc de Courmayeur",
      "Le Mont Blanc du Tacul",
      "Le Mont Blanc de Vesuve",
    ],
    correctAnswer: 1,
  },
  {
    question: "Quel est le pays le plus peuplé du monde ?",
    answers: ["La Chine", "L'Inde", "Les Etats-Unis", "Le Brésil"],
    correctAnswer: 1,
  },
];

// Score de départ
let score = 0;

// Si un malus est spécifié en argument, on le soustrait au score
if (process.argv[2]) {
  score -= parseInt(process.argv[2]);
}

// Tableau pour enregistrer les réponses de l'utilisateur
let userAnswers = [];

// Fonction récursive pour poser les questions une par une
function askQuestion(index) {
  // Si toutes les questions ont été posées, on affiche le score final et on arrête la récursion
  if (index === questions.length) {
    console.log(`Votre score final est de ${score} points.`);
    return rl.close();
  }

  // On récupère la question et les réponses courantes
  const { question, answers, correctAnswer } = questions[index];

  // On affiche la question et les réponses
  console.log(`\n${question}\n`);
  for (let i = 0; i < answers.length; i++) {
    console.log(`${i + 1}. ${answers[i]}`);
  }

  // On demande à l'utilisateur de saisir son choix de réponse
  rl.question("Votre réponse : ", (answer) => {
    // On enregistre la réponse de l'utilisateur dans le tableau userAnswers
    userAnswers.push(parseInt(answer));

    // Si la réponse est correcte, on ajoute 2 points au score
    if (parseInt(answer) === correctAnswer) {
      console.log("Bonne réponse !\n");
      score += 2;
    }
    // Si la réponse est incorrecte, on enlève 1 point au score
    else {
      console.log("Mauvaise réponse.\n");
      score -= 1;
    }

    // On passe à la question suivante
    askQuestion(index + 1);
  });
}

// On commence par la première question
askQuestion(0);

// Lorsque l'interface de lecture est fermée (après avoir posé toutes les questions), on génère le fichier resultats.json
rl.on("close", () => {
  const results = {
    score,
    questions,
    userAnswers,
  };

  fs.writeFileSync("resultats.json", JSON.stringify(results));
});

const { server } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");

// Gestion de la fermeture de l'application
function handleExit(signal) {
  console.log(`Signal ${signal} reçu. Fermeture du serveur.`);
  server.close(() => {
    mongoose.disconnect();
    console.log('Déconnexion de Mongoose');
    process.exit(0);
  });
}

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (err) => {
  console.error('Échec de la connexion à la base de données au démarrage ', err.message);
});

//le serveur commence à écouter
db.once("open", () => {
  console.log("Connexion à la base de données réussie");

  server.listen(config.port, () => {
    console.log(`Application en cours d'exécution sur le port ${config.port}`);
  });
});

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

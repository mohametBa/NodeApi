const isAuthenticated = (req, res, next) => {
  const userIsAuthenticated = true; 
  if (userIsAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "Non autorisé" });
  }
};

const authoAdmin = (req, res, next) => {
  const userIsAdmin = true; 
  if (userIsAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé" });
  }
};

module.exports = { isAuthenticated, authoAdmin };

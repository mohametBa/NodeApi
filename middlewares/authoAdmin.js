const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Accès non autorisé." });
  }
};

const authoAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé. Réservé aux administrateurs." });
  }
};

module.exports = { isAuthenticated, authoAdmin };

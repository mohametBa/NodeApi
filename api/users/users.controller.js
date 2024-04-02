const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usersService = require("./users.service");
const User = require('./users.model');
const Article = require('../articles/articles.schema');

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await usersService.get(id);
      if (!user) {
        throw new NotFoundError();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const user = await usersService.create(req.body);
      user.password = undefined;
      req.io.emit("user:create", user); // Assurez-vous que req.io est correctement initialisé et disponible.
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const userModified = await usersService.update(id, data);
      userModified.password = undefined;
      res.json(userModified);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await usersService.delete(id);
      req.io.emit("user:delete", { id }); // Assurez-vous que req.io est correctement initialisé et disponible.
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userId = await usersService.checkPasswordUser(email, password);
      if (!userId) {
        throw new UnauthorizedError();
      }
      const token = jwt.sign({ userId }, config.secretJwtToken, { expiresIn: "3d" });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  // Intégré maintenant dans la classe UsersController
  async getUserArticles(req, res, next) {
    try {
      const { userId } = req.params;

      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      const articles = await Article.find({ user: userId }).select('-user');
      res.json(articles);
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = new UsersController(); // 

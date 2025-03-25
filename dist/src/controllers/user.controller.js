"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
    }
    create(req, res) {
        const body = req.body;
        this.userService.create(body)
            .then(user => {
            return res.status(200).json(user);
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    update(req, res) {
        const id = req.params.id;
        const data = req.body;
        this.userService.update({ id, data })
            .then(user => {
            if (!user) {
                return res.status(500).json({ message: user });
            }
            return res.status(200).json(user);
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    delete(req, res) {
        const id = req.params.id;
        this.userService.delete(id)
            .then(deleted => {
            return res.status(200).json({ deleted });
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    getAll(req, res) {
        this.userService.getAll()
            .then(users => {
            return res.status(200).json(users);
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
    getById(req, res) {
        const id = req.params.id;
        this.userService.getById(id)
            .then(user => {
            if (!user) {
                return res.status(500).json({ message: user });
            }
            return res.status(200).json(user);
        })
            .catch(error => {
            return res.status(500).json({ message: error.message || "Internal server error" });
        });
    }
}
exports.UserController = UserController;

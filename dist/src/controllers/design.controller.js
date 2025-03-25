"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignController = void 0;
const design_service_1 = require("../services/design.service");
class DesignController {
    constructor() {
        this.designService = new design_service_1.DesignService();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
    }
    create(req, res) {
        const body = req.body;
        this.designService.create(body)
            .then(design => {
            if (design === "Not found user") {
                return res.status(500).json({ message: "User not found" });
            }
            return res.status(200).json(design);
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
    update(req, res) {
        const id = req.params.id;
        const data = req.body;
        this.designService.update(id, data)
            .then(design => {
            if (design === 0) {
                return res.status(500).json({ message: "Design not found" });
            }
            if (!design) {
                return res.status(500).json({ message: design });
            }
            return res.status(200).json(design);
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
    delete(req, res) {
        const id = req.params.id;
        this.designService.delete(id)
            .then(design => {
            if (design === 0) {
                return res.status(500).json({ message: "Design not found" });
            }
            if (!design) {
                return res.status(500).json({ message: design });
            }
            return res.status(200).json({ deleted: design });
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
    getAll(req, res) {
        this.designService.getAll()
            .then(designs => {
            return res.status(200).json(designs);
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
    getById(req, res) {
        const id = req.params.id;
        this.designService.getById(id)
            .then(design => {
            if (design === 0) {
                return res.status(500).json({ message: "Design not found" });
            }
            if (!design) {
                return res.status(500).json({ message: design });
            }
            return res.status(200).json(design);
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
    getByUserId(req, res) {
        const userid = req.params.userid;
        this.designService.getByUserId(userid)
            .then(designs => {
            if (designs === "Not found user") {
                return res.status(500).json({ message: "User not found" });
            }
            return res.status(200).json(designs);
        })
            .catch(error => {
            res.status(500).json({ message: "Internal server error", error });
        });
    }
}
exports.DesignController = DesignController;

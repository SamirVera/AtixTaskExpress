const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/tasks.model');
const { validarJWT } = require('../middleware/validar-jwt');
const router = express.Router();

router.post('/', validarJWT,
    (req, res) => {
        const { nombre, estado } = req.body;

        const tarea = new Task({ nombre, estado });

        tarea.save()
            .then(task => {
                res.status(201).send(task);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    });

router.get('/', validarJWT, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:taskId', validarJWT, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:taskId', validarJWT, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, default: 'pendiente' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue.controller');

router.get('/', queueController.getQueue);
router.post('/', queueController.addItem);
router.put('/:id', queueController.updateItem);
router.delete('/:id', queueController.deleteItem);

module.exports = router;

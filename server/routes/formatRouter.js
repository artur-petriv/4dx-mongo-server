const Router = require('express');
const router = new Router();
const formatController = require('./../controllers/formatController');

router.post('/', formatController.create);
router.get('/', formatController.getAll);

module.exports = router;

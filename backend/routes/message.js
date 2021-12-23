const express = require('express');
const router = express.Router();

const messageCtrl = require('../controller/message');
const auth = require('../middleware/auth');

router.post('/', auth, messageCtrl.createThing);
router.put('/:id', auth, messageCtrl.modifyThing);
router.delete('/:id', auth, messageCtrl.deleteThing);
router.get('/:id', auth, messageCtrl.getOneThing);
router.get('/', auth, messageCtrl.getAllThings);

// router.post('/', messageCtrl.createThing);
// router.put('/:id', messageCtrl.modifyThing);
// router.delete('/:id', messageCtrl.deleteThing);
// router.get('/:id', messageCtrl.getOneThing);
// router.get('/', messageCtrl.getAllThings);

module.exports = router;
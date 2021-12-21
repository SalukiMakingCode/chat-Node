const express = require('express');
const router = express.Router();

const messageCtrl = require('../controller/message');
const auth = require('../middleware/auth');

// router.post('/', auth, stuffCtrl.createThing);
// router.put('/:id', auth, stuffCtrl.modifyThing);
// router.delete('/:id', auth, stuffCtrl.deleteThing);
// router.get('/:id', auth, stuffCtrl.getOneThing);
// router.get('/', auth, stuffCtrl.getAllThings);

router.post('/', messageCtrl.createThing);
router.put('/:id', messageCtrl.modifyThing);
router.delete('/:id', messageCtrl.deleteThing);
router.get('/:id', messageCtrl.getOneThing);
router.get('/', messageCtrl.getAllThings);

module.exports = router;
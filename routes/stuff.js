const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
//const multer = require('../midlleware/multer-config')


router.post('/', auth, stuffCtrl.createThing);

router.get('/:id', auth, stuffCtrl.getOneThing);

router.get('/', auth, stuffCtrl.getAllThings);

router.put('/:id', auth, stuffCtrl.modifyThing);

router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
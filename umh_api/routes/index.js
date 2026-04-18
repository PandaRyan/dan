var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:message/:message2', function(req, res, next) {
  res.json({status: "Running", db: "Connected", message: req.params.message, message2: req.params.message2})
});

router.get('/', (req, res) => {
  const { message, message2 } = req.body;
  res.json({message: message, message2: message2})
})

module.exports = router;

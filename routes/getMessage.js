const router = require("express").Router();

router.get('/api/getMessage', (req, res) => {
    res.json({ message: 'Hello World!' });
  });
  
module.exports = router;
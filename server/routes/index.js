import express from 'express';

const router = express.Router();

/* GET home page. */
// GET /
router.get('/', (req, res) => {
  res.render('index', { title: 'ITGAM', author: 'JOSE LUIS Y DIANA' });
});

export default router;

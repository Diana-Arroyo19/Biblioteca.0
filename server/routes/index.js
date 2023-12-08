import express from 'express';

const router = express.Router();

/* GET home page. */
// GET /
router.get('/', (req, res) => {
  res.render('index', {
    title: 'InnovateSync',
    authors: 'JOSE LUIS Y DIANA',
  });
});

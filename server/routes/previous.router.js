const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


router.get('/stats/:instance_id', (req,res) => {
    console.log('previous req.body', req.params.instance_id);
    const sqlText = `SELECT instances.id, stats.user_id, stats.score, stats.victory FROM stats
                    JOIN instances ON instances.id = stats.instance_id
                    WHERE instances.id = $1;`;
    pool.query(sqlText, [req.params.instance_id])
    .then((response) => {
        res.send(response.rows)
    })
    .catch(() => {
        console.log('error getting previous stats');
        res.sendStatus(500);
    })
    
})

router.get('/:id', (req,res) => {
    console.log('count req.params.id', req.params.id);
    const sqlText = `SELECT id FROM instances
                    WHERE game_id = $1 ORDER BY id DESC LIMIT 3;`;
    const id = req.params.id;
    pool.query(sqlText, [id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch(() => {
        console.log('error getting count');
        res.sendStatus(500);
    })
})

module.exports = router;
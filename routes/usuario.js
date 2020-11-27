const express = require('express');
const router = express.Router();
const mysqlConnection = require('../db/db')



router.get('/usuario', (req, res) => {
     
  mysqlConnection.query('SELECT * FROM usuario ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

router.post('/nuevo',(req,res)=>{
const {nombre} = req.body;
let usuario = [nombre];
let nuevoUsuario = `INSERT INTO usuario (nombre)
                  VALUES(?)`;
mysqlConnection.query(nuevoUsuario, usuario, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Usuario creado`})
  });
});

router.put('/usuario/:id', (req, res) => {
  const {nombre} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE usuario SET nombre =? WHERE id_usuario = ?`, 
      [nombre, id], 
        (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Usuario actualizado'});
          } else {
            console.log(err);
        }
      });
});

router.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id_usuario = ?',
   [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario eliminado'});
    } else {
      console.log(err);
    }
  });
});


module.exports = router;

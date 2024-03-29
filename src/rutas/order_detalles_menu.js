const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js');

//Id_orden es un valor entero de 11 caracteres no autoincremental
rutas.get('/orden', (req, res) => {
  mysqlConexion.query(
    'SELECT * FROM Order_Detalles_Menu',
    (err, filas, campos) => {
      if (!err) {
        res.json(filas);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});

//Buscar y desplegar elementos de tabla orden por id_orden especifica
rutas.get('/orden/:id_ord', (req, res) => {
  const id_Order = req.params.id_ord;
  mysqlConexion.query(
    'SELECT * FROM Order_Detalles_Menu WHERE id_Order= ?',
    [id_Order],
    (err, filas, campos) => {
      if (!err) {
        res.json(filas);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});
//Select y desplegar elementos de la tabla buscando por cliente
rutas.get('/ordenrfc/:id_rfc', (req, res) => {
  const id_RFC = req.params.id_rfc;
  mysqlConexion.query(
    'SELECT * FROM Order_Detalles_Menu WHERE id_RFC= ?',
    [id_RFC],
    (err, filas, campos) => {
      if (!err) {
        res.json(filas);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});

//Insertar nueva orden
rutas.post('/orden', (req, res) => {
  const { id_Order, id_Item, Cantidad, id_RFC } = req.body;
  const query =
    'INSERT INTO Order_Detalles_Menu(id_Order,id_Item,Cantidad,id_RFC) VALUES(?,?,?,?)';
  mysqlConexion.query(
    query,
    [id_Order, id_Item, Cantidad, id_RFC],
    (err, filas, campos) => {
      if (!err) {
        res.json({ estatus: 'Orden creada con exito' });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});

//Actualizar los valores de una orden por su id
rutas.put('/orden/:id', (req, res) => {
  const { id_Item, Cantidad, id_RFC } = req.body;
  const { id } = req.params;
  const query =
    'UPDATE Order_Detalles_Menu SET id_Item = ?, Cantidad = ? , id_RFC = ? WHERE id_Order = ? ';
  mysqlConexion.query(
    query,
    [id_Item, Cantidad, id_RFC, id],
    (err, filas, campos) => {
      if (!err) {
        res.json({ estatus: 'Orden Actualizada cone exito' }, filas, campos);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});

//Eliminar una orden
rutas.delete('/orden/:id_ord', (req, res) => {
  const { id_ord } = req.params;
  const query = 'DELETE FROM Order_Detalles_Menu WHERE id_Order = ?';
  mysqlConexion.query(query, [id_ord], (err, filas, campos) => {
    if (!err) {
      res.json({ estatus: 'Orden eliminada con exito' });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});
//Eliminar una orden por id_rfc de cliente
rutas.delete('/ordenrfc/:id_ord', (req, res) => {
  const { id_ord } = req.params;
  const query = 'DELETE FROM Order_Detalles_Menu WHERE id_RFC = ?';
  mysqlConexion.query(query, [id_ord], (err, filas, campos) => {
    if (!err) {
      res.json({ estatus: 'Orden eliminada con exito' });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

module.exports = rutas;

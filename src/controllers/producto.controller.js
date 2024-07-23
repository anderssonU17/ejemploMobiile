// src/controllers/producto.controller.js
'use strict';

const { sql, poolPromise } = require('../database/dbConfig');

// Crear Producto
const createProduct = async (req, res) => {
    const { Id_Producto, Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_Suministro } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const query = `
            INSERT INTO dbo.Tb_Productos (Id_Producto, Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_Suministro)
            OUTPUT INSERTED.*
            VALUES (@Id_Producto, @Id_Empresa, @Nombre, @Descripcion, @Color, @Tamaño, @Clase, @Precio, @Precio_Promedio, @Vigente, @Id_Proveedor, @Id_Suministro)`;

        const result = await request
            .input('Id_Producto', sql.Int, Id_Producto)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Nombre', sql.NVarChar(255), Nombre)
            .input('Descripcion', sql.NVarChar(255), Descripcion)
            .input('Color', sql.NVarChar(50), Color)
            .input('Tamaño', sql.NVarChar(50), Tamaño)
            .input('Clase', sql.NVarChar(50), Clase)
            .input('Precio', sql.Money, Precio)
            .input('Precio_Promedio', sql.Money, Precio_Promedio)
            .input('Vigente', sql.Bit, Vigente)
            .input('Id_Proveedor', sql.Int, Id_Proveedor)
            .input('Id_Suministro', sql.Int, Id_Suministro)
            .query(query);

        const product = result.recordset[0];
        res.status(201).json({
            message: 'Producto creado exitosamente',
            product
        });
    } catch (error) {
        console.error('Error al intentar crear producto:', error);
        res.status(500).send('Error al crear producto');
    }
};

// Listar Producto
const readAllProducts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_Productos');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).send('Error obteniendo productos');
    }
};

// Editar Producto
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_Suministro } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        let query = 'UPDATE dbo.Tb_Productos SET';
        
        const addCondition = (field, value, sqlType) => {
            if (value !== undefined && value !== null) {
                query += ` ${field} = @${field},`;
                request.input(field, sqlType, value);
            }
        };

        addCondition('Id_Empresa', Id_Empresa, sql.Int);
        addCondition('Nombre', Nombre, sql.NVarChar(255));
        addCondition('Descripcion', Descripcion, sql.NVarChar(255));
        addCondition('Color', Color, sql.NVarChar(50));
        addCondition('Tamaño', Tamaño, sql.NVarChar(50));
        addCondition('Clase', Clase, sql.NVarChar(50));
        addCondition('Precio', Precio, sql.Money);
        addCondition('Precio_Promedio', Precio_Promedio, sql.Money);
        addCondition('Vigente', Vigente, sql.Bit);
        addCondition('Id_Proveedor', Id_Proveedor, sql.Int);
        addCondition('Id_Suministro', Id_Suministro, sql.Int);

        query = query.slice(0, -1) + ` WHERE Id_Producto = @id`;
        request.input('id', sql.Int, id);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        const updatedProduct = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM dbo.Tb_Productos WHERE Id_Producto = @id');

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            product: updatedProduct.recordset[0]
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
};

// Eliminar Producto
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Id_Producto', sql.Int, id);

        const query = 'DELETE FROM dbo.Tb_Productos WHERE Id_Producto = @Id_Producto';
        
        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.status(200).send('Producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
};

module.exports = {
    createProduct,
    readAllProducts,
    updateProduct,
    deleteProduct
};
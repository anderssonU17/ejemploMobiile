"use strict";

const { sql, poolPromise } = require('../database/dbConfig');

// Crear Tipo Cliente
const createTipoClientes = async (req, res) => {
    const { Tipo_Cliente, Id_Empresa } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Tipo_Cliente', sql.VarChar(255), Tipo_Cliente)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .query(`INSERT INTO dbo.Tb_TipoCliente (Tipo_Cliente, Id_Empresa)
                    VALUES (@Tipo_Cliente, @Id_Empresa);
                    SELECT SCOPE_IDENTITY() AS ID;`);

        const tipoClienteId = result.recordset[0].ID;

        res.status(201).json({
            message: 'Tipo de Cliente creado exitosamente',
            tipoClienteId,
            Tipo_Cliente,
            Id_Empresa
        });
    } catch (error) {
        console.error('Error al intentar crear tipo de cliente:', error);
        res.status(500).send('Error al crear tipo de cliente');
    }
};

// Listar Tipo Cliente
const readTipoClientes = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_TipoCliente');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo Tipos Clientes:', error);
        res.status(500).send('Error al obtener tipos de clientes');
    }
};

// Editar Tipo Cliente
const updateTipoCliente = async (req, res) => {
    const { id } = req.params;
    const { Tipo_Cliente, Id_Empresa } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ID', sql.Int, id)
            .input('Tipo_Cliente', sql.VarChar(255), Tipo_Cliente)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .query(`UPDATE dbo.Tb_TipoCliente 
                    SET Tipo_Cliente = @Tipo_Cliente, Id_Empresa = @Id_Empresa 
                    WHERE ID = @ID`);

        res.status(200).json({
            message: 'Tipo de Cliente actualizado exitosamente',
            affectedRows: result.rowsAffected[0]
        });
    } catch (error) {
        console.error('Error al actualizar tipo de cliente:', error);
        res.status(500).send('Error al actualizar tipo de cliente');
    }
};

// Eliminar Tipo Cliente
const deleteTipoCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ID', sql.Int, id)
            .query(`DELETE FROM dbo.Tb_TipoCliente WHERE ID = @ID`);

        res.status(200).json({
            message: 'Tipo de Cliente eliminado exitosamente',
            affectedRows: result.rowsAffected[0]
        });
    } catch (error) {
        console.error('Error al eliminar tipo de cliente:', error);
        res.status(500).send('Error al eliminar tipo de cliente');
    }
};

module.exports = {
    createTipoClientes,
    readTipoClientes,
    updateTipoCliente,
    deleteTipoCliente
};
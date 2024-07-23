"use strict";

const { sql, poolPromise } = require('../database/dbConfig');

// Crear Tareas Pendientes
const createTareas = async (req, res) => {
    const { Id_Empresa, Id_tarea, Hora, Novedad, Archivo, Leido, Id_Destinatario } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Id_tarea', sql.Int, Id_tarea)
            .input('Hora', sql.DateTime, Hora)
            .input('Novedad', sql.NVarChar, Novedad)
            .input('Archivo', sql.NVarChar, Archivo)
            .input('Leido', sql.Bit, Leido)
            .input('Id_Destinatario', sql.Int, Id_Destinatario)
            .query(`INSERT INTO dbo.Tb_TareasPendientesHistorial 
                    (Id_Empresa, Id_tarea, Hora, Novedad, Archivo, Leido, Id_Destinatario)
                    VALUES (@Id_Empresa, @Id_tarea, @Hora, @Novedad, @Archivo, @Leido, @Id_Destinatario);
                    SELECT SCOPE_IDENTITY() AS Id_Novedad;`);

        const idNovedad = result.recordset[0].Id_Novedad;

        res.status(201).json({
            message: 'Novedad creada exitosamente',
            idNovedad,
            Id_Empresa,
            Id_tarea,
            Hora,
            Novedad,
            Archivo,
            Leido,
            Id_Destinatario
        });
    } catch (error) {
        console.error('Error al intentar crear la novedad:', error);
        res.status(500).send('Error al crear la novedad');
    }
};

// Listar Tareas Pendientes
const readTareas = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_TareasPendientesHistorial');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo las novedades:', error);
        res.status(500).send('Error al obtener las novedades');
    }
};

// Editar Tareas Pendientes
const updateTareas = async (req, res) => {
    const { id } = req.params;
    const { Id_Empresa, Id_tarea, Hora, Novedad, Archivo, Leido, Id_Destinatario } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id_Novedad', sql.Int, id)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Id_tarea', sql.Int, Id_tarea)
            .input('Hora', sql.DateTime, Hora)
            .input('Novedad', sql.NVarChar, Novedad)
            .input('Archivo', sql.NVarChar, Archivo)
            .input('Leido', sql.Bit, Leido)
            .input('Id_Destinatario', sql.Int, Id_Destinatario)
            .query(`UPDATE dbo.Tb_TareasPendientesHistorial 
                    SET Id_Empresa = @Id_Empresa, Id_tarea = @Id_tarea, Hora = @Hora, 
                        Novedad = @Novedad, Archivo = @Archivo, Leido = @Leido, 
                        Id_Destinatario = @Id_Destinatario 
                    WHERE Id_Novedad = @Id_Novedad`);

        res.status(200).json({
            message: 'Novedad actualizada exitosamente',
            affectedRows: result.rowsAffected[0]
        });
    } catch (error) {
        console.error('Error al actualizar la novedad:', error);
        res.status(500).send('Error al actualizar la novedad');
    }
};

// Eliminar Tareas Pendientes
const deleteTareas = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id_Novedad', sql.Int, id)
            .query('DELETE FROM dbo.Tb_TareasPendientesHistorial WHERE Id_Novedad = @Id_Novedad');

        res.status(200).json({
            message: 'Novedad eliminada exitosamente',
            affectedRows: result.rowsAffected[0]
        });
    } catch (error) {
        console.error('Error al eliminar la novedad:', error);
        res.status(500).send('Error al eliminar la novedad');
    }
};

module.exports = {
    createTareas,
    readTareas,
    updateTareas,
    deleteTareas
};

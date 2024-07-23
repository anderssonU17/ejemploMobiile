'use strict';

const { sql, poolPromise } = require('../database/dbConfig');
const { generateToken } = require('../helpers/jwt');

// Crear Usuarios
const createUsers = async (req, res) => {
    const {
        Id_Empresa, Fecha, Prefijo, Usuario, Clave, Role, Id_Empleado,
        Id_Inventario, Servidor, BaseDatos, DataBaseUser, DataBasePass,
        Conectado, Notificaciones, IngresoDatos, Sede
    } = req.body;

    // Validación de la longitud de la contraseña
    if (Clave.length <= 8) {
        return res.status(400).json({
            message: 'La contraseña debe tener más de 8 caracteres'
        });
    }

    try {
        const pool = await poolPromise;

        // Verificación de si el usuario ya existe
        let request = pool.request();
        const checkUserQuery = `SELECT * FROM dbo.Tb_Usuarios WHERE Usuario = @Usuario`;
        const userResult = await request
            .input('Usuario', sql.VarChar(255), Usuario)
            .query(checkUserQuery);

        if (userResult.recordset.length > 0) {
            return res.status(400).json({
                message: 'El nombre de usuario ya existe'
            });
        }

        // Creación del nuevo usuario
        request = pool.request();
        const query = `INSERT INTO dbo.Tb_Usuarios (Id_Empresa, Fecha, Prefijo, Usuario, Clave, Role, Id_Empleado,
                                                     Id_Inventario, Servidor, BaseDatos, DataBaseUser, DataBasePass,
                                                     Conectado, Notificaciones, IngresoDatos, Sede)
                       OUTPUT INSERTED.*
                       VALUES (@Id_Empresa, @Fecha, @Prefijo, @Usuario, @Clave, @Role, @Id_Empleado, @Id_Inventario,
                               @Servidor, @BaseDatos, @DataBaseUser, @DataBasePass, @Conectado, @Notificaciones,
                               @IngresoDatos, @Sede)`;

        const result = await request
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Fecha', sql.Date, Fecha)
            .input('Prefijo', sql.VarChar(50), Prefijo)
            .input('Usuario', sql.VarChar(255), Usuario)
            .input('Clave', sql.VarChar(255), Clave)
            .input('Role', sql.VarChar(50), Role)
            .input('Id_Empleado', sql.Int, Id_Empleado)
            .input('Id_Inventario', sql.Int, Id_Inventario)
            .input('Servidor', sql.VarChar(100), Servidor)
            .input('BaseDatos', sql.VarChar(100), BaseDatos)
            .input('DataBaseUser', sql.VarChar(50), DataBaseUser)
            .input('DataBasePass', sql.VarChar(255), DataBasePass)
            .input('Conectado', sql.Bit, Conectado)
            .input('Notificaciones', sql.Bit, Notificaciones)
            .input('IngresoDatos', sql.Bit, IngresoDatos)
            .input('Sede', sql.VarChar(50), Sede)
            .query(query);

        const user = result.recordset[0];
        const token = generateToken({ id: user.Id_Usuario, usuario: Usuario });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user,
            token
        });
    } catch (error) {
        console.error('Error al intentar crear usuario:', error);
        res.status(500).send('Error al crear usuario');
    }
};


// Listar Usuarios
const readAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_Usuarios');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).send('Error obteniendo usuarios');
    }
};

// Editar Usuarios
const updateUsers = async (req, res) => {
    const id = req.params.id;
    const {
        Id_Empresa, Fecha, Prefijo, Usuario, Clave, Role, Id_Empleado,
        Id_Inventario, Servidor, BaseDatos, DataBaseUser, DataBasePass,
        Conectado, Notificaciones, IngresoDatos, Sede 
    } = req.body;

    // Validación de la longitud de la contraseña
    if (Clave && Clave.length <= 8) {
        return res.status(400).json({
            message: 'La contraseña debe tener más de 8 caracteres'
        });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Verificación de si el usuario ya existe (si se está actualizando el nombre de usuario)
        if (Usuario) {
            const checkUserQuery = `SELECT * FROM dbo.Tb_Usuarios WHERE Usuario = @Usuario AND Id_Usuario != @id`;
            const userResult = await request
                .input('Usuario', sql.VarChar(255), Usuario)
                .input('id', sql.Int, id)
                .query(checkUserQuery);

            if (userResult.recordset.length > 0) {
                return res.status(400).json({
                    message: 'El nombre de usuario ya existe'
                });
            }
        }

        let query = 'UPDATE dbo.Tb_Usuarios SET';

        const addCondition = (field, value, sqlType) => {
            if (value !== undefined && value !== null) {
                query += ` ${field} = @${field},`;
                request.input(field, sqlType, value);
            }
        };

        addCondition('Id_Empresa', Id_Empresa, sql.Int);
        addCondition('Fecha', Fecha, sql.Date);
        addCondition('Prefijo', Prefijo, sql.VarChar(50));
        addCondition('Usuario', Usuario, sql.VarChar(255));
        addCondition('Clave', Clave, sql.VarChar(255));
        addCondition('Role', Role, sql.VarChar(50));
        addCondition('Id_Empleado', Id_Empleado, sql.Int);
        addCondition('Id_Inventario', Id_Inventario, sql.Int);
        addCondition('Servidor', Servidor, sql.VarChar(100));
        addCondition('BaseDatos', BaseDatos, sql.VarChar(100));
        addCondition('DataBaseUser', DataBaseUser, sql.VarChar(50));
        addCondition('DataBasePass', DataBasePass, sql.VarChar(255));
        addCondition('Conectado', Conectado, sql.Bit);
        addCondition('Notificaciones', Notificaciones, sql.Bit);
        addCondition('IngresoDatos', IngresoDatos, sql.DateTime);
        addCondition('Sede', Sede, sql.VarChar(50));

        query = query.slice(0, -1) + ` WHERE Id_Usuario = @id`;
        request.input('id', sql.Int, id);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Obtener los datos actualizados del usuario
        const updatedUser = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM dbo.Tb_Usuarios WHERE Id_Usuario = @id');

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: updatedUser.recordset[0]
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar usuario');
    }
};

// Eliminar Usuarios
const deleteUsers = async (req, res) => {
    const { Id_Empleado } = req.params;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Id_Empleado', sql.Int, Id_Empleado);

        const query = 'DELETE FROM dbo.Tb_Usuarios WHERE Id_Empleado = @Id_Empleado';
        
        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error al eliminar usuario');
    }
};

// Login
const loginUser = async (req, res) => {
    const { Usuario, Clave } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const query = `SELECT * FROM dbo.Tb_Usuarios WHERE Usuario = @Usuario`;
        const result = await request
            .input('Usuario', sql.VarChar(50), Usuario)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const user = result.recordset[0];

        // Comparar la contraseña directamente
        if (Clave !== user.Clave) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = generateToken({ id: user.Id_Usuario, usuario: Usuario });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user,
            token
        });
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        res.status(500).send('Error al intentar iniciar sesión');
    }
};

module.exports = {
    createUsers,
    readAllUsers,
    updateUsers,
    deleteUsers,
    loginUser
};
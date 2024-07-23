const bcrypt = require('bcrypt');

class User {
    constructor(
        Id_Empresa, Fecha, Prefijo, Usuario, Clave, Role, Id_Empleado, 
        Id_Inventario, Servidor, BaseDatos, DataBaseUser, DataBasePass, 
        Conectado, Notificaciones, IngresoDatos, Sede)
    {
        this.Id_Empresa = Id_Empresa;
        this.Fecha = Fecha;
        this.Prefijo = Prefijo;
        this.Usuario = Usuario;
        this.Clave = Clave;
        this.Role = Role;
        this.Id_Empleado = Id_Empleado;
        this.Id_Inventario = Id_Inventario;
        this.Servidor = Servidor;
        this.BaseDatos = BaseDatos;
        this.DataBaseUser = DataBaseUser;
        this.DataBasePass = DataBasePass;
        this.Conectado = Conectado;
        this.Notificaciones = Notificaciones;
        this.IngresoDatos = IngresoDatos;
        this.Sede = Sede;
    }

    static async hashPassword(Clave) {
        const saltRounds = 10;
        return await bcrypt.hash(Clave, saltRounds);
    }
}

module.exports = User;
'use strict';

const { sql, poolPromise } = require('../database/dbConfig');

// Crear Cliente
const createCliente = async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const {
        Ruta, Negocio, Nombre, Municipio, Departamento, Colonia, Zona, Dia, NoCasa, Direccion, GPS,
        GpsAntiguo, GpsCodGeo, GpsDireccion, GpsDireccionExactitud, Fecha_Alta, Orden_Visita, Telefono, NombreEncargado,
        TelEncargado, Celular, Id_CalleAvenida, NombreFactura, NIT, Tipo, Id_Punto, Id_PuntoAnterior, Id_Colonia,
        ViaTelefono, Id_Empleado, Depurado, Repetido, Id_Empresa, Correo, Observaciones, ColorEstado, Orden, Id_SedeCentral,
        imei, Activo, Eliminado, Fecha_Baja, TipoInfo, ChatId, Autorizacion, Estado, GpsCheck, Verificado, Whatsapp, EnAgendaWapp,
        EnFacebook, Facebook, Consumo, Envases, Year2, TipoCliente, EstadoCallCenter, PuntoBackup, GPON, Marca, Perdido, UltV,
        UltC, EstadoHoy, UltEstado, UltVendedor, NombreCalle, NombreZona, ModPuntoAnterior, RecordatorioCobro, Reclamo,
        UltimoMes, UltimoAno, Monto, PagadoHasta, Servicio, UltimoPago, Reprogramado
    } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Consulta SQL para insertar los datos del cliente
        const query = `INSERT INTO dbo.Tb_Sectorizacion_Clientes (
                          Ruta, Negocio, Nombre, Municipio, Departamento, Colonia, Zona, Dia, NoCasa,
                          Direccion, GPS, GpsAntiguo, GpsCodGeo, GpsDireccion, GpsDireccionExactitud, Fecha_Alta,
                          Orden_Visita, Telefono, NombreEncargado, TelEncargado, Celular, Id_CalleAvenida,
                          NombreFactura, NIT, Tipo, Id_Punto, Id_PuntoAnterior, Id_Colonia, ViaTelefono, Id_Empleado,
                          Depurado, Repetido, Id_Empresa, Correo, Observaciones, ColorEstado, Orden, Id_SedeCentral,
                          imei, Activo, Eliminado, Fecha_Baja, TipoInfo, ChatId, Autorizacion, Estado, GpsCheck,
                          Verificado, Whatsapp, EnAgendaWapp, EnFacebook, Facebook, Consumo, Envases, Year2,
                          TipoCliente, EstadoCallCenter, PuntoBackup, GPON, Marca, Perdido, UltV, UltC, EstadoHoy,
                          UltEstado, UltVendedor, NombreCalle, NombreZona, ModPuntoAnterior, RecordatorioCobro,
                          Reclamo, UltimoMes, UltimoAno, Monto, PagadoHasta, Servicio, UltimoPago, Reprogramado
                       )
                       OUTPUT INSERTED.*
                       VALUES (
                          @Ruta, @Negocio, @Nombre, @Municipio, @Departamento, @Colonia, @Zona, @Dia,
                          @NoCasa, @Direccion, @GPS, @GpsAntiguo, @GpsCodGeo, @GpsDireccion, @GpsDireccionExactitud,
                          @Fecha_Alta, @Orden_Visita, @Telefono, @NombreEncargado, @TelEncargado, @Celular,
                          @Id_CalleAvenida, @NombreFactura, @NIT, @Tipo, @Id_Punto, @Id_PuntoAnterior, @Id_Colonia,
                          @ViaTelefono, @Id_Empleado, @Depurado, @Repetido, @Id_Empresa, @Correo, @Observaciones,
                          @ColorEstado, @Orden, @Id_SedeCentral, @imei, @Activo, @Eliminado, @Fecha_Baja, @TipoInfo,
                          @ChatId, @Autorizacion, @Estado, @GpsCheck, @Verificado, @Whatsapp, @EnAgendaWapp,
                          @EnFacebook, @Facebook, @Consumo, @Envases, @Year2, @TipoCliente, @EstadoCallCenter,
                          @PuntoBackup, @GPON, @Marca, @Perdido, @UltV, @UltC, @EstadoHoy, @UltEstado, @UltVendedor,
                          @NombreCalle, @NombreZona, @ModPuntoAnterior, @RecordatorioCobro, @Reclamo, @UltimoMes,
                          @UltimoAno, @Monto, @PagadoHasta, @Servicio, @UltimoPago, @Reprogramado
                       )`;

        // Ejecutar la consulta
        const result = await request
            .input('Ruta', sql.NVarChar(15), Ruta)
            .input('Negocio', sql.NVarChar(500), Negocio)
            .input('Nombre', sql.NVarChar(500), Nombre)
            .input('Municipio', sql.NVarChar(50), Municipio)
            .input('Departamento', sql.NVarChar(50), Departamento)
            .input('Colonia', sql.NVarChar(100), Colonia)
            .input('Zona', sql.NVarChar(50), Zona)
            .input('Dia', sql.Int, Dia)
            .input('NoCasa', sql.NVarChar(20), NoCasa)
            .input('Direccion', sql.NVarChar(500), Direccion)
            .input('GPS', sql.NVarChar(100), GPS)
            .input('GpsAntiguo', sql.NVarChar(50), GpsAntiguo)
            .input('GpsCodGeo', sql.NVarChar(50), GpsCodGeo)
            .input('GpsDireccion', sql.NVarChar(100), GpsDireccion)
            .input('GpsDireccionExactitud', sql.Int, GpsDireccionExactitud)
            .input('Fecha_Alta', sql.DateTime, Fecha_Alta)
            .input('Orden_Visita', sql.Int, Orden_Visita)
            .input('Telefono', sql.NVarChar(10), Telefono)
            .input('NombreEncargado', sql.NVarChar(150), NombreEncargado)
            .input('TelEncargado', sql.NVarChar(35), TelEncargado)
            .input('Celular', sql.NVarChar(50), Celular)
            .input('Id_CalleAvenida', sql.Int, Id_CalleAvenida)
            .input('NombreFactura', sql.NVarChar(150), NombreFactura)
            .input('NIT', sql.NVarChar(20), NIT)
            .input('Tipo', sql.NVarChar(30), Tipo)
            .input('Id_Punto', sql.Int, Id_Punto)
            .input('Id_PuntoAnterior', sql.Int, Id_PuntoAnterior)
            .input('Id_Colonia', sql.Int, Id_Colonia)
            .input('ViaTelefono', sql.Bit, ViaTelefono)
            .input('Id_Empleado', sql.Int, Id_Empleado)
            .input('Depurado', sql.Bit, Depurado)
            .input('Repetido', sql.Bit, Repetido)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Correo', sql.NVarChar(100), Correo)
            .input('Observaciones', sql.NVarChar(sql.MAX), Observaciones)
            .input('ColorEstado', sql.NVarChar(20), ColorEstado)
            .input('Orden', sql.Int, Orden)
            .input('Id_SedeCentral', sql.Int, Id_SedeCentral)
            .input('imei', sql.NVarChar(50), imei)
            .input('Activo', sql.Bit, Activo)
            .input('Eliminado', sql.NVarChar(50), Eliminado)
            .input('Fecha_Baja', sql.DateTime, Fecha_Baja)
            .input('TipoInfo', sql.NVarChar(50), TipoInfo)
            .input('ChatId', sql.NVarChar(50), ChatId)
            .input('Autorizacion', sql.Int, Autorizacion)
            .input('Estado', sql.NVarChar(50), Estado)
            .input('GpsCheck', sql.Int, GpsCheck)
            .input('Verificado', sql.NVarChar(100), Verificado)
            .input('Whatsapp', sql.NVarChar(100), Whatsapp)
            .input('EnAgendaWapp', sql.NVarChar(100), EnAgendaWapp)
            .input('EnFacebook', sql.NVarChar(100), EnFacebook)
            .input('Facebook', sql.NVarChar(150), Facebook)
            .input('Consumo', sql.Int, Consumo)
            .input('Envases', sql.Int, Envases)
            .input('Year2', sql.Int, Year2)
            .input('TipoCliente', sql.NVarChar(1), TipoCliente)
            .input('EstadoCallCenter', sql.NVarChar(50), EstadoCallCenter)
            .input('PuntoBackup', sql.Int, PuntoBackup)
            .input('GPON', sql.NVarChar(500), GPON)
            .input('Marca', sql.NVarChar(1), Marca)
            .input('Perdido', sql.Int, Perdido)
            .input('UltV', sql.DateTime, UltV)
            .input('UltC', sql.DateTime, UltC)
            .input('EstadoHoy', sql.Int, EstadoHoy)
            .input('UltEstado', sql.Int, UltEstado)
            .input('UltVendedor', sql.Int, UltVendedor)
            .input('NombreCalle', sql.NVarChar(150), NombreCalle)
            .input('NombreZona', sql.NVarChar(150), NombreZona)
            .input('ModPuntoAnterior', sql.Bit, ModPuntoAnterior)
            .input('RecordatorioCobro', sql.DateTime, RecordatorioCobro)
            .input('Reclamo', sql.Int, Reclamo)
            .input('UltimoMes', sql.Int, UltimoMes)
            .input('UltimoAno', sql.Int, UltimoAno)
            .input('Monto', sql.Money, Monto)
            .input('PagadoHasta', sql.NVarChar(100), PagadoHasta)
            .input('Servicio', sql.Int, Servicio)
            .input('UltimoPago', sql.NVarChar(100), UltimoPago)
            .input('Reprogramado', sql.DateTime, Reprogramado)
            .query(query);

        const cliente = result.recordset[0];
        res.status(201).json({
            message: 'Cliente creado exitosamente',
            cliente
        });
    } catch (error) {
        console.error('Error al intentar crear cliente:', error);
        res.status(500).send('Error al crear cliente');
    }
};

// Listar Clientes con paginación utilizando ROW_NUMBER()
const readAllClientes = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_Sectorizacion_Clientes');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo clientes:', error);
        res.status(500).send('Error obteniendo clientes');
    }
};

// Editar Cliente
const updateCliente = async (req, res) => {
    const id = req.params.id;
    const {
        Ruta, Negocio, Nombre, Municipio, Departamento, Colonia, Zona, Dia, NoCasa, Direccion, GPS,
        GpsAntiguo, GpsCodGeo, GpsDireccion, GpsDireccionExactitud, Fecha_Alta, Orden_Visita, Telefono, NombreEncargado,
        TelEncargado, Celular, Id_CalleAvenida, NombreFactura, NIT, Tipo, Id_Punto, Id_PuntoAnterior, Id_Colonia,
        ViaTelefono, Id_Empleado, Depurado, Repetido, Id_Empresa, Correo, Observaciones, ColorEstado, Orden, Id_SedeCentral,
        imei, Activo, Eliminado, Fecha_Baja, TipoInfo, ChatId, Autorizacion, Estado, GpsCheck, Verificado, Whatsapp, EnAgendaWapp,
        EnFacebook, Facebook, Consumo, Envases, Year2, TipoCliente, EstadoCallCenter, PuntoBackup, GPON, Marca, Perdido, UltV,
        UltC, EstadoHoy, UltEstado, UltVendedor, NombreCalle, NombreZona, ModPuntoAnterior, RecordatorioCobro, Reclamo,
        UltimoMes, UltimoAno, Monto, PagadoHasta, Servicio, UltimoPago, Reprogramado
    } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        let query = 'UPDATE dbo.Tb_Sectorizacion_Clientes SET';

        const addCondition = (field, value, sqlType) => {
            if (value !== undefined && value !== null) {
                query += ` ${field} = @${field},`;
                request.input(field, sqlType, value);
            }
        };

        addCondition('Ruta', Ruta, sql.NVarChar(15));
        addCondition('Negocio', Negocio, sql.NVarChar(500));
        addCondition('Nombre', Nombre, sql.NVarChar(500));
        addCondition('Municipio', Municipio, sql.NVarChar(50));
        addCondition('Departamento', Departamento, sql.NVarChar(50));
        addCondition('Colonia', Colonia, sql.NVarChar(100));
        addCondition('Zona', Zona, sql.NVarChar(50));
        addCondition('Dia', Dia, sql.Int);
        addCondition('NoCasa', NoCasa, sql.NVarChar(20));
        addCondition('Direccion', Direccion, sql.NVarChar(500));
        addCondition('GPS', GPS, sql.NVarChar(100));
        addCondition('GpsAntiguo', GpsAntiguo, sql.NVarChar(50));
        addCondition('GpsCodGeo', GpsCodGeo, sql.NVarChar(50));
        addCondition('GpsDireccion', GpsDireccion, sql.NVarChar(100));
        addCondition('GpsDireccionExactitud', GpsDireccionExactitud, sql.Int);
        addCondition('Fecha_Alta', Fecha_Alta, sql.DateTime);
        addCondition('Orden_Visita', Orden_Visita, sql.Int);
        addCondition('Telefono', Telefono, sql.NVarChar(10));
        addCondition('NombreEncargado', NombreEncargado, sql.NVarChar(150));
        addCondition('TelEncargado', TelEncargado, sql.NVarChar(35));
        addCondition('Celular', Celular, sql.NVarChar(50));
        addCondition('Id_CalleAvenida', Id_CalleAvenida, sql.Int);
        addCondition('NombreFactura', NombreFactura, sql.NVarChar(150));
        addCondition('NIT', NIT, sql.NVarChar(20));
        addCondition('Tipo', Tipo, sql.NVarChar(30));
        addCondition('Id_Punto', Id_Punto, sql.Int);
        addCondition('Id_PuntoAnterior', Id_PuntoAnterior, sql.Int);
        addCondition('Id_Colonia', Id_Colonia, sql.Int);
        addCondition('ViaTelefono', ViaTelefono, sql.Bit);
        addCondition('Id_Empleado', Id_Empleado, sql.Int);
        addCondition('Depurado', Depurado, sql.Bit);
        addCondition('Repetido', Repetido, sql.Bit);
        addCondition('Id_Empresa', Id_Empresa, sql.Int);
        addCondition('Correo', Correo, sql.NVarChar(100));
        addCondition('Observaciones', Observaciones, sql.NVarChar(sql.MAX));
        addCondition('ColorEstado', ColorEstado, sql.NVarChar(20));
        addCondition('Orden', Orden, sql.Int);
        addCondition('Id_SedeCentral', Id_SedeCentral, sql.Int);
        addCondition('imei', imei, sql.NVarChar(50));
        addCondition('Activo', Activo, sql.Bit);
        addCondition('Eliminado', Eliminado, sql.NVarChar(1));
        addCondition('Fecha_Baja', Fecha_Baja, sql.DateTime);
        addCondition('TipoInfo', TipoInfo, sql.NVarChar(50));
        addCondition('ChatId', ChatId, sql.NVarChar(50));
        addCondition('Autorizacion', Autorizacion, sql.Int);
        addCondition('Estado', Estado, sql.NVarChar(50));
        addCondition('GpsCheck', GpsCheck, sql.Int);
        addCondition('Verificado', Verificado, sql.NVarChar(1));
        addCondition('Whatsapp', Whatsapp, sql.NVarChar(1));
        addCondition('EnAgendaWapp', EnAgendaWapp, sql.NVarChar(1));
        addCondition('EnFacebook', EnFacebook, sql.NVarChar(1));
        addCondition('Facebook', Facebook, sql.NVarChar(150));
        addCondition('Consumo', Consumo, sql.Int);
        addCondition('Envases', Envases, sql.Int);
        addCondition('Year2', Year2, sql.Int);
        addCondition('TipoCliente', TipoCliente, sql.NVarChar(1));
        addCondition('EstadoCallCenter', EstadoCallCenter, sql.NVarChar(50));
        addCondition('PuntoBackup', PuntoBackup, sql.Int);
        addCondition('GPON', GPON, sql.NVarChar(500));
        addCondition('Marca', Marca, sql.NVarChar(1));
        addCondition('Perdido', Perdido, sql.Int);
        addCondition('UltV', UltV, sql.DateTime);
        addCondition('UltC', UltC, sql.DateTime);
        addCondition('EstadoHoy', EstadoHoy, sql.Int);
        addCondition('UltEstado', UltEstado, sql.Int);
        addCondition('UltVendedor', UltVendedor, sql.Int);
        addCondition('NombreCalle', NombreCalle, sql.NVarChar(150));
        addCondition('NombreZona', NombreZona, sql.NVarChar(150));
        addCondition('ModPuntoAnterior', ModPuntoAnterior, sql.Bit);
        addCondition('RecordatorioCobro', RecordatorioCobro, sql.DateTime);
        addCondition('Reclamo', Reclamo, sql.Int);
        addCondition('UltimoMes', UltimoMes, sql.Int);
        addCondition('UltimoAno', UltimoAno, sql.Int);
        addCondition('Monto', Monto, sql.Money);
        addCondition('PagadoHasta', PagadoHasta, sql.NVarChar(100));
        addCondition('Servicio', Servicio, sql.Int);
        addCondition('UltimoPago', UltimoPago, sql.NVarChar(100));
        addCondition('Reprogramado', Reprogramado, sql.DateTime);

        query = query.slice(0, -1) + ` WHERE Id_Cliente = @id`;
        request.input('id', sql.Int, id);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Cliente no encontrado');
        }

        // Obtener los datos actualizados del cliente
        const updatedCliente = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM dbo.Tb_Sectorizacion_Clientes WHERE Id_Cliente = @id');

        res.status(200).json({
            message: 'Cliente actualizado correctamente',
            cliente: updatedCliente.recordset[0]
        });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).send('Error al actualizar cliente');
    }
};

// Eliminar Cliente
const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('id', sql.Int, id);

        const query = 'DELETE FROM dbo.Tb_Sectorizacion_Clientes WHERE Id_Cliente = @id';
        
        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Cliente no encontrado');
        }

        res.status(200).send('Cliente eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).send('Error al eliminar cliente');
    }
};

// Buscador
const searchClientes = async (req, res) => {
    const term = req.query.term || '';
    const sort = req.query.sort || 'name-asc';

    let orderBy = '';
    if (sort === 'name-asc') {
        orderBy = 'Nombre ASC';
    } else if (sort === 'name-desc') {
        orderBy = 'Nombre DESC';
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const query = `
            SELECT * FROM dbo.Tb_Sectorizacion_Clientes
            WHERE Nombre LIKE '%' + @term + '%'
            ORDER BY ${orderBy}
        `;

        request.input('term', sql.NVarChar, term);

        const result = await request.query(query);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error searching clients:', error);
        res.status(500).send('Error searching clients');
    }
};

module.exports = {
    createCliente,
    readAllClientes,
    updateCliente,
    deleteCliente,
    searchClientes
};
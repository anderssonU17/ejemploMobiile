'use strict';

const { sql, poolPromise } = require('../database/dbConfig');

// Crear Bodega
const createProduct = async (req, res) => {
    const { Orden, Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_ProductoRelacionado, Id_ProductoParent, Unidad_Medida, Costo, StockMinimo, StockActual, Fecha, Id_Productos, Comision, Categoria, tags, Grupo, Puntos, SupCuadre, SubGrupo, Idproducto, FardoUnd, ProfileMKT } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        const query = `
            INSERT INTO dbo.Tb_Bodega_MateriaPrima (Orden, Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_ProductoRelacionado, Id_ProductoParent, Unidad_Medida, Costo, StockMinimo, StockActual, Fecha, Id_Productos, Comision, Categoria, tags, Grupo, Puntos, SupCuadre, SubGrupo, Idproducto, FardoUnd, ProfileMKT)
            OUTPUT INSERTED.*
            VALUES (@Orden, @Id_Empresa, @Nombre, @Descripcion, @Color, @Tamaño, @Clase, @Precio, @Precio_Promedio, @Vigente, @Id_Proveedor, @Id_ProductoRelacionado, @Id_ProductoParent, @Unidad_Medida, @Costo, @StockMinimo, @StockActual, @Fecha, @Id_Productos, @Comision, @Categoria, @tags, @Grupo, @Puntos, @SupCuadre, @SubGrupo, @Idproducto, @FardoUnd, @ProfileMKT)`;

        const result = await request
            .input('Orden', sql.Int, Orden)
            .input('Id_Empresa', sql.Int, Id_Empresa)
            .input('Nombre', sql.NVarChar(50), Nombre)
            .input('Descripcion', sql.NVarChar(250), Descripcion)
            .input('Color', sql.NVarChar(50), Color)
            .input('Tamaño', sql.NVarChar(50), Tamaño)
            .input('Clase', sql.NVarChar(50), Clase)
            .input('Precio', sql.Money, Precio)
            .input('Precio_Promedio', sql.Money, Precio_Promedio)
            .input('Vigente', sql.Bit, Vigente)
            .input('Id_Proveedor', sql.Int, Id_Proveedor)
            .input('Id_ProductoRelacionado', sql.Int, Id_ProductoRelacionado)
            .input('Id_ProductoParent', sql.Int, Id_ProductoParent)
            .input('Unidad_Medida', sql.NVarChar(50), Unidad_Medida)
            .input('Costo', sql.Money, Costo)
            .input('StockMinimo', sql.Int, StockMinimo)
            .input('StockActual', sql.Int, StockActual)
            .input('Fecha', sql.DateTime, Fecha)
            .input('Id_Productos', sql.Int, Id_Productos)
            .input('Comision', sql.Money, Comision)
            .input('Categoria', sql.Int, Categoria)
            .input('tags', sql.NVarChar(sql.MAX), tags)
            .input('Grupo', sql.NVarChar(50), Grupo)
            .input('Puntos', sql.Int, Puntos)
            .input('SupCuadre', sql.Bit, SupCuadre)
            .input('SubGrupo', sql.NVarChar(50), SubGrupo)
            .input('Idproducto', sql.Int, Idproducto)
            .input('FardoUnd', sql.Int, FardoUnd)
            .input('ProfileMKT', sql.NVarChar(200), ProfileMKT)
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

// Listar Bodega
const readAllProducts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM dbo.Tb_Bodega_MateriaPrima');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).send('Error obteniendo productos');
    }
};

// Editar Bodega
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { Orden, Id_Empresa, Nombre, Descripcion, Color, Tamaño, Clase, Precio, Precio_Promedio, Vigente, Id_Proveedor, Id_ProductoRelacionado, Id_ProductoParent, Unidad_Medida, Costo, StockMinimo, StockActual, Fecha, Id_Productos, Comision, Categoria, tags, Grupo, Puntos, SupCuadre, SubGrupo, Idproducto, FardoUnd, ProfileMKT } = req.body;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        let query = 'UPDATE dbo.Tb_Bodega_MateriaPrima SET';
        
        const addCondition = (field, value, sqlType) => {
            if (value !== undefined && value !== null) {
                query += ` ${field} = @${field},`;
                request.input(field, sqlType, value);
            }
        };

        addCondition('Orden', Orden, sql.Int);
        addCondition('Id_Empresa', Id_Empresa, sql.Int);
        addCondition('Nombre', Nombre, sql.NVarChar(50));
        addCondition('Descripcion', Descripcion, sql.NVarChar(250));
        addCondition('Color', Color, sql.NVarChar(50));
        addCondition('Tamaño', Tamaño, sql.NVarChar(50));
        addCondition('Clase', Clase, sql.NVarChar(50));
        addCondition('Precio', Precio, sql.Money);
        addCondition('Precio_Promedio', Precio_Promedio, sql.Money);
        addCondition('Vigente', Vigente, sql.Bit);
        addCondition('Id_Proveedor', Id_Proveedor, sql.Int);
        addCondition('Id_ProductoRelacionado', Id_ProductoRelacionado, sql.Int);
        addCondition('Id_ProductoParent', Id_ProductoParent, sql.Int);
        addCondition('Unidad_Medida', Unidad_Medida, sql.NVarChar(50));
        addCondition('Costo', Costo, sql.Money);
        addCondition('StockMinimo', StockMinimo, sql.Int);
        addCondition('StockActual', StockActual, sql.Int);
        addCondition('Fecha', Fecha, sql.DateTime);
        addCondition('Id_Productos', Id_Productos, sql.Int);
        addCondition('Comision', Comision, sql.Money);
        addCondition('Categoria', Categoria, sql.Int);
        addCondition('tags', tags, sql.NVarChar(sql.MAX));
        addCondition('Grupo', Grupo, sql.NVarChar(50));
        addCondition('Puntos', Puntos, sql.Int);
        addCondition('SupCuadre', SupCuadre, sql.Bit);
        addCondition('SubGrupo', SubGrupo, sql.NVarChar(50));
        addCondition('Idproducto', Idproducto, sql.Int);
        addCondition('FardoUnd', FardoUnd, sql.Int);
        addCondition('ProfileMKT', ProfileMKT, sql.NVarChar(200));

        query = query.slice(0, -1) + ` WHERE Id_Producto = @id`;
        request.input('id', sql.Int, id);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        const updatedProduct = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM dbo.Tb_Bodega_MateriaPrima WHERE Id_Producto = @id');

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            product: updatedProduct.recordset[0]
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
};

// Eliminar Bodega
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Id_Producto', sql.Int, id);

        const query = 'DELETE FROM dbo.Tb_Bodega_MateriaPrima WHERE Id_Producto = @Id_Producto';
        
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

// Buscar bodegas por nombre o descripción
const searchBodega = async (req, res) => {
    const term = req.query.term || '';

    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Usamos un wildcard % para hacer la búsqueda LIKE
        const query = `
            SELECT * FROM dbo.Tb_Bodega_MateriaPrima 
            WHERE Nombre LIKE '%' + @term + '%' 
            OR Descripcion LIKE '%' + @term + '%'
        `;

        request.input('term', sql.VarChar, term);

        const result = await request.query(query);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).send('Error al buscar productos');
    }
};


module.exports = {
    createProduct,
    readAllProducts,
    updateProduct,
    deleteProduct,
    searchBodega
};
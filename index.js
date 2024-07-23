'use strict'

const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/user.routes');
const tipoClienteRoutes = require('./src/routes/tipoCliente.routes');
const tareasPendientesRoutes = require('./src/routes/tareasPendientes.routes');
const productosRoutes = require('./src/routes/producto.routes');
const bodegaPrimaria = require('./src/routes/bodegaPrimaria.routes')
const sectorizacionCliente = require('./src/routes/sectorizacionClientes.routes');

app.use(express.json());
// Configurar CORS
app.use(cors());


app.use('/api', 
    userRoutes,
    tipoClienteRoutes,
    tareasPendientesRoutes,
    productosRoutes,
    bodegaPrimaria,
    sectorizacionCliente
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

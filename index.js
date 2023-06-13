const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const routesUsuarios = require('./src/routes/usuarioRoutes');
const routesPacientes = require('./src/routes/pacienteRoutes');
const routesConsultas = require('./src/routes/consultaRoutes');
const routesExame_laboratorial = require('./src/routes/exame_laboratorialRoutes');
const routesMedida_antropometrica = require('./src/routes/Medida_antropometricaRoutes');
const routesPlano_alimentar = require('./src/routes/Plano_alimentarRoutes');
const routesRefeicao = require('./src/routes/refeicaoRoutes');
const cors = require('cors');
const routesAlimentos = require('./src/routes/alimentoRoutes');
const refeicao_alimentoRoutes = require('./src/routes/refeicao_alimentoRoutes');
require('dotenv').config();


const app = express();
app.use(cors())
app.use(express.json());
app.use(routesUsuarios);
app.use(routesPacientes);
app.use(routesConsultas);
app.use(routesExame_laboratorial);
app.use(routesMedida_antropometrica);
app.use(routesPlano_alimentar);
app.use(routesRefeicao);
app.use(routesAlimentos);
app.use(refeicao_alimentoRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, () => console.log('servidor rodando'));
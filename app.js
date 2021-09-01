import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import path from 'path';
import Statistics from './models/Statistics.js';
import notFound from './routes/not-found.js';
import mainRoutes from './routes/main.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import config from './config.js';

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
});

// defining a template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// configuration express
app.use(express.static(path.join('public', 'assets')));
app.use(express.static(path.join('public', 'styles')));
app.use(express.static(path.join('public', 'scripts')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api/', apiRoutes);
app.use('/auth/', authRoutes);
app.use('/', mainRoutes);

// 404 error handling
app.use(notFound);

const start = async () => {
    try {
        mongoose.connect(
            config.mongodbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        let stat = await Statistics.findOne();

        if (!stat) {
            stat = new Statistics();
            await stat.save();
        }

        app.listen(
            PORT,
            console.log('server is started')
        );
    } catch (e) {
        console.log(e);
    }
};

start();

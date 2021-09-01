import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Statistics from '../models/Statistics.js';
import config from '../config.js';
import jwt from 'jsonwebtoken';

const catchMsg = 'Произошла неизвестная ошибка, попробуйте <a href="/">снова</a>';

const getToken = id => {
    return jwt.sign({ id }, config.secretKey);
};

class Auth {
    static async registration(req, res) {
        try {
            const { username, password } = req.body;
            const condidate = await User.findOne({ username });

            if (condidate) {
                res.status(400).send(`
                    Пользователь стаким именем уже существует.
                    Пожулйста повторите попытку
                    <a href="/auth/registration">с другим именем</a>
                `);
            }

            const user = new User({
                username,
                password: bcrypt.hashSync(password, config.saltRounds),
                tasks: []
            });
            const statistics = await Statistics.findOne();
            statistics.countUsers += 1;

            await user.save();
            await statistics.save();

            res.redirect('/login');
        } catch (e) {
            console.log(e);
            res.send(catchMsg);
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user || !bcrypt.compare(password, user.password)) {
                res.status(400).send(`
                    Нет соответствия между именем - паролем.
                    Повторите <a href="/login">Попытку</a>
                `);
            }
            // eslint-disable-next-line no-underscore-dangle
            res.redirect(`/home/${getToken(user._id)}`);
        } catch (e) {
            console.log(e);
            res.send(catchMsg);
        }
    }
}

export default Auth;

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Statistics from '../models/Statistics.js';
import config from '../config.js';

const catchMsg = `
    Произошла ошибка авторизации.
    Попробуйте <a href="/">зайти<a> снова
`;

class Api {
    static async statistics(req, res) {
        const stat = await Statistics.findOne();
        res.json(stat);
    }

    static async newTask(req, res) {
        try {
            const { value } = req.body;
            const { token } = req.params;
            const { id } = jwt.verify(token, config.secretKey);
            const stat = await Statistics.findOne();
            const user = await User.findById(id);

            user.tasks.push({ value });
            stat.countTasks += 1;

            await stat.save();
            await user.save();
            res.status(200).json(user.tasks);
        } catch (error) {
            res.status(403).send(catchMsg);
        }
    }

    static async tasks(req, res) {
        try {
            const { token } = req.params;
            const { id } = jwt.verify(token, config.secretKey);
            const user = await User.findById(id);

            res.status(200).json(user.tasks);
        } catch (error) {
            res.status(403).send(catchMsg);
        }
    }

    static async delete(req, res) {
        const { token, idx } = req.params;
        const { id } = jwt.verify(token, config.secretKey);
        const user = await User.findById(id);

        user.tasks.splice(idx, 1);
        await user.save();
        res.json(user.tasks);
    }
}

export default Api;

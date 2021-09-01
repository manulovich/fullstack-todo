import Statistics from '../models/Statistics.js';

class Main {
    static async main(req, res) {
        return res.redirect('/greetings');
    }

    static async home(req, res) {
        const { token } = req.params;

        return res.render(
            'main',
            { title: 'Главная страница', token }
        );
    }

    static async greetings(req, res) {
        const { countUsers, countTasks } = await Statistics.findOne();

        return res.render(
            'greetings',
            {
                title: 'Добро пожаловать!',
                countUsers,
                countTasks
            }
        );
    }

    static registration(req, res) {
        return res.render(
            'registration',
            { title: 'Регистрация', uri: 'registration' }
        );
    }

    static login(req, res) {
        return res.render(
            'login',
            { title: 'Войти', uri: 'login' }
        );
    }
}

export default Main;

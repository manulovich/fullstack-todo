const notFound = (req, res) => {
    res.status(404);
    res.send('Упс, страница не найдена. Вернитесь <a href="/">назад</a>');
};

export default notFound;

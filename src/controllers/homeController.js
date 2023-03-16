exports.homePage = (request, response, next) => {
    //   request.session.user = { name: 'John Doe', loggedIn: true };
    response.render('index', {
        title: 'This would be the Page Title',
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
};

exports.dealPost = (request, response, next) => {
    response.send(`Hey, I'm your newest POST route.`);
    return;
};
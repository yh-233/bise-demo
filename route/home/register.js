module.exports = (req, res) => {
    const { message } = req.query;
    res.render('home/register.art', {
        message: message
    });
}
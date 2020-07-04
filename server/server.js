var model = require('./models/message');
var database = require('./database/sqlite/sqlite.database');

const write = function (req, res) {
    console.debug('new message: ', req.body);
    try {
        const userId = req.body.userId;
        const text = req.body.message;

        const message = model.createMessage(userId, text);

        database.save(message);

        res.send(message);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const read = async (req, res) => {
    const result = await database.getAll();

    console.debug('count of messages: ', result.length)
    res.send(result);
};

exports.write = write;
exports.read = read;
var sqlite3 = require('sqlite3').verbose();
const utils = require('./utils');

const connect = () => {
    let db = new sqlite3.Database(
        "./chat.db",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) {
                console.debug('Error on database creation/connection', err);
            }
        });

    db.serialize(function () {
        db.run(
            `CREATE TABLE 
                IF NOT EXISTS chats (
                    userId TEXT, 
                    message TEXT, 
                    timestamp DATE
                )
            `,
            (err) => {
                if (err) {
                    console.log('error on creation tables', err);
                }
            });
    });
    return db;
}

const disconnect = (db) => {
    db.close();
}

const save = function (message) {
    const db = connect();
    db.run(
        `INSERT INTO chats VALUES ('${message.userId}', '${message.message}', '${message.timestamp}')`,
        (err) => {
            if (err) {
                console.log('error on save message', err);
            }
        })
    disconnect(db);
};

const getAll = async () => {
    const db = connect();
    const result = await utils.selectList(db, "SELECT * FROM chats ORDER BY timestamp ASC LIMIT 20");
    console.debug('result', result);
    disconnect(db);
    return result;
};


exports.save = save;
exports.getAll = getAll;
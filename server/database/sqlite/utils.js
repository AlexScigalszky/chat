const selectList = async (db, sql) => {
    return new Promise((resolve, reject) => {
        db.all(
            sql,
            (err, rows) => {
                if (err) {
                    reject("Read error: " + err.message);
                }
                else {
                    resolve(rows);
                }
            });
    });
};

exports.selectList = selectList;
const messages = [];

const save = function (message) {
    messages.push(message);
};

const getAll = function () {
    return messages;
};

exports.save = save;
exports.getAll = getAll;
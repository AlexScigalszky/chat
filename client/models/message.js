const createMessage = (userId, message) => {
    if (!userId){
        throw new Error('Invalid userId');
    }
    if (!message){
        throw new Error('text not valid');
    }

    return {
        userId,
        message: message,
        timestamp: new Date().getTime()
    };
};

exports.createMessage = createMessage;
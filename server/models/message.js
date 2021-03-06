const createMessage = (userId, message) => {
    if (!userId){
        throw new Error('Invalid userId');
    }
    if (!message){
        throw new Error('text not valid');
    }

    return {
        userId,
        message: message
    };
};

exports.createMessage = createMessage;
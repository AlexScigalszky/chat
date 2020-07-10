const API_URL = 'http://localhost:3000';

const models = require('./models/message');
const io = require("socket.io-client");
const ioClient = io.connect(API_URL);
const readln = require('readline');
const httpHelper = require('./http-helper');

ioClient.on("message", (msg) => {
    console.info(msg.userId + ': ' + msg.message);
});

const cl = readln.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
    terminal: false,
});
cl.prompt(true);

let userId = "Alguien";

var waitForMessage = function () {
    return new Promise((res, rej) => {
        cl.on('line', (input) => res(input));
    });
};

const fetchNewMessage = () => {
    httpHelper.get(API_URL + '/read')
        .then((data) => {
            const json = JSON.parse(data);
            console.clear();
            json.forEach(el => {

                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log(`${el.userId} : ${el.message}`);

            });
            cl.prompt(true);


        });
}

(async function main() {
    var answer = null;

    console.log('Escribe tu alias:');
    userId = await waitForMessage();

    fetchNewMessage();

    while (answer != 'exit') {
        if (answer != null) {
            ioClient.emit('message', models.createMessage(userId, answer));
        }
        // httpHelper.post(API_URL + '/write', { userId: userId, message: answer});
        answer = await waitForMessage();

    }

    console.log('');
    console.log('Apu dice: ¡gracias vuelva prontos!');
    cl.close()
})();
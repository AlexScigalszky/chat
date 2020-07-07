const readln = require('readline');
const httpHelper = require('./http-helper');

const API_URL = 'http://localhost:3000/';

const cl = readln.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
    terminal: false,
});
cl.prompt(true);

const userId = "José";



var waitForMessage = function () {
    return new Promise((res, rej) => {
        cl.on('line', (input) => res(input));
    });
};



const fetchNewMessage = () => {
    httpHelper.get(API_URL + 'read')
        .then((data) => {
            const json = JSON.parse(data);
            console.clear();
            json.forEach(el => {
                
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log(`${el.userId} : ${el.message}`);
                cl.prompt(true);
                
                // cl.pause();
                // cl.resume();
            });
        });
}

fetchNewMessage();
const interval = setInterval(fetchNewMessage, 3000);


(async function main() {
    var answer;

    while (answer != 'exit') {

        httpHelper.post(API_URL + 'write', { userId: userId, message: answer});
        console.info('este mensaje se está enviando a todas las personas que hay en este chat: ', answer);
        answer = await waitForMessage();
    }

    clearInterval(interval);

    console.log('');
    console.log('Apu dice: ¡gracias vuelva prontos!');
    cl.close()
})();
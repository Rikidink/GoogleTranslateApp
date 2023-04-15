const express =require('express');
const app=express();
const path=require('path');
const server=require('http').Server(app);
const io=require('socket.io')(server);



// io is the socket.io server
server.listen(8080);

app.use(express.static(path.join(__dirname,"dist","w12lab")));


//projectId = 'fit2095-361118' // Your GCP Project Id


const {Translate} = require('@google-cloud/translate').v2
const translate = new Translate({projectId: 'fit2095-361118'});

// listen to new clients // new connections
io.on('connection',(socket)=>{// socket is a ref to the new client


    socket.on('translate', (data)=> {

        let text = data.text;

        let target = data.target;
        let target2 = data.target2;

        //let translated = '';


        async function quickStart() {
            const [translation] = await translate.translate(text, target);
            const [translation2] = await translate.translate(text, target2);
            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);


            let obj = {
                text:text,
                translated:translation,
                translated2:translation2,
                target:target,
                target2:target2
            }

            io.emit('onFinishTranslate', obj);

        }
          
        quickStart();

        // let obj = {
        //     text:text,
        //     translated:translated
        // }

        // console.log("POOP:", obj.translated);

        //io.emit('onFinishTranslate', obj)

    })



})

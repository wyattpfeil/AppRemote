const WebSocket = require('ws');
const { exec } = require("child_process");
var cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();
  
    cluster.on('exit', function(worker, code, signal) {
        console.log("restart")
      cluster.fork();
    });
  }
  
  if (cluster.isWorker) {
    // put your code here
}

function startSocket(){
    console.log("Restarting")
    const ws = new WebSocket('https://remote-app-manageent.glitch.me/manager');
 
    ws.on('open', function open() {
      ws.send('something');
    });
    ws.on('message', function incoming(data) {
        console.log(data);
        if(data == "Stop!") {
            exec("pkill Safari", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
    });
    ws.on('close', function close(){
      startSocket()
    })
}

startSocket()
const {spawn} = require('child_process');
// spawn new child process to call the python script
const prosses = spawn('python', ['python/task_py.py'," not happy"]);
// collect data from script
prosses.stdout.on('data', function (data) {
 console.log(data.toString());
 dataToSend = data.toString();
});

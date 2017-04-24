// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
var commands = require('./commands');

function done(output) {
    process.stdout.write(output + '\n');
    process.stdout.write('prompt > ');
}

process.stdin.on('data', function (data) {
    var cmd = data.toString().trim().split(' '); // remove the newline
    var args = cmd.slice(1).join(' ');

    if (cmd[0] === 'pwd') {
        commands.pwd(args, done);
    }
    if (cmd[0] === 'date') {
        commands.date(args, done);
    }
    if (cmd[0] === 'ls') {
        commands.ls(args, done);
    }
    if (cmd[0] === 'echo') {
        commands.echo(args, done);
    }
    if (cmd[0] === 'cat'){
        commands.cat(args, done);
    }
    if (cmd[0] === 'head'){
        commands.head(args, done);
    }
    if (cmd[0] === 'tail'){
        commands.tail(args, done);
    }
    if (cmd[0] === 'sort'){
        commands.sort(args, done);
    }
    if (cmd[0] === 'wc'){
        commands.wc(args, done);
    }
    if (cmd[0] === 'uniq'){
        commands.uniq(args, done);
    }
    if (cmd[0] === 'curl'){
        commands.curl(args, done);
    }

  //process.stdout.write('You typed: ' + cmd);
});
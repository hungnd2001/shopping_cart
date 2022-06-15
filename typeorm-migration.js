var exec = require("child_process").exec;

var fileName = process.argv[2];

exec(
    `yarn typeorm -- migration:generate ./database/migration/${fileName}`,
    function (error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
            console.log("exec error: " + error);
        }
    }
);
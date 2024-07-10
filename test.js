const Parallel = require('./index');
const fs = require('fs').promises;
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

async function copyFile(num) {
    await fs.copyFile('./test.png', `./test/test${num}.png`);
}

(async()=>{
    if (argv.runs && isNaN(argv.runs)) {
        console.log('--runs is not a number');
    }
    let runs = (argv.runs ? argv.runs : 50);
    let runArray = [];
    for (let i = 1; i <= runs; i++) {
        runArray.push(i);
    }
    await Parallel.for(runArray, copyFile, { maxInProgress: 10 })
})()
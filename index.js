const throttle = require('promise-parallel-throttle');

async function execQueue(queue, options) {
	let start = new Date();
	let maxInProcess = 5;
	if (options && options.maxInProgress) {
		maxInProcess = (options.maxInProgress ? options.maxInProgress : maxInProcess)
	}
	await throttle.all(queue, {
		maxInProgress: maxInProcess,
		failFast: false,
		progressCallback: (raw) => {
			let numDone = `${raw.amountDone} / ${queue.length}`;
			let percentDone = `${100 * (raw.amountDone / queue.length)}`;
			let now = new Date();
			let duration = now - start;
			let seconds = duration / 1000;
			let avgTime = seconds / raw.amountDone
			console.log(`Completion Percent: ${numDone} ${percentDone.toString().slice(0, 5)}%\t\t Elapsed:${seconds.toString().slice(0, 5)}\t\t Avg:${avgTime.toString().slice(0, 5)}`);
		}
	});
}

module.exports = {
	for: async function (objArray, task, options) {
		let queue = [];
		for (let o in objArray) {
			o = objArray[o];
			o.__id == o;
			queue.push(async () => {
				await task(o);
			});
		}
		await execQueue(queue, options);
	}
}
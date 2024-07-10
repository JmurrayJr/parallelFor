# parallelFor
A simple library for performing parallel asynchronous tasks

Install

```
npm install parallelFor
```

Usage

```
constant Parallel = require('parallelFor');

let options = {
	maxInProcess: 10
}

// Your async function can only accept one parameter, place your parameters in an object {}
async function myAsyncFunction(jsObject){
	//async code
}

let jsObjects = [
	{ parameter1: "value1", parameter2: "value4" },
	{ parameter1: "value2", parameter2: "value5" },
	{ parameter1: "value3", parameter2: "value6" }
]

await Parallel.for(jsObjects, myAsyncFunction, options);

```
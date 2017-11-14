var inputData = "console.log(1);" 
	+ "\n" + "setTimeout(function(){ console.log(2) }, 1000);" 
	+ "\n" + "setTimeout(function(){ console.log(3) }, 0);" 
	+ "\n" + "console.log(4);";

var lines = inputData.split("\n");
for(i=0; i<lines.length; i++) {
	parseLine(lines[i]);
}

function parseLine(data) {
	var logReg = new RegExp("^console\.log\(.+\)");
	var timeoutReg = new RegExp("^setTimeout\(.+\);$");
	if(logReg.test(data)) {
		Logger(data.split("(")[1].split(")")[0]);
	}
	else if(timeoutReg.test(data)) {
		var funcBody = data.split("setTimeout(function(){ ")[1].split(" }")[0];
		var delayTime = data.split(", ")[1].split(");")[0];
		Waiter(delayTime, funcBody);
	}
}

// Implementation of console.log
function Logger(input) {
	process.stdout.write(input + "\n");
}

// Implementation of setTimeout
function Waiter(delay, body) {
	var inLoop = true;
	if(delay < 1000) {
		var millsNow = new Date().getMilliseconds();
		while(inLoop) {
			var newDate = new Date().getMilliseconds();
			if(newDate - millsNow >= delay) {
				inLoop = false;
				parseLine(body);
			}
		}
	}
	else if(delay == 1000) {
		var secNow = new Date().getSeconds();
		while(inLoop) {
			var newDate = new Date().getSeconds();
			if(newDate - secNow > 0) {
				inLoop = false;
				parseLine(body);
			}
		}
	}
}

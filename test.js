new Promise((resolve, reject) => {
	setInterval(() => {
		console.log("Interval type1");
	}, 100);
});
let connectionprojectid = "";
let newprojectid = "";
let cloudnamelist = [];
let cloudvaluelist = [];
let cloudsetvaluelist = [];

function cloud(projectid) {
	let close = false;
	cloudnamelist.push([]);
	cloudvaluelist.push([]);
	cloudsetvaluelist.push([]);
	const socket = new WebSocket('wss://clouddata.turbowarp.org/');
	
	function cloudsend(method,user,project_id,name,value) {
		socket.send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
	}
	socket.addEventListener('open', function (event) {
		cloudsend("handshake","player",projectid);
		let socketopen = window.setInterval(cloudset, 100);
		function cloudset() {
			if (close) {
				window.clearInterval(socketopen);
			}else{
				if (cloudsetvaluelist.length !== 0) {
					const cloudsetvalue = cloudsetvaluelist[Math.floor(Math.random()*cloudsetvaluelist.length)];
					cloudsend("set", "player", projectid, cloudsetvalue.name, cloudsetvalue.value);
					cloudsetvaluelist = [];
				}
			}
		}
	});
	socket.addEventListener('message', function (event) {
		const clouddatalist = event.data.split("\n");
		for (let i = 0; i < clouddatalist.length; i++){
			const clouddata = JSON.parse(clouddatalist[i]);
			if (clouddata.method === "set") {
				if (cloudnamelist.indexOf(clouddata.name) === -1 ) {
					cloudnamelist.push(clouddata.name);
					cloudvaluelist.push("");
				}
				cloudvaluelist[cloudnamelist.indexOf(clouddata.name)] = clouddata.value;
			}
		}
	});
	socket.addEventListener('close', function (event) {
		close = true;
		setTimeout(() => {
			cloud(projectid);
		}, 3000);
	}); 
}

let socketopen = window.setInterval(cloudset, 0);
function cloudset() {
	if (connectionprojectid !== newprojectid) {
		cloud(newprojectid);
		connectionprojectid = newprojectid
	}
}

class Test {
//constructor() {}
	getInfo() {
		return {
			id: 'test',
			name: 'Test',
			blocks: [
				{
					opcode: 'projectid', 
					blockType: Scratch.BlockType.COMMAND,
					text: 'プロジェクトid [projectid]',
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: ''
						}
					}
				},
				{
					opcode: 'setcloud', 
					blockType: Scratch.BlockType.COMMAND,
					text: '☁ [name] を [value] にする',
					arguments: {
						name: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: ''
						},
						value: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: ''
						}
					}
				},
				{
					opcode: 'cloudvalue', 
					blockType: Scratch.BlockType.REPORTER,
					text: '☁ [name] ',
					arguments: {
						name: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: ''
						}
					}
				}
			]
		}
	}
	
	projectid(args) {
		newprojectid = args.projectid
	}
	setcloud(args) {
		cloudsetvaluelist.push({name: "☁ " + args.name, value: args.value});
	}
	cloudvalue(args) {
		return cloudvaluelist[cloudnamelist.indexOf("☁ " + args.name)];
	}
}

Scratch.extensions.register(new Test());

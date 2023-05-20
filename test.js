let sendcloud = false;
let projectid = "";
let cloudnamelist = [];
let cloudvaluelist = [];
let socketlist = [];

cloudnamelist.push([]);
cloudvaluelist.push([]);
projectid = "";
socketlist.push(new WebSocket('wss://clouddata.turbowarp.org/'));

function cloudsend(method,user,project_id,name,value) {
	socketlist[socketlist.length - 1].send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
}
socketlist[socketlist.length - 1].addEventListener('open', function (event) {
	cloudsend("handshake","player",projectid);
	sendcloud = true;
});
socketlist[socketlist.length - 1].addEventListener('message', function (event) {
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
socketlist[socketlist.length - 1].addEventListener('close', function (event) {
	setTimeout(() => {
		socketlist.push(new WebSocket('wss://clouddata.turbowarp.org/'));
	}, 3000);
}); 

class Test {
//constructor() {}
	getInfo() {
		return {
			id: 'test',
			name: 'Test',
			blocks: [
				{
					opcode: 'projectidblock', 
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
					opcode: 'setcloudblock', 
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
					opcode: 'cloudvalueblock', 
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
	
	projectidblock(args) {
		projectid = args.projectid;
		socketlist.push(new WebSocket('wss://clouddata.turbowarp.org/'));
	}
	setcloudblock(args) {
		if (sendcloud) {
			sendcloud = false;
			cloudsend("set","player",projectid, "☁ " + args.name, args.value);
			window.setTimeout(sendtrue, 100);
			function sendtrue() {
				sendcloud = true;
			}
		}
	}
	cloudvalueblock(args) {
		return cloudvaluelist[cloudnamelist.indexOf("☁ " + args.name)];
	}
}

Scratch.extensions.register(new Test());

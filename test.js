let sendcloud = true;
let cloudnamelist = [];
let cloudvaluelist = [];
let socketlist = [];
let connectionprojectid = "";
let sendtime = performance.now();

function cloudsend(listnumber,method,user,project_id,name,value) {
	socketlist[listnumber].send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
}
function cloud() {
	const listnumber = socketlist.length;
	socketlist.push(new WebSocket('wss://clouddata.turbowarp.org/'));
	cloudnamelist = [];
	cloudvaluelist = [];
	socketlist[listnumber].addEventListener('open', function (event) {
		cloudsend(listnumber, "handshake","player",connectionprojectid);
	});
	socketlist[listnumber].addEventListener('message', function (event) {
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
	socketlist[listnumber].addEventListener('close', function (event) {
		if (listnumber === socketlist.length - 1) {
			setTimeout(() => {
				cloud();
			}, 3000);
		}
	}); 
}
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
		connectionprojectid = args.projectid;
		cloud();
	}
	setcloudblock(args) {
		if (performance.now() - sendtime > 100) {
			sendtime = performance.now();
			cloudsend(socketlist.length - 1, "set","player",connectionprojectid, "☁ " + args.name, args.value);
			cloudvaluelist[cloudnamelist.indexOf("☁ " + args.name)] = args.value;
		}
	}
	cloudvalueblock(args) {
		return cloudvaluelist[cloudnamelist.indexOf("☁ " + args.name)];
	}
}

Scratch.extensions.register(new Test());

let projectidlist = [];
let cloudvalue = [];

function cloud(projectid) {
	if (projectidlist.indexOf(projectid) === -1) {
		projectidlist.push(projectid);
		const socket = new WebSocket('wss://clouddata.turbowarp.org/');
		
		function cloudsend(method,user,project_id,name,value) {
			socket.send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
		}
		socket.addEventListener('open', function (event) {
			cloudsend("handshake","player",projectid);
		});
		socket.addEventListener('message', function (event) {
			const clouddatalist = event.data.split("\n");
			for (let i = 0; i < clouddatalist.length; i++){
				const clouddata = JSON.parse(clouddatalist[i])
				if (clouddata.method === "set") {
					cloudvalue[projectidlist.indexOf(projectid)].clouddata.name = clouddata.value ;
				}
			}
		});
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
					opcode: 'setcloud', 
					blockType: Scratch.BlockType.COMMAND,
					text: 'プロジェクトid [projectid] の☁ [name] を [value] にする',
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: ''
						},
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
					text: 'プロジェクトid [projectid] の☁ [name] ',
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: ''
						},
						name: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: ''
						}
					}
				}
			]
		}
	}
	
	setcloud(args) {
		cloud(args.projectid);
		console.log(cloudvalue);
	}
	cloudvalue(args) {
		cloud(args.projectid);
		return "パスタくんえらい！";
	}
}

Scratch.extensions.register(new Test());

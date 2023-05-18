const projectidlist = [];
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
			console.log(event.data.split("\n"));
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
		return "パスタくんえらい！";
	}
	cloudvalue(args) {
		cloud(args.projectid);
	}
}

Scratch.extensions.register(new Test());

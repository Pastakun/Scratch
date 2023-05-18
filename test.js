const user = "player";
let projectid = "";
const socket = new WebSocket('wss://clouddata.turbowarp.org/');
function cloudsend(method,user,project_id,name,value) {
	socket.send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
}
class Test {
//constructor() {}
	getInfo() {
		return {
			id: 'test',
			name: 'Test',
			blocks: [
				{
					opcode: 'cloudvalue', 
					blockType: Scratch.BlockType.REPORTER,
					text: '☁ [name]',
					arguments: {
						name: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: ''
						}
					}
				},
				{
					opcode: 'projectid', 
					blockType: Scratch.BlockType.COMMAND,
					text: 'プロジェクト[projectid]に接続する',
					arguments: {
						projectid: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: ''
						}
					}
				}
			]
		}
	}
	
	cloudvalue(args) {
		return "パスタくんえらい！";
	}
	projectid(args) {
		projectid = args.projectid
		cloudsend("handshake",user,projectid);
	}
}

Scratch.extensions.register(new Test());

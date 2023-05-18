const user = "player";
let socket = new WebSocket('wss://clouddata.turbowarp.org/');
let projectid = "";
function cloudsend(method,user,project_id,name,value) {
	socket.send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
}
socket.addEventListener('open', function (event) {
	cloudsend("handshake",user,projectid);
});
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
		socket = new WebSocket('wss://clouddata.turbowarp.org/');
	}
}

Scratch.extensions.register(new Test());

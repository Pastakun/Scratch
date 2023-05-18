const user = "player";
let projectid = "";
function connect() {
	const socket = new WebSocket('wss://clouddata.turbowarp.org/');
	//クラウド変数更新
	function cloudsend(method,user,project_id,name,value) {
		socket.send("".concat(JSON.stringify({"method":method,"user":user,"project_id":project_id,"name":name,"value":value}),"\n"));
	}
	
	// 接続が開いたときのイベント
	socket.addEventListener('open', function (event) {
		cloudsend("handshake",user,projectid);
	});
	
	// メッセージの待ち受け
	socket.addEventListener('message', function (event) {
		console.log(event.data.split("\n"));
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
		projectid = args.projectid;
		connect();
	}
}

Scratch.extensions.register(new Test());

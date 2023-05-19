let projectidlist = [];
let cloudnamelist = [];
let cloudvaluelist = [];
let cloudsetvaluelist = [];

function cloud(projectid) {
	if (projectidlist.indexOf(projectid) === -1) {
		let close = false;
		projectidlist.push(projectid);
		cloudnamelist.push([]);
		cloudvaluelist.push([]);
		cloudsetvaluelist.push([]);
		const projectidlistnumber = projectidlist.indexOf(projectid);
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
					if (cloudsetvaluelist[projectidlistnumber].length !== 0) {
						const cloudsetvalue = cloudsetvaluelist[projectidlistnumber][Math.floor(Math.random()*cloudsetvaluelist[projectidlistnumber].length)];
						cloudsend("set", "player", projectid, cloudsetvalue.name, cloudsetvalue.value);
						cloudsetvaluelist[projectidlistnumber].splice(0);
					}
				}
			}
		});
		socket.addEventListener('message', function (event) {
			const clouddatalist = event.data.split("\n");
			for (let i = 0; i < clouddatalist.length; i++){
				const clouddata = JSON.parse(clouddatalist[i]);
				if (clouddata.method === "set") {
					if (cloudnamelist[projectidlistnumber].indexOf(clouddata.name) === -1 ) {
						cloudnamelist[projectidlistnumber].push(clouddata.name);
						cloudvaluelist[projectidlistnumber].push("");
					}
					const cloudnamelistnumber = cloudnamelist[projectidlistnumber].indexOf(clouddata.name);
					cloudvaluelist[projectidlistnumber][cloudnamelistnumber] = clouddata.value;
				}
			}
		});
		socket.addEventListener('close', function (event) {
			close = true;
		    setTimeout(() => {
		    	projectidlist[projectidlistnumber] = "";
				cloud(projectid);
    		}, 3000);
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
					text: '[projectid] の☁ [name] ',
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
	
	projectid(args) {
		return new Promise((resolve, reject) => {
			cloud(args.projectid);
		});
	}
	setcloud(args) {
		cloudsetvaluelist[projectidlist.indexOf(args.projectid)].push({name: "☁ " + args.name, value: args.value});
		//console.log(projectidlist);
		//console.log(cloudnamelist);
		//console.log(cloudvaluelist);
	}
	cloudvalue(args) {
		return cloudvaluelist[projectidlist.indexOf(args.projectid)][cloudnamelist[projectidlist.indexOf(args.projectid)].indexOf("☁ " + args.name)];
	}
}

Scratch.extensions.register(new Test());

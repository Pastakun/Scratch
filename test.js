console.log(connection);
class Test {

  constructor() {}

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
}

Scratch.extensions.register(new Test());

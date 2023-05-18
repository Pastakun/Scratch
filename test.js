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
        			defaultValue: '1P'
        		}
        	}
        }
      ]
    }
  }

  cloudvalue(args) {
    return args.STRING.substring("パスタくんえらい！");
  }
}

Scratch.extensions.register(new Test());

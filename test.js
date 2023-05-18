class Test {

  constructor() {}

  getInfo() {
    return {
      id: 'test',
      name: 'Test',
      blocks: [
        {
          opcode: 'cloudvalue', 
          blockType: BlockType.REPORTER,
          text: '[value]の値を取得',
          arguments: {
          	  value: {
          	  	  type: ArgumentType.STRING,
          	  	  defaultValue: '☁ 1',
          	  },
            }
        }
      ]
    }
  }

  cloudvalue(name) {
    console.log(name);
  }
}

Scratch.extensions.register(new Test());

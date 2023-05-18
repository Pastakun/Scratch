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
          text: '[name]name',
          arguments: {
          	  value: {
          	  	  type: Scratch.ArgumentType.STRING,
          	  	  defaultValue: '1'
          	  },
            }
        }
      ]
    }
  }

  cloudvalue(args) {
    console.log(args.name);
  }
}

Scratch.extensions.register(new Test());

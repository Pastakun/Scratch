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
          text: 'name [name] name',
          arguments: {
          	  value: {
          	  	  type: Scratch.ArgumentType.STRING,
          	  	  defaultValue: 'apple'
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

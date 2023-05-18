class Test {

  constructor() {}

  getInfo() {
    return {
      id: 'test',
      name: 'Test',
      blocks: [
          {
            opcode: "letters_of",
            blockType: Scratch.BlockType.REPORTER,
            text: "letters [LETTER1] to [LETTER2] of [STRING]",
            arguments: {
              LETTER1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              LETTER2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              }
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

import readline from 'readline';
import { Game, GameCounter } from './game.class';
import { InputParameters } from './inputParameters';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gameCounter = new GameCounter();

rl.on('line', (line: string) => {

  const args = line.split(' ');
  const inputArguments = new InputParameters(args[0], args[1]);
  const game = new Game(inputArguments, gameCounter);

  game.start();

});




// const j1 = new Player();
// const j2 = new Player();
// const j3 = new Player();
// const game = new Game([j1, j2, j3]);
// const textInput = 'LR.CCR.L.RLLLCLR.LL..R...CLR.';
// game.start(textInput.split(''));



// const j1 = new Player();
// const j2 = new Player();
// const j3 = new Player();
// const j4 = new Player();
// const j5 = new Player();
// const game = new Game([j1, j2, j3, j4, j5]);
// const textInput = 'RL....C.L';
// game.start(textInput.split(''));

// const game = new Game([]);
// const textInput = '';
// game.start(textInput.split(''));


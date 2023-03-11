import { getArguments } from './args';
import { Game } from './game.class';
import { Player } from './player.class';

const [playersLength, dicesDirections] = getArguments();
const players = Array.from({ length: playersLength }, () => new Player())
const game = new Game(players, dicesDirections);

game.start();


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


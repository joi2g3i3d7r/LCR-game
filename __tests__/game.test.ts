import * as args from '../src/args';
import { Game } from '../src/game.class';
import { Player } from '../src/player.class';

// const [playersLength, dicesDirections] = getArguments();
// const players = Array.from({ length: playersLength }, () => new Player())
// const game = new Game(players, dicesDirections);

// game.showParameters();

// // Mockear la función getArguments para devolver un objeto con valores estáticos
// jest.mock('../src/args', () => ({
//   getArguments: jest.fn().mockReturnValue([3, 'LR.CCR.L.RLLLCLR.LL..R...CLR.'.split('')]),
// }));

describe('start game', () => {
  it('should show one winner with (W)', () => {
    jest.spyOn(args, 'getArguments').mockReturnValueOnce([3, 'LR.CCR.L.RLLLCLR.LL..R...CLR.'.split('')]);
    const consoleLogSpy = jest.spyOn(console, 'log');

    const [playersLength, dicesDirections] = args.getArguments();
    const players = Array.from({ length: playersLength }, () => new Player());
    const game = new Game(players, dicesDirections);

    game.start();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Player 1: 0' + '\n' +
      'Player 2: 0' + '\n' +
      'Player 3: 6(W)' + '\n' +
      'Center: 3'
    );
  });

  it('should who is the next player with (*)', () => {
    jest.spyOn(args, 'getArguments').mockReturnValueOnce([5, 'RL....C.L'.split('')]);
    const consoleLogSpy = jest.spyOn(console, 'log');

    const [playersLength, dicesDirections] = args.getArguments();
    const players = Array.from({ length: playersLength }, () => new Player());
    const game = new Game(players, dicesDirections);

    game.start();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Player 1: 1' + '\n' +
      'Player 2: 4' + '\n' +
      'Player 3: 1' + '\n' +
      'Player 4: 4(*)' + '\n' +
      'Player 5: 4' + '\n' +
      'Center: 1'
    );
  });

  it(`shouldn't show something in console if there are no players`, () => {
    jest.spyOn(args, 'getArguments').mockReturnValueOnce([0, ''.split('')]);
    const consoleLogSpy = jest.spyOn(console, 'log');

    const [playersLength, dicesDirections] = args.getArguments();
    const players = Array.from({ length: playersLength }, () => new Player());
    const game = new Game(players, dicesDirections);

    game.start();

    expect(consoleLogSpy).not.toHaveBeenCalledWith();
  });
});

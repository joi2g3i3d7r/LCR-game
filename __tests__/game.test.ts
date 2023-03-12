import { Game, GameCounter } from '../src/game.class';
import { InputParameters } from '../src/inputParameters';

describe('test game', () => {
  it('should show one winner with (W)', () => {
    const inputParams = new InputParameters('3', 'LR.CCR.L.RLLLCLR.LL..R...CLR.');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);

    const consoleLogSpy = jest.spyOn(console, 'log');

    game.start();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Game: 1' + '\n' +
      'Player 1: 0' + '\n' +
      'Player 2: 0' + '\n' +
      'Player 3: 6(W)' + '\n' +
      'Center: 3'
    );
  });

  it('should who is the next player with (*)', () => {
    const inputParams = new InputParameters('5', 'RL....C.L');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);

    const consoleLogSpy = jest.spyOn(console, 'log');

    game.start();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Game: 1' + '\n' +
      'Player 1: 1' + '\n' +
      'Player 2: 4' + '\n' +
      'Player 3: 1' + '\n' +
      'Player 4: 4(*)' + '\n' +
      'Player 5: 4' + '\n' +
      'Center: 1'
    );
  });

  it(`shouldn't show something in console if there are no players`, () => {
    const inputParams = new InputParameters('0', '');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);

    const consoleLogSpy = jest.spyOn(console, 'log');

    game.start();

    expect(consoleLogSpy).not.toHaveBeenCalledWith();
  });
});

import { GameCounter } from '../src/game/game-counter.class';
import { Game } from '../src/game/game.class';
import { InputParameters } from '../src/game/inputParameters';

describe('test game', () => {
  it('should show one winner with (W)', () => {
    const inputParams = new InputParameters('3', 'LR.CCR.L.RLLLCLR.LL..R...CLR.');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);
    const result = game.start();

    expect(result).toBe('Game: 1\nPlayer 1: 0\nPlayer 2: 0\nPlayer 3: 6(W)\nCenter: 3');
  });

  it('should who is the next player with (*)', () => {
    const inputParams = new InputParameters('5', 'RL....C.L');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);
    const result = game.start();

    expect(result).toBe('Game: 1\nPlayer 1: 1\nPlayer 2: 4\nPlayer 3: 1\nPlayer 4: 4(*)\nPlayer 5: 4\nCenter: 1');
  });

  it(`shouldn't show something in console if there are no players`, () => {
    const inputParams = new InputParameters('0', '');
    const gameCounter = new GameCounter();
    const game = new Game(inputParams, gameCounter);
    const result = game.start();

    expect(result).toBe(null);
  });
});

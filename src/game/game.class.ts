import { DiceDirection } from './dice-direction.enum';
import { GameCounter } from './game-counter.class';
import { InputParameters } from './inputParameters';
import { Player } from './player.class';

export class Game {
  private players: Player[];

  private centralPile = 0;

  private numberOfPlayers: number;

  private nextPlayerIndex: number;

  private playerWinner: Player | null = null;

  private dices: string[] = [];

  constructor(inputParameters: InputParameters, private gameCounter: GameCounter) {
    this.gameCounter.increment();

    const [playersLength, dicesDirections] = inputParameters.getParametersParsed();

    this.players = Array.from({ length: playersLength }, () => new Player());
    this.nextPlayerIndex = 0;
    this.numberOfPlayers = this.players.length;
    this.dices = dicesDirections;
  }

  /**
   * Obtener el siguiente jugador
   * * Solo si tiene fichas para jugar de lo contrario pasa al siguiente
   */
  private nextPlayer(): Player {
    const nextPlayer = this.players[this.nextPlayerIndex];

    if (nextPlayer.chips > 0) {
      return nextPlayer;
    }

    return this.nextPlayer();
  }

  /**
   * Muestra el resúmen de la partida
   * * En caso tengamos un ganador indica quien es el ganador
   * de lo contrario muestra quién sería el siguiente jugador que lo toca tirar los dados
   */
  private getSummaryOfGame(): string {
    const messageContent = this.players
      .map((player, index) => {
        let messageRow = `Player ${index + 1}: ${player.chips}`;

        if (this.playerWinner !== null) {
          messageRow += `${player.chips > 0 ? '(W)' : ''}`;
        } else {
          messageRow += `${index === this.nextPlayerIndex ? '(*)' : ''}`;
        }

        return messageRow;
      })
      .join('\n');

    return `Game: ${this.gameCounter.getCount()}\n${messageContent}\nCenter: ${this.centralPile}`;
  }

  /**
   * Función principal para comenzar el juego
   * @param dices Dados
   */
  start(): string | null {
    if (!(this.numberOfPlayers >= 3 && this.dices?.length > 0)) {
      return null;
    }

    let gameOver = false;

    while (!gameOver) {
      // Validar si ya tenemos un ganador
      const winners = this.players.filter((player: Player) => player.chips > 0);

      if (winners.length === 1) {
        this.playerWinner = winners.at(0) as Player;
        gameOver = true;
        break;
      }

      const currentPlayer: Player = this.nextPlayer();
      const chips: number = Math.min(currentPlayer.chips, 3);
      const dicesDirections: string[] = this.dices.splice(0, chips);

      dicesDirections.forEach(diceDirection => {
        switch (diceDirection) {
          case DiceDirection.LEFT: {
            const leftPlayerIndex = (this.nextPlayerIndex + 1) % this.numberOfPlayers;
            const playerLeft = this.players.at(leftPlayerIndex) as Player;
            currentPlayer.passChip(playerLeft);
            break;
          }

          case DiceDirection.RIGHT: {
            const rightPlayerIndex = (this.nextPlayerIndex - 1 + this.numberOfPlayers) % this.numberOfPlayers;
            const playerRight = this.players.at(rightPlayerIndex) as Player;
            currentPlayer.passChip(playerRight);
            break;
          }

          case DiceDirection.CENTER:
            this.centralPile += currentPlayer.putInCentralPile();
            break;

          default:
            break;
        }
      });

      this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.numberOfPlayers;

      // Comprobar si no hay dados por jugar
      if (this.dices.length === 0) {
        gameOver = true;
        break;
      }
    }

    return this.getSummaryOfGame();
  }
}

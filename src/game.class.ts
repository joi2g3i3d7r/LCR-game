import { DiceDirection } from "./dice-direction.enum";
import { InputParameters } from "./inputParameters";
import { Player } from "./player.class";

export class GameCounter {
  private count: number = 0;

  constructor() { }

  public getCount(): number {
    return this.count;
  }

  public increment(): void {
    this.count++;
  }
}

export class Game {
  private players: Player[];
  private centralPile = 0;
  private numberOfPlayers: number;
  private nextPlayerIndex: number;
  private playerWinner: Player | null = null;
  private dices: string[] = [];

  constructor(
    inputParameters: InputParameters,
    private gameCounter: GameCounter,
  ) {
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
  private printSummaryOfGame(): void {
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
      .join('\n')

    console.log(
      `Game: ${this.gameCounter.getCount()}` + '\n' +
      messageContent + '\n' +
      `Center: ${this.centralPile}`
    );
  }

  /**
   * Función principal para comenzar el juego
   * @param dices Dados
   */
  start(): void {
    if (!(this.numberOfPlayers >= 3 && this.dices?.length > 0)) {
      return;
    }

    while (true) {
      // Validar si ya tenemos un ganador
      const winners = this.players.filter((player: Player) => player.chips > 0);

      if (winners.length === 1) {
        this.playerWinner = winners[0];
        this.printSummaryOfGame();
        break;
      }

      const currentPlayer: Player = this.nextPlayer();
      const chips: number = Math.min(currentPlayer.chips, 3);
      const dicesDirections: string[] = this.dices.splice(0, chips);

      for (const diceDirection of dicesDirections) {
        switch (diceDirection) {
          case DiceDirection.LEFT:
            const playerLeft = this.players[(this.nextPlayerIndex + 1) % this.numberOfPlayers];
            currentPlayer.passChip(playerLeft);
            break;

          case DiceDirection.RIGHT:
            const playerRight = this.players[(this.nextPlayerIndex - 1 + this.numberOfPlayers) % this.numberOfPlayers];
            currentPlayer.passChip(playerRight);
            break;

          case DiceDirection.CENTER:
            this.centralPile += currentPlayer.putInCentralPile();
            break;

          default:
            break;
        }
      }

      this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.numberOfPlayers;

      // Comprobar si no hay dados por jugar
      if (this.dices.length === 0) {
        this.printSummaryOfGame();
        break;
      }
    }
  }
}

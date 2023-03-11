export class Player {
  public chips: number = 3;

  /**
   * Pasar la ficha al compañero
   * @param player
   */
  passChip(player: Player): void {
    if (this.chips > 0) {
      this.chips--;
      player.chips++;
    }
  }

  /**
   * Colocar la ficha en la pila central de la mesa
   * @returns
   */
  putInCentralPile(): 0 | 1 {
    if (this.chips > 0) {
      this.chips--;
      return 1;
    }

    return 0;
  }
}

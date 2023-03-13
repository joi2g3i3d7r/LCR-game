export class GameCounter {
  private count = 0;

  public getCount(): number {
    return this.count;
  }

  public increment(): void {
    this.count += 1;
  }
}

export class InputParameters {
  constructor(public playersLegth: string, public dicesDirections: string) {}

  public getParametersParsed(): [number, string[]] {
    return [+this.playersLegth, this.dicesDirections?.split('')];
  }
}

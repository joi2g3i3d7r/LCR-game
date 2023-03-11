/**
 * Función encargada de retornar los paramaetros necesarios para el juego
 * @returns
 */
export const getArguments = (): [number, string[]] => {
  const [playersLength, dices] = process.argv.slice(2);
  const dicesDirections = dices.split('');
  return [ +playersLength, dicesDirections ];
}

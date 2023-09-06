export default function stringCutter(texto, limite) {
  if (texto.length > limite) {
    return texto.slice(0, limite) + '...'
  }
  return texto
}

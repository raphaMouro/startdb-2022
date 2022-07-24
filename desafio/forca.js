const states = { 
  aguardandoChute: 'Aguardando chute:', 
  ganhou: 'ganhou',
  perdeu: 'perdeu',
}
class Forca {
  letrasChutadas;
  letrasCorretas;
  vidas;
  palavra;
  emptyPalavra;
  currentState;

  constructor(palavra) {
    this.palavra = palavra.split('');
    this.emptyPalavra = new Array(this.palavra.length).fill('_');
    this.letrasCorretas = [];
    this.letrasChutadas = [];
    this.vidas = 6;
    this.currentState = states.aguardandoChute
  }

  chutar(letra) {   
    if(this.isInvalid(letra)) {
      return this.setEstado();
    }

  this.letrasChutadas.push(letra);

    if(!this.palavra.includes(letra)) {
    this.vidas--;
    return this.setEstado();
    }

  this.letrasCorretas.push(letra);

  this.palavra.forEach((l, index) => {
    if(l !== letra) return;

    this.emptyPalavra[index] = letra;
  })
   return this.setEstado();

  }

  isInvalid(letra) { 
    if(letra.split('').length > 1) {
      return true;
    }

    if(this.letrasChutadas.includes(letra)) {
      return true;
    }

    return false;
  }

  buscarEstado() { 
    return this.currentState;
  }

  setEstado() {
    const palavraCorreta = this.emptyPalavra.filter(letra => letra !== '_');

    if(this.vidas <= 0) {
      this.currentState = states.perdeu;
      console.log("Infelizmente acabaram suas vidas! Você perdeu")
      return this.currentState;
    }

    if(this.palavra.length === palavraCorreta.length) {
      this.currentState = states.ganhou;
      console.log("Parabéns! Você ganhou!")
      return this.currentState;
    }

    this.currentState = states.aguardandoChute;
    return this.currentState;
  }

  buscarDadosDoJogo() {
    return {
      letrasCorretas: this.letrasCorretas,
      letrasChutadas: this.letrasChutadas, 
      vidas: this.vidas,
      palavra: this.emptyPalavra,
    };
  }
}

module.exports = Forca;
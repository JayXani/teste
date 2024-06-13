class Senha {
    getConteudo(){
        return this.conteudo;
    }
    
    setConteudo(v) {
        this.conteudo = v;
    }


    validPassword() {
        if(this.verifyLength()) throw new Error('Senha com tamanho invalido !');
        if(this.verifyCharacters() || !this.temSimbolos()) {
            return 'Senha invalida !'
        }
        return 'Senha valida'
    }
    //Verifica se o tamanho da string é válida
    verifyLength() {
        if(this.conteudo.length < 10 || this.conteudo.length > 30) return true;
        return false;
    }

    verifyCharacters() {
        if(this.verificarSequenciaNumeros(this.conteudo) || this.verificarSequenciaString(this.conteudo)){ 
            this.subtraiPontos();
        }
        return false;
    }
    senhaTemSequencia(str) {
        //O for percorre toda a string e verifica se o código da letra + 1
        // é igual ao proximo
        for(let i = 0; i < str.length - 2; i++) {
            const atual = str.charCodeAt(i);
            const proximo = str.charCodeAt(i + 1);
            const depoisProximo = str.charCodeAt(i + 2);
            if(proximo === atual + 1 && depoisProximo === atual + 2) {
                return true;
            }
        }
        return false;
    }

    //Verifica se a sennha possui sequência
    verificarSequenciaNumeros() {
        // Regex para verificação de números
        const padraoNumeros = /\d+/g;
        const eSequencia = this.conteudo.match(padraoNumeros);
        
        if(eSequencia) {
            for (const seq of eSequencia) {
                if(this.senhaTemSequencia(seq)) {
                    return true;
                }
            }
        }
        return false;
    }
    //Verifica se a senha possui uma sequência de números
    verificarSequenciaString() {
        const padraoString = /[a-zA-z]+/g;

        //Verifica se a senha corresponde ao regex
        const eSequencia = this.conteudo.match(padraoString);

        if(eSequencia) {
            for(const seq of eSequencia) {
                if(this.senhaTemSequencia(seq)){ 
                    return true;
                }
            }
        }
        return false;
    }

    temSimbolos() {
        const padraoSimbolos = /\W+/g;
        return padraoSimbolos.test(this.conteudo);
    }
    subtraiPontos() {
        
    }
}

const senha = new Senha();
senha.conteudo = "ABcde123456*";

console.log(senha.validPassword());

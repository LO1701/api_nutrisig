const Services = require("./Services");

class Medidas_antropometricasServices extends Services{
    constructor(){
        super('Medidas_antropometricas');
    }

    calculaImc(peso, altura){
        const imc = (peso / (altura * altura));
        let caracteristica = '';

        if(imc < 18.5)
            caracteristica = 'Baixo peso';
        if(imc > 18.5 && imc < 24.9)
            caracteristica = 'Peso normal'
        else if(imc > 25,0 && imc < 29.9)
            caracteristica = 'Excesso de peso';
        else if(imc > 30 && imc < 34.9)
            caracteristica = 'Obesidade de Classe 1';
        else if(imc > 35 && imc < 39.9)
            caracteristica = 'Obesidade de Classe 2';
        else if(imc > 40)
            caracteristica = 'Obesidade de Classe 3';
     
        const objeto = {}
        objeto.caracteristica = caracteristica
        objeto.imc = imc

        return objeto;
    }
}

module.exports = Medidas_antropometricasServices;
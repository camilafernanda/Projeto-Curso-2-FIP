function realizarCalculo() {
    let valorInvestido = document.querySelector('#valor_investido').value;
    let taxaJuros = document.querySelector('#taxa_juros').value / 100;
    let periodo = document.querySelector('#periodo').value;

    valorInvestido = Number(valorInvestido);
    taxaJuros = Number(taxaJuros);
    periodo = Number(periodo);

    let modeloPeriodo = document.querySelector('#modelo_periodo').value;
    if (modeloPeriodo == 'anos') {
        periodo = periodo * 12;
    }

    let modeloTaxa = document.querySelector('#modelo_taxa_juros').value;
    if (modeloTaxa == 'anual') {
        taxaJuros = taxaJuros / 12;
    }

    validarValoresDigitados(valorInvestido, taxaJuros, periodo);

    let montante = calculaMontante(valorInvestido, taxaJuros, periodo);
    let jurosCompostos = calculaJurosCompostos(montante, valorInvestido);

    montarTabelaResumo(valorInvestido, jurosCompostos, montante);
    montarTabelaMensal(taxaJuros, periodo, valorInvestido);

}

function calculaMontante(valorInvestido, taxa, periodo) {
    let montante = valorInvestido * ((1 + taxa) ** periodo);
    return montante;
}

function calculaJurosCompostos(montante, valorInvestido) {
    let jurosCompostos = montante - valorInvestido;
    return jurosCompostos;
}

function montarTabelaResumo(valorInvestido, jurosCompostos, montante) {

    let resumoValorInvestido = document.querySelector('#total_investido');
    resumoValorInvestido.textContent = 'R$ ' + parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');

    let resumoTotalJuros = document.querySelector('#total_juros');
    resumoTotalJuros.textContent = 'R$ ' + parseFloat(jurosCompostos.toFixed(2)).toLocaleString('PT');

    let resumoTotalMontante = document.querySelector('#total');
    resumoTotalMontante.textContent = 'R$ ' + parseFloat(montante.toFixed(2)).toLocaleString('PT');
}

function montarTabelaMensal(taxaJuros, periodo, valorInvestido) {
    let tabela = document.querySelector('#tabela_resultados tbody');
    tabela.innerHTML = "";
    
    for (let i = 1; i <= periodo; i++) {
        let jurosAtual = valorInvestido * taxaJuros;
        valorInvestido += jurosAtual;

        let linha = tabela.insertRow(-1);

        let cellPeriodo = linha.insertCell();
        let cellJuros = linha.insertCell();
        let cellMontante = linha.insertCell();

        cellPeriodo.innerHTML = i;
        cellJuros.innerHTML = 'R$ ' + jurosAtual;
        cellMontante.innerHTML = 'R$ ' + valorInvestido;
    }
}

function validarValoresDigitados(valorInvestido, taxaJuros, periodo) {
    formulario = document.querySelector("formulario");

    if (valorInvestido == 0) {
        alert("Digite um valor para o valor investido");
        formulario.valor_investido.focus();
    }

    if (taxaJuros == 0) {
        alert("Digite um valor para a taxa de juros");
        formulario.taxa_juros.focus();
    } 

    if (periodo == 0) {
        alert("Informe um período diferente de zero e menor ou igual a 50 anos, ou 600 meses");
        formulario.periodo.focus();
    }

}
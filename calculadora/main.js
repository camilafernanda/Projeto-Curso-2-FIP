function realizarCalculo() {
    let valorInvestido = document.querySelector('#valor_investido').value;
    let taxaJuros = document.querySelector('#taxa_juros').value;
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

    let resumoValorInvestido = document.querySelector('#total_investido');
    resumoValorInvestido.textContent = 'R$ ' + parseFloat(valorInvestido.toFixed(2)).toLocaleString('PT');

    let montante = valorInvestido * ((1 + taxaJuros) ** periodo);
    let jurosCompostos = montante - valorInvestido;

    let resumoTotalJuros = document.querySelector('#total_juros');
    resumoTotalJuros.textContent = 'R$ ' + parseFloat(jurosCompostos.toFixed(2)).toLocaleString('PT');

    let resumoTotalMontante = document.querySelector('#total');
    resumoTotalMontante.textContent = 'R$ ' + parseFloat(montante.toFixed(2)).toLocaleString('PT');
}
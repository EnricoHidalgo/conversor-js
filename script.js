const apiKey = "2486efa002997162c00bfbe2";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const deMoeda = document.getElementById("de-moeda");
const paraMoeda = document.getElementById("para-moeda");
const quant = document.getElementById("quant");
const result = document.getElementById("result");

async function carregarMoedas() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    const data = await response.json();

    const moedas = Object.keys(data.conversion_rates);

    moedas.forEach(moedas => {
        const opcoes1 = document.createElement("option");
        const opcoes2 = document.createElement("option");
        opcoes1.value = opcoes2.value = moedas;
        opcoes1.textContent = opcoes2.textContent = moedas;
        deMoeda.appendChild(opcoes1);
        paraMoeda.appendChild(opcoes2);
    })
}

async function CM() {
    const de = deMoeda.value;
    const para = paraMoeda.value;
    const quantia = parseFloat(quant.value);

    if(isNaN(quantia) || quantia <= 0 ) {
        result.textContent = 'Por favor digite um valor válido';
        return;
    }

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${de}`);
    const data = await response.json();
    const txc = data.conversion_rates[para];
    const valorConvertido = (quantia * txc).toFixed(2);

    result.textContent = `${quantia} ${de} = ${valorConvertido} ${para}`;
}


carregarMoedas();
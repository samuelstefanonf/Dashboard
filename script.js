// Dados iniciais para os gráficos e a tabela
var dadosFinanceiros = [];

// Função para atualizar os gráficos com os dados inseridos pelo usuário
function atualizarGraficos() {
    var mes = document.getElementById('mes').value;
    var entradas = parseInt(document.getElementById('entradas').value);
    var saidas = parseInt(document.getElementById('saidas').value);
    var total = entradas - saidas;

    var index = dadosFinanceiros.findIndex(item => item.mes === mes);
    if (index === -1) {
        // Se o mês ainda não existe no array, adiciona os novos dados
        dadosFinanceiros.push({ mes, entradas, saidas, total });
    } else {
        // Se o mês já existe no array, atualiza os dados existentes
        dadosFinanceiros[index].entradas = entradas;
        dadosFinanceiros[index].saidas = saidas;
        dadosFinanceiros[index].total = total;
    }

    // Atualiza os gráficos e a tabela
    atualizarGraficoBarra();
    atualizarGraficoLinha();
    atualizarTabela();

    // Verifica se todos os 12 meses foram preenchidos e exibe o total geral
    if (dadosFinanceiros.length === 12) {
        calcularTotalGeral();
    }
}

// Função para limpar os campos de entrada quando o mês é alterado
function limparCampos() {
    document.getElementById('entradas').value = '';
    document.getElementById('saidas').value = '';
}

// Função para calcular o total geral e exibir no campo correspondente
function calcularTotalGeral() {
    var totalGeral = 0;
    dadosFinanceiros.forEach(item => {
        totalGeral += item.total;
    });
    document.getElementById('total').value = totalGeral;
}

// Função para alterar os dados já existentes
function alterarDados() {
    var mes = document.getElementById('mes').value;
    var entradas = parseInt(document.getElementById('entradas').value);
    var saidas = parseInt(document.getElementById('saidas').value);
    var total = entradas - saidas;

    var index = dadosFinanceiros.findIndex(item => item.mes === mes);
    if (index !== -1) {
        // Se o mês já existe no array, atualiza os dados existentes
        dadosFinanceiros[index].entradas = entradas;
        dadosFinanceiros[index].saidas = saidas;
        dadosFinanceiros[index].total = total;
    }

    // Atualiza os gráficos e a tabela
    atualizarGraficoBarra();
    atualizarGraficoLinha();
    atualizarTabela();

    // Verifica se todos os 12 meses foram preenchidos e exibe o total geral
    if (dadosFinanceiros.length === 12) {
        calcularTotalGeral();
    }
}

// Gráfico de Barras
var barChart;
function atualizarGraficoBarra() {
    if (barChart) {
        barChart.destroy();
    }

    var meses = dadosFinanceiros.map(item => item.mes);
    var entradas = dadosFinanceiros.map(item => item.entradas);
    var saidas = dadosFinanceiros.map(item => item.saidas);

    var ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Entradas',
                    data: entradas,
                    backgroundColor: '#1f78b4'
                },
                {
                    label: 'Saídas',
                    data: saidas,
                    backgroundColor: '#e31a1c'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gráfico de Linhas
var saldoChart;
function atualizarGraficoLinha() {
    if (saldoChart) {
        saldoChart.destroy();
    }

    var meses = dadosFinanceiros.map(item => item.mes);
    var saldos = dadosFinanceiros.map(item => item.total);

    var ctx = document.getElementById('saldoChart').getContext('2d');
    saldoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Total',
                    data: saldos,
                    borderColor: '#33a02c',
                    backgroundColor: 'transparent',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Função para atualizar a tabela com os dados inseridos pelo usuário
function atualizarTabela() {
    var tabelaDados = document.getElementById('tabelaDados');
    tabelaDados.innerHTML = '';

    dadosFinanceiros.forEach(item => {
        var row = tabelaDados.insertRow();
        row.insertCell().textContent = item.mes;
        row.insertCell().textContent = item.entradas;
        row.insertCell().textContent = item.saidas;
        row.insertCell().textContent = item.total;
    });
}

// Função para limpar os dados dos gráficos e da tabela
function limparDados() {
    dadosFinanceiros = [];
    atualizarGraficoBarra();
    atualizarGraficoLinha();
    atualizarTabela();
    document.getElementById('total').value = '';
}

// Evento para chamar a função limparDados() ao carregar a página
window.addEventListener('load', () => {
    limparDados();
});

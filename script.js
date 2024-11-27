document.getElementById('calculate-btn').addEventListener('click', () => {
    // Captura os valores inseridos
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value) || 0;
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const years = parseInt(document.getElementById('years').value) || 0;

    // Validação básica
    if (years <= 0 || annualInterestRate <= 0) {
        alert("Insira valores válidos para taxa de juros e anos.");
        return;
    }

    // Conversão de taxa anual para taxa mensal
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = years * 12;

    // Variáveis para cálculo
    let balance = initialInvestment; // Saldo inicial
    let totalInvested = initialInvestment; // Total investido ao longo do tempo
    let totalInterest = 0; // Acumular os juros totais

    // Cálculo mês a mês
    for (let month = 1; month <= totalMonths; month++) {
        // Adiciona o aporte mensal
        balance += monthlyInvestment;
        totalInvested += monthlyInvestment;

        // Calcula juros do mês
        const monthlyInterest = balance * monthlyInterestRate;

        // Adiciona os juros ao saldo
        balance += monthlyInterest;

        // Acumula os juros totais
        totalInterest += monthlyInterest;
    }

    // Atualiza os resultados na interface
    document.getElementById('total-invested').textContent = `Total Investido: R$ ${totalInvested.toFixed(2)}`;
    document.getElementById('total-return').textContent = `Total de Juros Ganhos: R$ ${totalInterest.toFixed(2)}`;
    document.getElementById('final-balance').textContent = `Saldo Final: R$ ${balance.toFixed(2)}`;

    // Renderiza o gráfico de barras
    renderBarChart(totalInvested, totalInterest, balance);
});

// Função para renderizar o gráfico de barras
function renderBarChart(totalInvested, totalInterest, finalBalance) {
    const ctx = document.getElementById('investment-chart').getContext('2d');

    // Remove gráficos anteriores (se existirem)
    if (window.investmentChart) {
        window.investmentChart.destroy();
    }

    // Cria o novo gráfico de barras
    window.investmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Investido', 'Juros Ganhos', 'Saldo Final'],
            datasets: [
                {
                    label: 'Valores (R$)',
                    data: [totalInvested, totalInterest, finalBalance],
                    backgroundColor: ['#007bff', '#28a745', '#ffc107'],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Remove legenda do gráfico
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Categoria',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor (R$)',
                    },
                    beginAtZero: true,
                },
            },
        },
    });
}

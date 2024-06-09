function getIMC(weight, height) {
    return weight / ((height / 100) ** 2);
}

function getComorbidityFactor(imc) {
    if (imc < 18.5) return 10;
    if (imc >= 18.5 && imc < 25) return 1;
    if (imc >= 25 && imc < 30) return 6;
    if (imc >= 30 && imc < 35) return 10;
    if (imc >= 35 && imc < 40) return 20;
    return 30;
}

function calculatePlanCostA(planType, age, imc) {
    let cost;
    switch(planType) {
        case 'basic':
            cost = 100 + (age * 10 * (imc / 10));
            break;
        case 'standard':
            cost = (150 + (age * 15)) * (imc / 10);
            break;
        case 'premium':
            cost = (200 - (imc * 10) + (age * 20)) * (imc / 10);
            break;
    }
    return cost.toFixed(2);
}

function calculatePlanCostB(planType, age, imc) {
    const comorbidityFactor = getComorbidityFactor(imc);
    let cost;
    switch(planType) {
        case 'basic':
            cost = 100 + (comorbidityFactor * 10 * (imc / 10));
            break;
        case 'standard':
            cost = (150 + (comorbidityFactor * 15)) * (imc / 10);
            break;
        case 'premium':
            cost = (200 - (imc * 10) + (comorbidityFactor * 20)) * (imc / 10);
            break;
    }
    return cost.toFixed(2);
}

function comparePlans() {
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    const imc = getIMC(weight, height);

    const plansA = {
        basic: calculatePlanCostA('basic', age, imc),
        standard: calculatePlanCostA('standard', age, imc),
        premium: calculatePlanCostA('premium', age, imc)
    };

    const plansB = {
        basic: calculatePlanCostB('basic', age, imc),
        standard: calculatePlanCostB('standard', age, imc),
        premium: calculatePlanCostB('premium', age, imc)
    };

    let resultHTML = `<table>
                        <tr>
                            <th>Plano</th>
                            <th>Operadora A (R$)</th>
                            <th>Operadora B (R$)</th>
                        </tr>
                        <tr>
                            <td>Básico</td>
                            <td>${plansA.basic}</td>
                            <td>${plansB.basic}</td>
                        </tr>
                        <tr>
                            <td>Standard</td>
                            <td>${plansA.standard}</td>
                            <td>${plansB.standard}</td>
                        </tr>
                        <tr>
                            <td>Premium</td>
                            <td>${plansA.premium}</td>
                            <td>${plansB.premium}</td>
                        </tr>
                      </table>`;

    let bestPlan = determineBestPlan(plansA, plansB);
    resultHTML += `<p>O melhor plano é: ${bestPlan}</p>`;

    document.getElementById('result').innerHTML = resultHTML;
}

function determineBestPlan(plansA, plansB) {
    const allPlans = [
        { name: 'Básico', cost: Math.min(plansA.basic, plansB.basic) },
        { name: 'Standard', cost: Math.min(plansA.standard, plansB.standard) },
        { name: 'Premium', cost: Math.min(plansA.premium, plansB.premium) }
    ];

    allPlans.sort((a, b) => a.cost - b.cost);

    return allPlans[0].name;
}

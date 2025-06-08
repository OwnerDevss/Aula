document.getElementById('convert').addEventListener('click', function () {
    const number = document.getElementById('number').value.trim();

    if (!number) {
        alert('Por favor, insira um número.');
        return;
    }

    let decimalValue;
    let detectedBase;

    // Detecta a base do número inserido
    if (/^[01]+$/.test(number)) {
        detectedBase = 2; // Binário
    } else if (/^[0-7]+$/.test(number)) {
        detectedBase = 8; // Octal
    } else if (/^[0-9]+$/.test(number)) {
        detectedBase = 10; // Decimal
    } else if (/^[0-9A-Fa-f]+$/.test(number)) {
        detectedBase = 16; // Hexadecimal
    } else {
        alert('Número inválido. Certifique-se de usar um formato válido (Binário, Octal, Decimal ou Hexadecimal).');
        return;
    }

    // Converte o número para decimal
    try {
        decimalValue = parseInt(number, detectedBase);
        if (isNaN(decimalValue)) {
            throw new Error('Erro na conversão.');
        }
    } catch (error) {
        alert('Erro ao processar o número. Verifique o formato e tente novamente.');
        return;
    }

    // Atualiza os resultados
    const bin = decimalValue.toString(2); // Binário
    const dec = decimalValue.toString(10); // Decimal
    const hex = decimalValue.toString(16).toUpperCase(); // Hexadecimal
    const oct = decimalValue.toString(8); // Octal

    document.getElementById('binary').textContent = bin;
    document.getElementById('decimal').textContent = dec;
    document.getElementById('hexadecimal').textContent = hex;
    document.getElementById('octal').textContent = oct;

    // Gera a explicação detalhada com os cálculos
    let explanation = `<strong>Você inseriu o número "${number}" na base ${detectedBase}.</strong><br>`;
    explanation += `Ele foi identificado como um número em ${detectedBase === 2 ? 'Binário (Base 2)' :
        detectedBase === 8 ? 'Octal (Base 8)' :
        detectedBase === 10 ? 'Decimal (Base 10)' : 'Hexadecimal (Base 16)'}.<br><br>`;
    
    explanation += `<strong>Conversões e Cálculos:</strong><br>`;
    
    // Cálculo do Decimal
    explanation += `<strong>1️⃣ Para Decimal (Base 10):</strong><br>`;
    explanation += `Soma dos dígitos multiplicados pelas potências da base:<br>`;
    const digits = number.split('').reverse();
    explanation += digits.map((digit, i) => `${digit} × ${detectedBase}<sup>${i}</sup>`).join(' + ') + ` = ${decimalValue}<br><br>`;
    
    // Cálculo do Binário
    explanation += `<strong>2️⃣ Para Binário (Base 2):</strong><br>`;
    explanation += `Conversão de ${decimalValue} para binário por divisões sucessivas por 2:<br>`;
    let temp = decimalValue;
    let binarySteps = '';
    while (temp > 0) {
        binarySteps += `${temp} ÷ 2 = ${Math.floor(temp / 2)} (Resto: ${temp % 2})<br>`;
        temp = Math.floor(temp / 2);
    }
    explanation += binarySteps + `Resultado final: ${bin}<br><br>`;
    
    // Cálculo do Hexadecimal
    explanation += `<strong>3️⃣ Para Hexadecimal (Base 16):</strong><br>`;
    explanation += `Conversão de ${decimalValue} para hexadecimal por divisões sucessivas por 16:<br>`;
    let tempHex = decimalValue;
    let hexSteps = '';
    while (tempHex > 0) {
        hexSteps += `${tempHex} ÷ 16 = ${Math.floor(tempHex / 16)} (Resto: ${(tempHex % 16).toString(16).toUpperCase()})<br>`;
        tempHex = Math.floor(tempHex / 16);
    }
    explanation += hexSteps + `Resultado final: ${hex}<br><br>`;
    
    // Cálculo do Octal
    explanation += `<strong>4️⃣ Para Octal (Base 8):</strong><br>`;
    explanation += `Conversão de ${decimalValue} para octal por divisões sucessivas por 8:<br>`;
    let tempOct = decimalValue;
    let octSteps = '';
    while (tempOct > 0) {
        octSteps += `${tempOct} ÷ 8 = ${Math.floor(tempOct / 8)} (Resto: ${tempOct % 8})<br>`;
        tempOct = Math.floor(tempOct / 8);
    }
    explanation += octSteps + `Resultado final: ${oct}<br>`;

    document.getElementById('example').innerHTML = explanation;
});
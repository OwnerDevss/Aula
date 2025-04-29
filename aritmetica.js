document.getElementById('calculate').addEventListener('click', function () {
    const expression = document.getElementById('expression').value.trim();

    if (!expression) {
        alert('Por favor, insira uma expressão aritmética.');
        return;
    }

    try {
        // Avalia a expressão usando a função eval
        const result = eval(expression);

        // Exibe o resultado
        document.getElementById('result').textContent = result;
    } catch (error) {
        // Exibe uma mensagem de erro caso a expressão seja inválida
        alert('Expressão inválida. Por favor, insira uma expressão válida.');
        document.getElementById('result').textContent = '-';
    }
});
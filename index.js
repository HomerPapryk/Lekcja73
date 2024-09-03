document.addEventListener("DOMContentLoaded", () => {
  let currencies = {};

  async function fetchCurrencies() {
    try {
      const response = await fetch(
        "https://api.frankfurter.app/latest?base=PLN"
      );
      if (!response.ok) {
        throw new Error("Problem z pobieraniem danych o walutach.");
      }
      const data = await response.json();

      if (!data.rates) {
        throw new Error("Brak danych o walutach w odpowiedzi.");
      }

      currencies = data.rates;

      populateSelect();
    } catch (error) {
      console.error("Błąd podczas pobierania walut:", error);
    }
  }

  function populateSelect() {
    const select = document.getElementById("currencySelect");
    select.innerHTML = "";

    for (const [currency, rate] of Object.entries(currencies)) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = `${currency}`;
      select.appendChild(option);
    }
  }

  function displayCurrencyValue(event) {
    const selectedCurrency = event.target.value;
    const valueElement = document.querySelector('[data-test="currency-value"]');

    if (currencies[selectedCurrency]) {
      valueElement.textContent = `1 PLN = ${currencies[selectedCurrency]} ${selectedCurrency}`;
    } else {
      valueElement.textContent = "Wybierz walutę";
    }
  }

  fetchCurrencies();
  const select = document.getElementById("currencySelect");
  select.addEventListener("change", displayCurrencyValue);
});

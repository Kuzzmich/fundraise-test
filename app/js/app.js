const app = new Vue({
  el: '#app',
  data: {
    presets: [40, 100, 200, 1000, 2500, 5000],
    suggestion: 40,
    currencies: [
      {name: 'US Dollar', code: 'USD', symbol: '$', rate: 1},
      {name: 'Euro', code: 'EUR', symbol: '€', rate: 0.897597},
      {name: 'British Pound', code: 'GBP', symbol: '£', rate: 0.81755},
      {name: 'Russian Ruble', code: 'RUB', symbol: '₽', rate: 63.461993}
    ],
    selectedCurrencyIndex: 0,
    selectedCurrency: {},
    loading: false,
  },
  filters: {
    formatCurrency(value) {
      return !!value ? value.toLocaleString('en-US', {minimumFractionDigits: 0}) : '';
    }
  },
  computed: {
    convertedPresets() {
      return this.presets.map(p => {
        return this.convertCurrencyRound(p);
      })
    }
  },
  methods: {
    setPreset(p) {
      this.suggestion = p;
    },
    onCurrencyChange(v) {
      const suggestedIndex = this.convertedPresets.findIndex(cp => cp === this.suggestion);
      const ind = parseInt(v.target.value);
      const oldRate = this.selectedCurrency.rate;
      this.selectedCurrencyIndex = ind;
      this.selectedCurrency = this.currencies[ind];
      const newRate = this.selectedCurrency.rate;

      this.suggestion = suggestedIndex !== -1  // convert input value with rounding if it matches with one of the suggestions
        ? this.convertCurrencyRound(this.presets[suggestedIndex])
        : parseInt(this.suggestion / oldRate * newRate);
    },
    onCurrencyInput(event) {
      this.suggestion = parseInt(event.target.value.replaceAll(',', '') || 0);
    },
    onlyNumber($event) {
      if ($event.keyCode > 31 && ($event.keyCode < 48 || $event.keyCode > 57)) {
        $event.preventDefault();
      }
    },
    convertCurrencyRound(v) {
      const converted = parseInt(v * this.selectedCurrency.rate);
      const convertedLength = converted.toString().length;
      const rounder = parseInt('1' + '0'.repeat(convertedLength - 2));

      return Math.ceil(converted / rounder / 5) * 5 * rounder;
    },
    async sendFunds() {
      this.loading = true;

      const payload = {
        amount: this.suggestion,
        currency: this.selectedCurrency.code
      };

      try {
        const response = await fetch('/donate', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();

        if (json.ok) {
          alert('Thank you for your donation!');
        } else {
          alert('Oops... Something went wrong please try again');
        }
      } catch (e) {
        alert('Oops... Something went wrong please try again');
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.selectedCurrency = this.currencies[this.selectedCurrencyIndex];
  }
});

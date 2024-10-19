const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector('.calculator-display');
  display.value = calculator.displayValue;
}
//   Fungsi ini berjalan setiap kali ada perubahan pada angka atau hasil yang ditampilkan di layar. Misalnya, ketika pengguna memasukkan angka baru atau menekan tombol operator, fungsi ini memastikan nilai di layar kalkulator selalu sinkron dengan status di objek calculator.

// Penjelasan:
// Pada awalnya, layar kalkulator akan menampilkan 0, sesuai dengan nilai awal dari calculator.displayValue.
// Saat pengguna memasukkan angka, nilai displayValue akan diperbarui, dan updateDisplay() akan dipanggil untuk memperbarui layar kalkulator sesuai dengan input pengguna.
// Jadi, fungsi ini adalah jembatan antara logika kalkulator (yang ada dalam objek calculator) dan tampilan yang dilihat pengguna.

// -------------------------------------------------------------------

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  updateDisplay();
}
// Penjelasan Logika:
// Jika menunggu operand kedua:
// Nilai tampilan di-reset ke angka baru yang diinput.
// Jika tidak menunggu operand kedua:
// Angka baru ditambahkan ke angka yang sudah ada di layar (kecuali angka 0, yang akan digantikan sepenuhnya).
// Contoh:
// Kasus 1: Layar kalkulator menampilkan 0, dan pengguna menekan 5:
// Karena tampilan menunjukkan '0', digit 5 akan menggantikan 0, jadi tampilan sekarang menunjukkan 5.
// Kasus 2: Layar kalkulator menampilkan 45, dan pengguna menekan 6:
// Karena kalkulator tidak menunggu operand kedua dan nilai di layar bukan '0', angka 6 akan ditambahkan ke 45, menghasilkan 456.
// Fungsi ini sangat penting untuk menangani setiap digit yang dimasukkan pengguna dan memastikan layar kalkulator selalu menunjukkan angka yang benar.

// ....................................................................

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
    updateDisplay();
  }
}

// Penjelasan Logika:
// Jika desimal belum ada di angka saat ini:
// Fungsi akan menambahkan titik desimal ke angka yang sudah ada di layar.
// Jika desimal sudah ada:
// Fungsi tidak akan menambahkan titik desimal kedua, mencegah kesalahan format angka seperti 45.67.89.

// Fungsi ini memastikan bahwa kalkulator hanya dapat menambahkan satu titik desimal ke dalam angka, sehingga angka yang ditampilkan tetap dalam format yang valid. Desimal sangat penting dalam perhitungan angka pecahan, dan fungsi ini membantu menjaga integritas angka desimal di layar.
// ..................................................................
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  updateDisplay();
}

// Penjelasan Alur Logika:
// Jika kalkulator sedang menunggu operand kedua, hanya operator yang diperbarui, tanpa melakukan perhitungan.
// Jika operand pertama belum ada dan pengguna memilih operator (misalnya setelah memasukkan angka pertama), operand pertama disimpan sebagai angka yang baru dimasukkan (inputValue).
// Jika sudah ada operator sebelumnya, kalkulasi dilakukan antara operand pertama dan operand kedua, dan hasilnya diperbarui di layar serta disimpan sebagai operand pertama untuk operasi selanjutnya.

// Contoh:
// Kasus 1: Pengguna memasukkan 5, lalu menekan tombol +:
// firstOperand akan diset ke 5, dan kalkulator menunggu operand kedua.
// Kasus 2: Setelah menekan +, pengguna memasukkan 3, lalu menekan tombol =:
// Fungsi akan menghitung 5 + 3, memperbarui layar dengan hasil 8, dan menyimpan 8 sebagai firstOperand untuk operasi selanjutnya.
// Kesimpulan:
// Fungsi ini mengatur transisi antara operand dan operator, serta melakukan perhitungan matematika ketika diperlukan. Selain itu, fungsi ini memastikan bahwa kalkulator dapat menangani urutan operasi dengan benar, seperti menghitung hasil setelah operator ditekan atau mengubah operator sebelum operand kedua dimasukkan.
// Baris kode ini mempersiapkan kalkulator untuk operasi lanjutan dengan menyetel status kalkulator ke mode "menunggu operand kedua" dan menyimpan operator yang dipilih pengguna. Ini adalah bagian penting dalam alur kalkulasi, karena mengatur transisi dari memasukkan operand pertama ke operand kedua sebelum melakukan perhitungan.

// ..................................................................

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } else if (operator === '√') {
    return Math.sqrt(firstOperand);
  } else if (operator === '%') {
    return firstOperand / 100;
  }

  return secondOperand;
}

// Fungsi calculate() menangani semua operasi matematika dasar yang dibutuhkan kalkulator, mulai dari operasi aritmatika standar hingga perhitungan persentase dan akar kuadrat. Fungsi ini menggunakan struktur kondisional yang sederhana untuk memutuskan operasi mana yang harus dilakukan berdasarkan input dari operator yang dipilih pengguna.

//................................................................

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}

// Fungsi resetCalculator() mengembalikan kalkulator ke kondisi awalnya dengan mengatur ulang semua nilai penting seperti displayValue, firstOperand, waitingForSecondOperand, dan operator. Ini memastikan bahwa kalkulator benar-benar bersih, dan siap untuk melakukan perhitungan baru dari awal. Ketika pengguna menekan tombol "AC", fungsi ini mempersiapkan kalkulator untuk menerima input baru seolah-olah baru saja dinyalakan.

//...................................................................

function handleEqual() {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && !calculator.waitingForSecondOperand) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
  }
}

// Fungsi handleEqual() bertugas untuk melakukan perhitungan akhir ketika tombol = ditekan. Fungsi ini memeriksa apakah kalkulator siap untuk menghitung, kemudian melakukan perhitungan, memperbarui layar dengan hasilnya, dan mengatur ulang kalkulator agar siap untuk perhitungan baru.

//.......................................................................

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    return;
  }
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    return;
  }
  if (target.classList.contains('all-clear')) {
    resetCalculator();
    return;
  }
  if (target.classList.contains('equal-sign')) {
    handleEqual();
    return;
  }

  inputDigit(target.value);
});

// Kesimpulan:
// Fungsi utama ini bertindak sebagai penghubung antara antarmuka pengguna (tombol kalkulator) dan logika internal kalkulator.
// Berdasarkan kelas tombol yang diklik, fungsi memanggil perintah yang tepat:
// Operator → handleOperator()
// Desimal → inputDecimal()
// Reset → resetCalculator()
// Equal Sign → handleEqual()
// Angka → inputDigit()
// Setiap interaksi pengguna melalui klik tombol diterjemahkan menjadi logika yang sesuai untuk menjalankan kalkulator.

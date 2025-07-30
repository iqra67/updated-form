document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const phoneInput = document.getElementById("phoneInput");
  const countryCode = document.getElementById("countryCode");
  const genderError = document.querySelector(".d-block");
  const tableDiv = document.getElementById("tableDiv");
  const tableBody = document.querySelector("#dataTable tbody");

  const countryLengths = {
    "+92": 10,
    "+91": 10,
    "+1": 10,
    "+44": 10,
  };

  function validateName(name) {
    return /^[A-Za-z\s]+$/.test(name);
  }

  function validatePhone(number, code) {
    return /^\d+$/.test(number) && number.length === countryLengths[code];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear all previous error messages
    const errors = document.querySelectorAll(".invalid-feedback");
    errors.forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
    genderError.style.display = "none";
    

    // Get values
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const age = document.getElementById("age");
    const country = document.getElementById("country");
    const city = document.getElementById("city");
    const address = document.getElementById("address");
    const profession = document.getElementById("profession");
    const genderInputs = document.getElementsByName("gender");

    let gender = "";
    for (let g of genderInputs) {
      if (g.checked) {
        gender = g.value;
      }
    }

    // Validation flags
    let isValid = true;

    if (!validateName(name.value.trim())) {
      name.nextElementSibling.textContent = "Name should contain only letters.";
      name.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
      email.nextElementSibling.textContent = "Enter a valid email.";
      email.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (password.value.length < 6) {
      password.nextElementSibling.textContent = "Password must be at least 6 characters.";
      password.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!gender) {
      genderError.textContent = "Please select a gender.";
      genderError.style.display = "block";
      isValid = false;
    }

    if (age.value < 1 || age.value > 120) {
      age.nextElementSibling.textContent = "Enter a valid age.";
      age.nextElementSibling.style.display = "block";
      isValid = false;
    }

    const code = countryCode.value;
    const number = phoneInput.value;
    if (!validatePhone(number, code)) {
      phoneInput.parentElement.nextElementSibling.textContent =
        `Enter valid phone number of ${countryLengths[code]} digits.`;
      phoneInput.parentElement.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!validateName(country.value)) {
      country.nextElementSibling.textContent = "Invalid country name.";
      country.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!validateName(city.value)) {
      city.nextElementSibling.textContent = "Invalid city name.";
      city.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (address.value.trim().length < 5) {
      address.nextElementSibling.textContent = "Address too short.";
      address.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!validateName(profession.value)) {
      profession.nextElementSibling.textContent = "Invalid profession.";
      profession.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // ✅ Add data to table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name.value}</td>
      <td>${email.value}</td>
      <td>${gender}</td>
      <td>${age.value}</td>
      <td>${code}${number}</td>
      <td>${country.value}</td>
      <td>${city.value}</td>
      <td>${address.value}</td>
      <td>${profession.value}</td>
    `;
    tableBody.appendChild(row);
    tableDiv.style.display = "block";
    form.reset();
  });

  // Show Password Toggle
  const showPasswordCheckbox = document.getElementById("showPassword");
  const passwordField = document.getElementById("password");
  showPasswordCheckbox.addEventListener("change", function () {
    passwordField.type = this.checked ? "text" : "password";
  });

  // Phone Input: allow only digits
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
    const maxLength = countryLengths[countryCode.value];
    if (this.value.length > maxLength) {
      this.value = this.value.slice(0, maxLength);
    }
  });

  countryCode.addEventListener("change", function () {
    const maxLength = countryLengths[this.value];
    phoneInput.value = "";
    phoneInput.setAttribute("maxlength", maxLength);
  });
  
});

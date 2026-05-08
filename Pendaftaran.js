// pendaftaran.js

document.addEventListener('DOMContentLoaded', function () {
    // 1. Logika Toggle Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Logika Form Pendaftaran
    const form = document.getElementById('registrationForm');
    const successAlert = document.getElementById('success-alert');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Fungsi untuk menampilkan pesan error
            const showError = (input, show) => {
                const parent = input.closest('div') || input.parentElement;
                const errorMsg = parent.querySelector('.error-msg');
                if (errorMsg) {
                    if (show) {
                        errorMsg.classList.remove('hidden');
                        input.classList.add('border-red-500');
                    } else {
                        errorMsg.classList.add('hidden');
                        input.classList.remove('border-red-500');
                    }
                }
            };

            // --- VALIDASI INPUT ---

            // Full Name
            const nameInput = document.getElementById('fullName');
            if (nameInput.value.trim() === '') { showError(nameInput, true); isValid = false; } else { showError(nameInput, false); }

            // Club (NIM)
            const nimInput = document.getElementById('nim');
            if (nimInput.value.trim() === '') { showError(nimInput, true); isValid = false; } else { showError(nimInput, false); }

            // Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) { showError(emailInput, true); isValid = false; } else { showError(emailInput, false); }

            // Phone
            const phoneInput = document.getElementById('phone');
            if (phoneInput.value.length < 10) { showError(phoneInput, true); isValid = false; } else { showError(phoneInput, false); }

            // Faculty/Jemaat (Select)
            const facultyInput = document.getElementById('faculty');
            if (facultyInput.value === "") { showError(facultyInput, true); isValid = false; } else { showError(facultyInput, false); }

            // Date of Birth
            const dobInput = document.getElementById('dob');
            if (dobInput.value === "") { showError(dobInput, true); isValid = false; } else { showError(dobInput, false); }

            // Gender (Radio)
            const genderMale = document.querySelector('input[name="gender"][value="Male"]');
            const genderFemale = document.querySelector('input[name="gender"][value="Female"]');
            const genderError = document.getElementById('gender-error');
            if (!genderMale.checked && !genderFemale.checked) {
                genderError.classList.remove('hidden');
                isValid = false;
            } else {
                genderError.classList.add('hidden');
            }

            // Bukti Bayar (File)
            const buktiInput = document.getElementById('bukti_bayar');
            if (buktiInput.files.length === 0) { showError(buktiInput, true); isValid = false; } else { showError(buktiInput, false); }

            // Address
            const addressInput = document.getElementById('address');
            if (addressInput.value.trim() === '') { showError(addressInput, true); isValid = false; } else { showError(addressInput, false); }

            // --- PENGIRIMAN DATA ---
            if (isValid) {
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                
                // Ubah tombol saat loading
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = "Processing...";
                submitBtn.disabled = true;

                fetch('submit.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) 
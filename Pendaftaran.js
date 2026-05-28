// GANTI DENGAN URL WEB APP HASIL DEPLOY GOOGLE SCRIPT ANDA
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCFLCA__Q0wtKKn_EOt_DiBioDOcA9lWHuybTJbTqGa7nQslGlgJSJ21Hyg4HczdifJQ/exec";

const registrationForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const modalContent = document.getElementById('modalContent');

/**
 * HANDLER SUBMIT FORM
 */
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-pulse">Sedang Memproses...</span>';

    try {
        const fileInput = document.getElementById('bukti_bayar');
        const file = fileInput.files[0];
        
        // Konversi File ke Base64
        const base64Data = await toBase64(file);
        const base64String = base64Data.split(',')[1];
        const contentType = base64Data.split(',')[0].split(':')[1].split(';')[0];

        // Ambil data form
        const formData = {
            fullName: document.getElementById('fullName').value,
            club: document.getElementById('clubManual').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            wilayah: document.getElementById('wilayahSelect').value,
            dob: document.getElementById('dob').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            address: document.getElementById('address').value,
            fileBase64: base64String,
            fileType: contentType
        };

        // Kirim ke Google Script menggunakan POST JSON
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.result === 'success') {
            showSuccessModal();
            registrationForm.reset();
            document.getElementById('file-label').textContent = "Click to upload your receipt";
        } else {
            throw new Error(result.error);
        }

    } catch (error) {
        console.error('Error!', error);
        alert("Gagal mengirim data: " + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="relative z-10 text-[11px] font-black tracking-[0.5em] uppercase text-white">Daftar Sekarang</span>';
    }
});

/**
 * FUNGSI KONVERSI FILE KE BASE64
 */
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/**
 * TAMPILKAN MODAL SUKSES (Identik dengan Gambar)
 */
function showSuccessModal() {
    successModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 50);
}

/**
 * TUTUP MODAL
 */
function closeSuccess() {
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        successModal.classList.add('hidden');
    }, 300);
}

/**
 * UPDATE NAMA FILE SAAT UPLOAD
 */
document.getElementById('bukti_bayar').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || "Click to upload your receipt";
    document.getElementById('file-label').textContent = fileName;
});

/**
 * EFEK PARALLAX BACKGROUND
 */
window.addEventListener('mousemove', (e) => {
    const bg = document.getElementById('parallax-bg');
    if(bg) {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        bg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    }
});
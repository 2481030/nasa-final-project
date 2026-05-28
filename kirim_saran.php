<?php
// 1. Koneksi Database
$host = "localhost";
$user = "root";
$pass = "";
$db   = "pathfinder_dsku";

$conn = mysqli_connect($host, $user, $pass, $db);

// Cek jika data dikirim melalui POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Ambil data dari form
    $nama  = $_POST['nama'] ?? '';
    $email = $_POST['email'] ?? '';
    $pesan = $_POST['pesan'] ?? '';

    // Validasi sederhana
    if (empty($nama) || empty($pesan)) {
        echo "Nama dan pesan tidak boleh kosong";
        exit;
    }

    // A. Simpan ke File Teks (log_saran.txt)
    $file = 'log_saran.txt';
    $isi_saran = "Nama: $nama | Email: $email | Pesan: $pesan" . PHP_EOL;
    file_put_contents($file, $isi_saran, FILE_APPEND);

    // B. Simpan ke Database (Pastikan tabel 'saran' sudah ada)
    if($conn) {
        $query = "INSERT INTO saran (nama, email, pesan) VALUES ('$nama', '$email', '$pesan')";
        mysqli_query($conn, $query);
    }

    // Output HANYA "success"
    echo "success";

} else {
    echo "Metode pengiriman salah";
}
?>
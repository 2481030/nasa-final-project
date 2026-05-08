<?php
include 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = $_POST['fullName'];
    $club_nim  = $_POST['nim'];
    $email     = $_POST['email'];
    $phone     = $_POST['phone'];
    $jemaat    = $_POST['faculty'];
    $dob       = $_POST['dob'];
    $gender    = isset($_POST['gender']) ? $_POST['gender'] : '';
    $address   = $_POST['address'];

    // Proses Upload Gambar
    $target_dir = "uploads/";
    
    // Buat folder uploads jika belum ada
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_extension = pathinfo($_FILES["bukti_bayar"]["name"], PATHINFO_EXTENSION);
    $new_filename = time() . '_' . preg_replace("/[^a-zA-Z0-9]/", "_", $full_name) . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($_FILES["bukti_bayar"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO pendaftar (full_name, club_nim, email, phone, jemaat, dob, gender, bukti_bayar, address) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sssssssss", $full_name, $club_nim, $email, $phone, $jemaat, $dob, $gender, $new_filename, $address);

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Gagal simpan database: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Gagal upload gambar.']);
    }
}
?>
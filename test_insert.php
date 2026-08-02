<?php
// test_insert.php - اختبار الإدخال في قاعدة البيانات

require_once 'connect.php';

// Test data
$name = "Test User";
$age = 25;
$phone = "01125993315";
$email = "test@email.com";
$address = "Cairo";
$reason = "Testing";

try {
    $stmt = $con->prepare("
        INSERT INTO users (name, age, phone, email, address, reason) 
        VALUES (:name, :age, :phone, :email, :address, :reason)
    ");
    
    $result = $stmt->execute([
        ':name' => $name,
        ':age' => $age,
        ':phone' => $phone,
        ':email' => $email,
        ':address' => $address,
        ':reason' => $reason
    ]);
    
    if ($result) {
        echo "✅ Test data inserted successfully! ID: " . $con->lastInsertId();
    } else {
        echo "❌ Failed to insert test data.";
    }
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage();
}
?>
<?php
// test_db.php - اختبار الاتصال بقاعدة البيانات

require_once 'connect.php';

echo "✅ Database connected successfully!<br>";

// Test if users table exists
try {
    $stmt = $con->query("SELECT COUNT(*) FROM users");
    $count = $stmt->fetchColumn();
    echo "📊 Users table found. Total rows: " . $count . "<br>";
    
    // Show table structure
    $stmt = $con->query("DESCRIBE users");
    echo "<br>📋 Table Structure:<br>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "- " . $row['Field'] . " (" . $row['Type'] . ")<br>";
    }
    
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
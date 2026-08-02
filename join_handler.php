<?php
// ===========================
// Join Handler - Save User Data
// ===========================

// Set header to return JSON
header('Content-Type: application/json');

// Include database connection
require_once 'connect.php';

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get and secure all form data
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name'])) : '';
    $age = isset($_POST['age']) ? intval($_POST['age']) : 0;
    $phone = isset($_POST['phone']) ? htmlspecialchars(strip_tags($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(strip_tags($_POST['email'])) : '';
    $address = isset($_POST['address']) ? htmlspecialchars(strip_tags($_POST['address'])) : '';
    $reason = isset($_POST['reason']) ? htmlspecialchars(strip_tags($_POST['reason'])) : '';
    
    // Validate required fields
    if (empty($name) || empty($age) || empty($phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all required fields: Name, Age, and Phone.'
        ]);
        exit;
    }
    
    try {
        // Prepare SQL statement
        $stmt = $con->prepare("
            INSERT INTO users (name, age, phone, email, address, reason) 
            VALUES (:name, :age, :phone, :email, :address, :reason)
        ");
        
        // Execute with data
        $stmt->execute([
            ':name' => $name,
            ':age' => $age,
            ':phone' => $phone,
            ':email' => $email,
            ':address' => $address,
            ':reason' => $reason
        ]);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Your application has been submitted successfully!'
        ]);
        
    } catch (PDOException $e) {
        // Return error response
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
    
} else {
    // If not POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method. Please use POST.'
    ]);
}
?>
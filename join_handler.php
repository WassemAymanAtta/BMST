<?php
// ===========================
// Join Handler - Save User Data
// ===========================

// Include database connection
require_once 'connect.php';

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get and secure all form data
    $name = SecureRequests('name');
    $age = SecureRequests('age');
    $phone = SecureRequests('phone');
    $email = SecureRequests('email');
    $address = SecureRequests('address');
    $reason = SecureRequests('reason');
    
    // Validate required fields
    if (empty($name) || empty($age) || empty($phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all required fields.'
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
        'message' => 'Invalid request method.'
    ]);
}
?>
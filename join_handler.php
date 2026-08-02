<?php
// ===========================
// Join Handler - Save User Data
// ===========================

// Show errors for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
    
    // Debug: Log received data
    error_log("Received: Name=$name, Age=$age, Phone=$phone, Email=$email, Address=$address, Reason=$reason");
    
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
        $result = $stmt->execute([
            ':name' => $name,
            ':age' => $age,
            ':phone' => $phone,
            ':email' => $email,
            ':address' => $address,
            ':reason' => $reason
        ]);
        
        // Debug: Check result
        error_log("Insert result: " . ($result ? 'SUCCESS' : 'FAILED'));
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Your application has been submitted successfully!'
        ]);
        
    } catch (PDOException $e) {
        // Return error response
        error_log("Database Error: " . $e->getMessage());
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
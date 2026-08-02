<?php
// ✅ دالة للأمان مع POST
function SecureRequests($request) {
    return isset($_POST[$request]) ? htmlspecialchars(strip_tags($_POST[$request])) : '';
}

// ✅ دالة للأمان مع GET
function SecureRequest($request) {
    return isset($_GET[$request]) ? htmlspecialchars(strip_tags($_GET[$request])) : '';
}
?>
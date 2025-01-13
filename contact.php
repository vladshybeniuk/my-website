<?php
header('Content-Type: application/json');

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$company = $data['company'] ?? '';
$goal = $data['goal'] ?? '';
$message = $data['message'] ?? '';

// Recipient email
$to = 'sophia@hey-aura.agency';

// Email subject
$subject = "New Contact Form Submission from $name";

// Email content
$email_content = "
Name: $name
Email: $email
Company: $company
Goal: $goal

Message:
$message
";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$success = mail($to, $subject, $email_content, $headers);

// Return response
if ($success) {
    echo json_encode(['status' => 'success', 'message' => 'Thank you for your message. We will get back to you soon!']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error sending your message.']);
}

<?php
// -----------------------------
// Party Rentals & Event Services
// Contact Form Handler
// -----------------------------

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ""));
    $message = htmlspecialchars(trim($_POST["message"] ?? ""));

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        echo "<h2 style='color:red; text-align:center;'>⚠️ Please fill in all required fields.</h2>";
        echo "<p style='text-align:center;'><a href='contact.html'>Go Back</a></p>";
        exit;
    }

    // (Optional) Send email — InfinityFree may block mail()
    // Uncomment this if using another SMTP provider
    // mail("your-email@example.com", "New Contact Form Submission", $message);

    // Success message HTML
    echo "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Message Received</title>
        <link rel='stylesheet' href='style.css'>
        <style>
            body { text-align: center; background-color: #faf7ff; font-family: 'Poppins', sans-serif; }
            .success-box {
                margin: 80px auto;
                max-width: 600px;
                background: #f6edff;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            h2 { color: #4b0082; }
            p { color: #333; font-size: 1.1em; }
            a.button {
                background: #9d4edd;
                color: white;
                padding: 10px 22px;
                border-radius: 8px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
                font-weight: bold;
            }
            a.button:hover { background: #7b2cbf; }
        </style>
    </head>
    <body>
        <div class='success-box'>
            <h2>✅ Thank you, $name!</h2>
            <p>Your message has been successfully submitted.</p>
            <p>We’ll get back to you at <strong>$email</strong> soon.</p>";

    if (!empty($phone)) {
        echo "<p>📞 We may also contact you at: <strong>$phone</strong></p>";
    }

    echo "
            <a href='index.html' class='button'>Return to Home</a>
        </div>
    </body>
    </html>";
} else {
    echo "<h2 style='color:red; text-align:center;'>⚠️ Invalid request. Please submit the form properly.</h2>";
    echo "<p style='text-align:center;'><a href='contact.html'>Go Back</a></p>";
}
?>

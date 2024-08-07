// <?php
/**
 * Requires the "PHP Email Form" library
 * The "PHP Email Form" library is available only in the pro version of the template
 * The library should be uploaded to: vendor/php-email-form/php-email-form.php
 * For more info and help: https://bootstrapmade.com/php-email-form/
 */

// Replace contact@example.com with your real receiving email address
// $receiving_email_address = 'dinesh.intelliod@gmail.com';

// if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
//     include($php_email_form);
// } else {
//     die('Unable to load the "PHP Email Form" Library!');
// }

// $contact = new PHP_Email_Form;
// $contact->ajax = true;

// $contact->to = $receiving_email_address;
// $contact->from_name = $_POST['name'];
// $contact->from_email = $_POST['email'];
// $contact->subject = $_POST['subject'];

// // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials

// $contact->smtp = array(
//     'host' => 'smtp-relay.brevo.com',
//     'username' => 'dinesh.intelliod@gmail.com',
//     'password' => 'L1jBrCzI8t6sH2DS',
//     'port' => '587'
// );

// // Connect to MySQL database
// $db = new mysqli('localhost', 'root', 'password', 'contact_form_db');

// // Check connection
// if ($db->connect_error) {
//     die("Connection failed: " . $db->connect_error);
// }

// // Insert form submission into database
// $name = $_POST['name'];
// $email = $_POST['email'];
// $subject = $_POST['subject'];
// $message = $_POST['message'];

// $sql = "INSERT INTO form_submissions (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";
// if ($db->query($sql) === TRUE) {
//     echo "New record created successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . $db->error;
// }

// $db->close();

// $contact->add_message($_POST['name'], 'From');
// $contact->add_message($_POST['email'], 'Email');
// $contact->add_message($_POST['message'], 'Message', 10);

// echo $contact->send();
// ?>

                                              
function submitForm() {
    // Fetch form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Construct the data object
    const data = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Send data to the server
    fetch('http://localhost:3000/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Handle response from the server
        console.log(data); // Log the response
        alert('Your form was submitted successfully to Rosys.'); // Show a success alert
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('Error: ' + error); // Show an alert with the error
    });
}

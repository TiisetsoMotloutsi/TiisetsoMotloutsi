document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate sending message
    const output = document.getElementById('form-output');
    output.textContent = "Thank you for reaching out! I'll get back to you soon.";
    this.reset();
});

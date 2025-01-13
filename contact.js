document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        company: this.querySelector('input[placeholder="Brand/Company Name"]').value,
        goal: this.querySelector('select').value,
        message: this.querySelector('textarea').value
    };

    // Show loading state
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    try {
        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        // Show success message
        if (result.status === 'success') {
            showMessage('success', result.message);
            this.reset();
        } else {
            showMessage('error', result.message);
        }
    } catch (error) {
        showMessage('error', 'Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
    }
});

function showMessage(type, message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Add message to form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageElement, form);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

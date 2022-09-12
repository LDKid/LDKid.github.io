function contactInit() {
    /**
     * Autorun function, handles setting everything up.
     */

    // Get all the inputs
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-email');
    let subject = document.getElementById('contact-subject');
    let text = document.getElementById('contact-textarea');

    // Add them all to an array to call them easily
    const INPUT_LIST = [name, email, subject, text];
    
    // Now get the submit button.
    const SUBMIT_BUTTON = document.getElementById('contact-submit');

    // Loop through all inputs and add the keyup event to them.
    INPUT_LIST.forEach(input => {
        input.addEventListener('keyup', function (_) {
            SUBMIT_BUTTON.disabled = checkInputValidity();
        });
    });

    function checkInputValidity() {
        return !INPUT_LIST.every(input => {
            if (!input.checkValidity()) {
                return false;
            }
            return true;
        });
    }
}
contactInit();
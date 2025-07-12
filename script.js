document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const paymentScreen = document.getElementById('payment-screen');
    const activateHackBtn = document.getElementById('activate-hack-btn');
    const submitUtrBubbleBtn = document.getElementById('submit-utr-bubble-btn');
    const utrDetailsForm = document.getElementById('utr-details-form');
    const screenshotUpload = document.getElementById('screenshot-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const submitPaymentBtn = document.getElementById('submit-payment-btn');

    // --- Rain Animation Setup ---
    const canvas = document.createElement('canvas');
    canvas.id = 'rain-canvas';
    document.body.prepend(canvas); // Add canvas to the top of the body
    const ctx = canvas.getContext('2d');

    let drops = [];
    const numberOfDrops = 1000; // Adjust for density

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createDrops() {
        for (let i = 0; i < numberOfDrops; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 5 + 1, // Speed of the drop
                length: Math.random() * 20 + 5, // Length of the drop
                wind: Math.random() * 0.3 - 0.15 // Slight horizontal drift
            });
        }
    }

    function drawRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        ctx.fillStyle = '#00ff00'; // Green color for drops

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];

            // Draw the drop
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + drop.wind * drop.length, drop.y + drop.length); // Line for the drop trail
            ctx.lineWidth = 1;
            ctx.stroke();

            // Update drop position
            drop.y += drop.speed;
            drop.x += drop.wind;

            // If drop goes off screen, reset it
            if (drop.y > canvas.height) {
                drops[i] = {
                    x: Math.random() * canvas.width,
                    y: -drop.length, // Start from above the screen
                    speed: Math.random() * 5 + 1,
                    length: Math.random() * 20 + 5,
                    wind: Math.random() * 0.3 - 0.15
                };
            }
        }
    }

    function animateRain() {
        drawRain();
        requestAnimationFrame(animateRain);
    }

    createDrops();
    animateRain();

    // Resize canvas if window resizes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-create drops for better distribution on resize, or just let them repopulate
        drops = []; // Clear and recreate drops for simplicity
        createDrops();
    });


    // --- Screen Transitions ---
    activateHackBtn.addEventListener('click', () => {
        welcomeScreen.classList.remove('active');
        paymentScreen.classList.add('active');
    });

    // --- UTR Form Logic ---
    submitUtrBubbleBtn.addEventListener('click', () => {
        utrDetailsForm.classList.toggle('hidden');
        // Optional: Change button text or style when form is visible
        if (!utrDetailsForm.classList.contains('hidden')) {
            submitUtrBubbleBtn.textContent = 'Hide Details';
        } else {
            submitUtrBubbleBtn.textContent = 'Submit UTR No';
        }
    });

    // Screenshot file selection handling
    screenshotUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            fileNameDisplay.textContent = files[0].name;
        } else {
            fileNameDisplay.textContent = 'No file chosen';
        }
    });

    // Submit button click
    submitPaymentBtn.addEventListener('click', () => {
        const utr = document.getElementById('utr-input').value;
        const gameId = document.getElementById('game-id-input').value;
        const screenshotFile = screenshotUpload.files[0];

        if (!utr || !gameId || !screenshotFile) {
            alert('Please fill in all details and select a screenshot!');
            return;
        }

        // --- IMPORTANT: Sending data to Telegram Bot ---
        // Direct file upload (screenshot) from client-side JS to a Telegram bot token
        // is NOT SECURE NOR RELIABLE. The Bot Token should NEVER be exposed in client-side code.
        //
        // For demonstration purposes, this is how you *would* send text data.
        // For screenshots, you need a backend.
        //
        // IF YOU ABSOLUTELY MUST AVOID BACKEND AND USE client-side JS ONLY:
        // You could potentially use a service like `transfer.sh` or `file.io` to upload the file
        // and then send the file URL to your bot via a backend proxy, or a serverless function.
        //
        // However, the MOST COMMON AND SECURE WAY is to send data to your OWN backend,
        // which then interacts with the Telegram Bot API using the bot token.

        // --- THIS PART IS SIMPLIFIED AND WILL NOT ACTUALLY SEND TO TELEGRAM ---
        // You NEED a backend to handle this securely and reliably.

        console.log("Submitting UTR:", utr);
        console.log("Game ID:", gameId);
        console.log("Screenshot:", screenshotFile.name);

        // Simulating redirect to Telegram Bot (this won't actually send the data)
        // The actual mechanism to send data to the bot needs a backend.
        window.open('https://t.me/DW_WIN_BOT?start=auto', '_blank');

        // You could also show a success message here
        alert('Details submitted! Redirecting to Telegram.');

        // You might want to clear the form or reset the screen after submission
    });

    // Add hacking text to welcome screen if you like
    const welcomeContent = document.querySelector('#welcome-screen .welcome-content');
    const hackingText1 = document.createElement('div');
    hackingText1.className = 'hacking-text';
    hackingText1.textContent = 'Hacking';
    const hackingText2 = document.createElement('div');
    hackingText2.className = 'hacking-text random-chainice';
    hackingText2.textContent = 'Hacking Random Chainice';
    welcomeContent.appendChild(hackingText1);
    welcomeContent.appendChild(hackingText2);
});
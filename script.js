// Elements
const banNumberBtn = document.getElementById('banNumberBtn');
const unbanNumberBtn = document.getElementById('unbanNumberBtn');
const banGroupBtn = document.getElementById('banGroupBtn');

const banNumberSection = document.getElementById('banNumberSection');
const unbanNumberSection = document.getElementById('unbanNumberSection');
const banCheckerSection = document.getElementById('banCheckerSection');
const banCheckResult = document.getElementById('banCheckResult');

const apiStatus = document.getElementById('apiStatus');
const banStatusMessage = document.getElementById('banStatusMessage');

// Button click handlers
banNumberBtn.addEventListener('click', () => {
    hideAllSections();
    banNumberSection.style.display = 'block';
    setActiveButton(banNumberBtn);
});

unbanNumberBtn.addEventListener('click', () => {
    hideAllSections();
    unbanNumberSection.style.display = 'block';
    setActiveButton(unbanNumberBtn);
});

banGroupBtn.addEventListener('click', () => {
    hideAllSections();
    banCheckerSection.style.display = 'block';
    setActiveButton(banGroupBtn);
});

// Generate Ban Email
document.getElementById('generateBanBtn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('banPhoneNumber').value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    const subject = `URGENT: Report Violating WhatsApp Account - ${phoneNumber}`;
    const body = `Dear WhatsApp Support Team,

I am writing to report a serious violation of WhatsApp's Terms of Service by the user with phone number: ${phoneNumber}.

This account has been engaged in the following activities:
- Sending spam messages repeatedly
- Spreading harmful misinformation
- Harassing other users with abusive content
- Distributing inappropriate and prohibited content
- Attempting to scam users through fraudulent schemes

I have encountered this user multiple times and their behavior is severely negatively impacting the WhatsApp community.

Please investigate this matter urgently and take appropriate action against this account as per WhatsApp's policies.

Thank you for your attention to this critical matter.

Sincerely,
A concerned WhatsApp user`;

    // Open default email client
    openEmailClient('support@support.whatsapp.com', subject, body);
});

// Generate Unban Email
document.getElementById('generateUnbanBtn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('unbanPhoneNumber').value.trim();
    const banReason = document.getElementById('banReason').value;
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    if (!banReason) {
        alert('Please select a ban reason');
        return;
    }
    
    const {emailContent} = generateUnbanEmail(phoneNumber, banReason);
    
    // Open default email client
    openEmailClient('support@support.whatsapp.com', 'Request to Review WhatsApp Account Ban', emailContent);
});

// Check Ban Status
document.getElementById('checkBanBtn').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('checkPhoneNumber').value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    // Show loading state
    apiStatus.textContent = "Checking ban status...";
    apiStatus.className = "api-status";
    apiStatus.style.display = "block";
    apiStatus.innerHTML = '<span class="loading"></span> Connecting to WhatsApp API...';
    
    try {
        // This is where you would integrate with your backend API
        // For now, we'll simulate the API call with a timeout
        const isBanned = await simulateApiCall(phoneNumber);
        
        let statusMessage = '';
        if (isBanned) {
            statusMessage = `
            <div class="ban-status banned">
                <div class="ban-status-title">BANNED</div>
                <div class="ban-status-detail">The phone number ${phoneNumber} is currently banned from WhatsApp.</div>
            </div>
            <div class="warning-message" style="margin-top: 15px;">
                <i class="fas fa-exclamation-circle"></i> This number has been restricted from using WhatsApp services due to violations of Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is banned';
            apiStatus.className = "api-status api-success";
            
        } else {
            statusMessage = `
            <div class="ban-status not-banned">
                <div class="ban-status-title">NOT BANNED</div>
                <div class="ban-status-detail">The phone number ${phoneNumber} is currently active on WhatsApp.</div>
            </div>
            <div class="warning-message" style="margin-top: 15px; background: #f0fff4; border-color: #68d391; color: #2f855a;">
                <i class="fas fa-info-circle"></i> This number is in good standing with WhatsApp's Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is not banned';
            apiStatus.className = "api-status api-success";
        }
        
        banStatusMessage.innerHTML = statusMessage;
        banCheckResult.style.display = 'block';
        
        // Scroll to result
        banCheckResult.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error checking ban status:', error);
        apiStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error: Could not connect to WhatsApp API';
        apiStatus.className = "api-status api-error";
    }
});

// Helper functions
function hideAllSections() {
    banNumberSection.style.display = 'none';
    unbanNumberSection.style.display = 'none';
    banCheckerSection.style.display = 'none';
    banCheckResult.style.display = 'none';
    apiStatus.style.display = 'none';
}

function setActiveButton(button) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
}

function validatePhoneNumber(phone) {
    return phone.startsWith('+') && phone.length > 8 && phone.length < 16;
}

function simulateBanCheck(phoneNumber) {
    // This is a simulation - in a real implementation, this would be an API call
    // For demonstration purposes, we'll randomly determine status based on the last digit
    const lastDigit = parseInt(phoneNumber.slice(-1));
    return lastDigit % 3 === 0; // Approximately 1/3 of numbers will show as "banned"
}

function simulateApiCall(phoneNumber) {
    // Simulate API call with delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real implementation, this would be an actual API call
            // For now, we'll simulate success 80% of the time
            if (Math.random() > 0.2) {
                const lastDigit = parseInt(phoneNumber.slice(-1));
                resolve(lastDigit % 3 === 0);
            } else {
                throw new Error("API connection failed");
            }
        }, 2000);
    });
}

function openEmailClient(email, subject, body) {
    // Encode the subject and body for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Create mailto link
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open the default email client
    window.location.href = mailtoLink;
}

function generateUnbanEmail(phoneNumber, banReason) {
    let emailContent = "";
    
    // Current date for the email
    const currentDate = new Date().toLocaleDateString();
    
    switch(banReason) {
        case "unofficial":
            emailContent = `Dear WhatsApp Support Team,

I am writing to appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I understand that my account was banned due to using an unofficial version of WhatsApp. I recognize that this violates WhatsApp's Terms of Service, and I sincerely apologize for this mistake.

I have now uninstalled the unauthorized application and installed the official WhatsApp app from the approved app store. I assure you that I will only use the official WhatsApp application moving forward and will strictly adhere to all Terms of Service.

WhatsApp is essential for my daily communication with family, friends, and colleagues. I kindly request you to review my appeal and consider reinstating my account.

Thank you for your time and consideration.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        case "spam":
            emailContent = `Dear WhatsApp Support Team,

I am writing to respectfully appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I believe my account may have been flagged for sending multiple messages in a short period. I understand how this activity could be perceived as spam-like behavior, and I sincerely apologize if my actions violated WhatsApp's policies.

I want to assure you that my intentions were not to spam or abuse the platform. I value WhatsApp as a communication tool and understand the importance of maintaining a positive user experience for everyone.

I have reviewed WhatsApp's Terms of Service and will ensure that my future messaging practices fully comply with your guidelines. I will be more mindful of my messaging frequency and content.

Please consider reinstating my account. WhatsApp is crucial for my personal and professional communications.

Thank you for your understanding.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        // Other cases would follow the same pattern...
            
        default:
            emailContent = `Dear WhatsApp Support Team,

I am writing to respectfully appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I recently discovered that my account has been banned, but I have not received specific information about what policy I may have violated. I have reviewed WhatsApp's Terms of Service and believe I have been using the platform in compliance with all guidelines.

If I have unintentionally violated any policies, I sincerely apologize and would appreciate understanding what specific actions led to this ban so I can avoid them in the future.

I value WhatsApp as my primary communication platform and rely on it for both personal and professional connections. I kindly request you to review my account and consider reinstating my access.

Thank you for your time and attention to this matter.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
    }
    
    return {emailContent};
}

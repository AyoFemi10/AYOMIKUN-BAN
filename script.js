// Elements
const banNumberBtn = document.getElementById('banNumberBtn');
const unbanNumberBtn = document.getElementById('unbanNumberBtn');
const banGroupBtn = document.getElementById('banGroupBtn');
const unbanGroupBtn = document.getElementById('unbanGroupBtn');
const banCheckerBtn = document.getElementById('banCheckerBtn');
const devInfoBtn = document.getElementById('devInfoBtn');
const contactMeBtn = document.getElementById('contactMeBtn');
const supportMeBtn = document.getElementById('supportMeBtn');
const requestReviewBtn = document.getElementById('requestReviewBtn');
const submitReviewBtn = document.getElementById('submitReviewBtn');

const banNumberSection = document.getElementById('banNumberSection');
const unbanNumberSection = document.getElementById('unbanNumberSection');
const banCheckerSection = document.getElementById('banCheckerSection');
const devInfoSection = document.getElementById('devInfoSection');
const banCheckResult = document.getElementById('banCheckResult');
const whatsappBanSimulation = document.getElementById('whatsappBanSimulation');
const reviewSection = document.getElementById('reviewSection');
const reviewStatus = document.getElementById('reviewStatus');

const apiStatus = document.getElementById('apiStatus');
const banEmailSuccess = document.getElementById('banEmailSuccess');
const unbanEmailSuccess = document.getElementById('unbanEmailSuccess');

const contactButtons = document.getElementById('contactButtons');
const supportButtons = document.getElementById('supportButtons');

// Button click handlers
banNumberBtn.addEventListener('click', () => {
    hideAllSections();
    banNumberSection.style.display = 'block';
});

unbanNumberBtn.addEventListener('click', () => {
    hideAllSections();
    unbanNumberSection.style.display = 'block';
});

banCheckerBtn.addEventListener('click', () => {
    hideAllSections();
    banCheckerSection.style.display = 'block';
});

devInfoBtn.addEventListener('click', () => {
    hideAllSections();
    devInfoSection.style.display = 'block';
});

// Contact Me button
contactMeBtn.addEventListener('click', () => {
    contactButtons.classList.toggle('hidden');
    supportButtons.classList.add('hidden');
});

// Support Me button
supportMeBtn.addEventListener('click', () => {
    supportButtons.classList.toggle('hidden');
    contactButtons.classList.add('hidden');
});

// Contact options
document.getElementById('emailContactBtn').addEventListener('click', () => {
    openEmailClient('ayomikuntech6@gmail.com', 'Support Request - AYOMIKUN BAN SITE', 'Hello Ayomikun,\n\nI would like to contact you regarding:\n\n');
});

document.getElementById('telegramContactBtn').addEventListener('click', () => {
    window.open('https://t.me/mikunistheemperor', '_blank');
});

// Support options
document.getElementById('githubSupportBtn').addEventListener('click', () => {
    window.open('https://github.com/AyoFemi10', '_blank');
});

document.getElementById('youtubeSupportBtn').addEventListener('click', () => {
    window.open('https://youtube.com/@ayomikun-techies?si=ReKfAOvNhV5XotCi', '_blank');
});

document.getElementById('telegramSupportBtn').addEventListener('click', () => {
    window.open('https://t.me/+wg4roMAo-q5mNzk0', '_blank');
});

document.getElementById('whatsappSupportBtn').addEventListener('click', () => {
    window.open('https://whatsapp.com/channel/0029Vb69eXLKbYMRna7FeC1T', '_blank');
});

// WhatsApp Ban Simulation
requestReviewBtn.addEventListener('click', () => {
    reviewSection.style.display = 'block';
});

submitReviewBtn.addEventListener('click', () => {
    reviewSection.style.display = 'none';
    reviewStatus.style.display = 'block';
    // After 3 seconds, show a final status
    setTimeout(() => {
        reviewStatus.innerHTML = 'This account can no longer use WhatsApp.<br>Chats are still on this device.<br><button class="whatsapp-ban-button">Check review status</button>';
    }, 3000);
});

// Placeholder for group functions
banGroupBtn.addEventListener('click', () => {
    hideAllSections();
    alert('Group ban functionality is currently being updated. Please check back later.');
});

unbanGroupBtn.addEventListener('click', () => {
    hideAllSections();
    alert('Group unban functionality is currently being updated. Please check back later.');
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
    
    // Show success message
    banEmailSuccess.style.display = 'block';
    setTimeout(() => {
        banEmailSuccess.style.display = 'none';
    }, 5000);
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
    
    // Show success message
    unbanEmailSuccess.style.display = 'block';
    setTimeout(() => {
        unbanEmailSuccess.style.display = 'none';
    }, 5000);
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
            <div style="color: #ee4b2b; font-weight: bold;">
                <i class="fas fa-ban"></i> BANNED<br><br>
                The phone number ${phoneNumber} is currently banned from WhatsApp.
            </div>
            <div class="warning-message" style="margin-top: 15px;">
                <i class="fas fa-exclamation-circle"></i> This number has been restricted from using WhatsApp services due to violations of Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is banned';
            apiStatus.className = "api-status api-success";
            
            // Show WhatsApp ban simulation
            banCheckResult.style.display = 'block';
            whatsappBanSimulation.style.display = 'block';
            reviewSection.style.display = 'none';
            reviewStatus.style.display = 'none';
            
        } else {
            statusMessage = `
            <div style="color: #4ecca3; font-weight: bold;">
                <i class="fas fa-check-circle"></i> NOT BANNED<br><br>
                The phone number ${phoneNumber} is currently active on WhatsApp.
            </div>
            <div class="warning-message" style="margin-top: 15px;">
                <i class="fas fa-info-circle"></i> This number is in good standing with WhatsApp's Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is not banned';
            apiStatus.className = "api-status api-success";
            banCheckResult.style.display = 'block';
            whatsappBanSimulation.style.display = 'none';
        }
        
        document.getElementById('banStatusMessage').innerHTML = statusMessage;
        
        // Scroll to result
        banCheckResult.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error checking ban status:', error);
        apiStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error: Could not connect to WhatsApp API';
        apiStatus.className = "api-status api-error";
        
        // Fallback to simulated result if API fails
        setTimeout(() => {
            const isBanned = simulateBanCheck(phoneNumber);
            
            let statusMessage = '';
            if (isBanned) {
                statusMessage = `
                <div style="color: #ee4b2b; font-weight: bold;">
                    <i class="fas fa-ban"></i> BANNED<br><br>
                    The phone number ${phoneNumber} appears to be banned from WhatsApp.
                </div>
                <div class="warning-message" style="margin-top: 15px;">
                    <i class="fas fa-exclamation-circle"></i> This number has been restricted from using WhatsApp services.
                </div>`;
                
                // Show WhatsApp ban simulation
                banCheckResult.style.display = 'block';
                whatsappBanSimulation.style.display = 'block';
                reviewSection.style.display = 'none';
                reviewStatus.style.display = 'none';
            } else {
                statusMessage = `
                <div style="color: #4ecca3; font-weight: bold;">
                    <i class="fas fa-check-circle"></i> NOT BANNED<br><br>
                    The phone number ${phoneNumber} appears to be active on WhatsApp.
                </div>
                <div class="warning-message" style="margin-top: 15px;">
                    <i class="fas fa-info-circle"></i> This number is in good standing with WhatsApp's Terms of Service.
                </div>`;
                banCheckResult.style.display = 'block';
                whatsappBanSimulation.style.display = 'none';
            }
            
            document.getElementById('banStatusMessage').innerHTML = statusMessage;
            
            // Scroll to result
            banCheckResult.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
});

// Helper functions
function hideAllSections() {
    banNumberSection.style.display = 'none';
    unbanNumberSection.style.display = 'none';
    banCheckerSection.style.display = 'none';
    devInfoSection.style.display = 'none';
    banCheckResult.style.display = 'none';
    whatsappBanSimulation.style.display = 'none';
    apiStatus.style.display = 'none';
    banEmailSuccess.style.display = 'none';
    unbanEmailSuccess.style.display = 'none';
    contactButtons.classList.add('hidden');
    supportButtons.classList.add('hidden');
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
            
        case "reports":
            emailContent = `Dear WhatsApp Support Team,

I am writing to appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I understand that my account may have been reported by other users, which led to this ban. I want to sincerely apologize if any of my actions caused discomfort or were perceived as violating WhatsApp's community guidelines.

I believe there may have been a misunderstanding regarding my use of WhatsApp. I strive to use the platform respectfully and in compliance with all policies. If I unintentionally offended or bothered any users, it was certainly not my intention.

I have carefully reviewed WhatsApp's Terms of Service and community guidelines to ensure I fully understand appropriate usage. I am committed to being more mindful of how my interactions might be perceived by others.

Please consider reviewing my account and reinstating my access. WhatsApp is an essential communication tool for me.

Thank you for your time and consideration.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        case "automation":
            emailContent = `Dear WhatsApp Support Team,

I am writing to appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I understand that my account was banned due to the use of automation tools or bots. I recognize that this violates WhatsApp's Terms of Service, and I sincerely apologize for this error in judgment.

I have now discontinued all use of automated messaging systems and understand that such tools are not permitted on the WhatsApp platform. I assure you that all future messaging will be personal and manual, in full compliance with WhatsApp's policies.

WhatsApp is extremely important for my daily communications, and I kindly request you to consider reinstating my account. I promise to adhere strictly to all guidelines moving forward.

Thank you for your understanding.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        case "content":
            emailContent = `Dear WhatsApp Support Team,

I am writing to appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I understand that my account was banned due to sharing content that violates WhatsApp's community guidelines. I sincerely apologize for this serious error in judgment.

I have taken time to carefully review WhatsApp's content policies and understand what types of content are not permitted on the platform. I recognize the importance of maintaining a safe and respectful environment for all users.

I assure you that I will be much more careful about the content I share on WhatsApp in the future and will strictly adhere to all community guidelines. I understand the seriousness of this violation and am committed to being a responsible user.

Please consider giving me a second chance by reinstating my account. WhatsApp is crucial for my communication needs.

Thank you for your consideration.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        case "suspicious":
            emailContent = `Dear WhatsApp Support Team,

I am writing to appeal the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I understand that my account was flagged for suspicious activity. I want to assure you that I am the legitimate owner of this account and any unusual activity was not intentional.

It's possible that my account security was compromised, or my usage patterns may have been interpreted incorrectly by automated systems. I have now enabled two-step verification and taken additional security measures to protect my account.

I have reviewed WhatsApp's Terms of Service and security guidelines to ensure my future usage complies with all policies. I value WhatsApp as a secure platform and want to maintain that security.

Please consider reviewing my account and reinstating my access. I am happy to provide any additional verification needed.

Thank you for your time.

Sincerely,
WhatsApp User
Phone: ${phoneNumber}
Date: ${currentDate}`;
            break;
            
        case "unknown":
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

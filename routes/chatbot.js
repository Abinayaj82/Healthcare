const express = require('express');
const router = express.Router();



const faqs = [
  {
    keywords: ['register', 'sign up', 'how to register', 'registration'],
    answer:
      'To register, go to the Registration tab and fill in your details. Choose "Patient Support" if you need medical assistance or "Volunteer" if you want to help others.',
  },
  {
    keywords: ['appointment', 'book', 'schedule', 'consult'],
    answer:
      'You can book an appointment by registering as a patient first. Our team will contact you within 24 hours to schedule your consultation.',
  },
  {
    keywords: ['volunteer', 'help', 'contribute', 'join'],
    answer:
      'We welcome volunteers! Please register via the Volunteer Registration form. You can specify your availability and skills. We will reach out with opportunities that match your profile.',
  },
  {
    keywords: ['emergency', 'urgent', 'ambulance', 'critical'],
    answer:
      '🚨 For medical emergencies, please call 108 (India Emergency) immediately. Do not wait — your life is the priority.',
  },
  {
    keywords: ['cost', 'fee', 'charge', 'price', 'free', 'payment'],
    answer:
      'Our basic support services are completely free for patients in need. Some specialized consultations may have nominal charges. Please contact us for details.',
  },
  {
    keywords: ['doctor', 'specialist', 'physician', 'medical team'],
    answer:
      'We have a network of qualified doctors and specialists. After you register, our team will connect you with the appropriate healthcare professional based on your condition.',
  },
  {
    keywords: ['mental health', 'anxiety', 'depression', 'stress', 'counseling'],
    answer:
      'Mental health support is available through our volunteer counselors. Please register as a patient and mention mental health support in your message. You are not alone. 💙',
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'address'],
    answer:
      'You can reach us at support@healthcareapp.org or call +91-1800-XXX-XXXX (toll-free). Our team is available Mon–Sat, 9 AM to 6 PM.',
  },
  {
    keywords: ['diabetes', 'sugar', 'insulin', 'blood sugar'],
    answer:
      'We have specialized support for diabetes patients including diet counseling, blood sugar tracking, and connecting you with endocrinologists. Register as a patient to get started.',
  },
  {
    keywords: ['covid', 'corona', 'vaccination', 'vaccine'],
    answer:
      'For COVID-related support or vaccination information, please visit the official government portal at cowin.gov.in. We also offer post-COVID recovery counseling.',
  },
  {
    keywords: ['data', 'privacy', 'secure', 'information'],
    answer:
      'Your personal data is completely secure with us. We follow strict data privacy guidelines and never share your information with third parties without your consent.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer:
      'Hello! 👋 Welcome to HealthCare Support. How can I help you today? You can ask me about registration, appointments, volunteering, or any health-related queries.',
  },
  {
    keywords: ['thank', 'thanks', 'thank you'],
    answer: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'exit'],
    answer:
      'Take care! 💚 Remember, your health is your greatest wealth. Come back anytime if you need help.',
  },
];

// Helper: match user message to FAQ
function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (msg.includes(keyword)) {
        return faq.answer;
      }
    }
  }

  // Default fallback
  return "I'm not sure about that, but our team can help! Please register or contact us at support@healthcareapp.org. You can also try asking about: registration, appointments, volunteering, emergency contacts, or costs.";
}

// POST /api/chat
router.post('/', (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    const botResponse = getBotResponse(message);

    // Simulate slight delay for natural feel
    setTimeout(() => {
      res.json({
        success: true,
        userMessage: message,
        botResponse,
        timestamp: new Date().toISOString(),
      });
    }, 300);
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: 'Chatbot error. Please try again.' });
  }
});

module.exports = router;

const TERMS_OF_SERVICES = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Service.",
  },
  {
    title: "2. Description of Service",
    content:
      "Guru AI Teacher Language Speech provides AI-based language and speech recognition services to help users improve their language skills.",
  },
  {
    title: "3. Eligibility",
    content:
      "You must be at least 13 years old to use our Service. By using the Service, you represent and warrant that you meet this age requirement.",
  },
  {
    title: "4. Account Registration",
    content:
      "To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.",
  },
  {
    title: "5. Use of the Service",
    content:
      "You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to: <ul class='list-disc space-y-1 mt-4 ml-4'><li>Use the Service in any manner that could disable, overburden, damage, or impair the Service.</li> <li>Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose.</li> <li>Use the Service for any illegal or unauthorized purpose.</li></ul>",
  },
  {
    title: "6. Payment and Credits",
    content:
      "Guru AI Teacher Language Speech operates on a credit-based system. Users can purchase credits to access premium features of the Service. The terms of payment and pricing will be provided at the point of purchase.",
  },
  {
    title: "7. Intellectual Property",
    content:
      "All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are the exclusive property of Guru AI Teacher Language Speech and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
  },
  {
    title: "8. Termination",
    content:
      "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "In no event shall Guru AI Teacher Language Speech, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from <ul class='space-y-1 mt-4'><li>(i) your use of or inability to use the Service;</li> <li>(ii) any unauthorized access to or use of our servers and/or any personal information stored therein;</li> <li>(iii) any interruption or cessation of transmission to or from the Service.</li></ul>",
  },
  {
    title: "10. Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.",
  },
  {
    title: "11. Changes to Terms",
    content:
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have any questions about these Terms, please contact us at <br /> <br />Email: muhammadgalih451@gmail.com.",
  },
];

const PRIVACY_POLICY = [
  {
    title: "Privacy Policy for Guru AI",
    content:
      "Welcome to Guru AI. We are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use and protect your information when you use our Application.",
  },
  {
    title: "Information We Collect",
    content:
      "We may collect personal and non-personal information from you when you use the Application, including but not limited to: <ul class='list-disc space-y-1 ml-4 mt-4'><li>Personal Information: Name, email address, telephone number, and other information you provide voluntarily.</li><li>Usage Information: Information about how you use the Application, including log data, IP address, device type, and usage activity.</li></ul>",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to: <ul class='list-disc space-y-1 mt-4 ml-4'><li>Provide and manage our services.</li><li>Improve and optimize the Application.</li><li>Contact you regarding updates, offers and other relevant information.</li><li>Analyze the use of Applications for research and development purposes.</li></ul>",
  },
  {
    title: "Sharing of Your Information",
    content:
      "We will not share your personal information with third parties without your consent, except in the following cases: <ul class='list-disc space-y-1 ml-4 mt-4'><li>To comply with the law or legal process.</li><li>To protect our or other users' rights, property, or safety.</li><li>With third party service providers who assist us in running the Application, with the obligation to maintain the confidentiality of your information.</li></ul>",
  },
  {
    title: "Information Security",
    content:
      "We take reasonable steps to protect your personal information from unauthorized access, use or disclosure. However, no method of data transmission over the internet or method of electronic storage is 100% secure.",
  },
  {
    title: "Your rights",
    content:
      "You have the right to access, update, or delete your personal information that we hold. To exercise these rights, you can contact us at muhammadgalih451@gmail.com.",
  },
  {
    title: "Changes to this Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will take effect when we post the updated Privacy Policy on the App. We encourage you to review this Privacy Policy periodically.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions or concerns regarding this Privacy Policy, please contact us at: <br /><br />Email: muhammadgalih451@gmail.com.",
  },
];

interface Faq {
  question: string;
  answer: string;
}

const FAQ: Faq[] = [
  {
    question: "What is Guru AI ?",
    answer:
      "Guru AI Teacher Language Speech provides AI-based language and speech recognition services to help users improve their language skills.",
  },
  {
    question: "Can I choose my AI teacher ?",
    answer:
      "Yes, you can select from a variety of AI teachers, each specializing in different voice.",
  },
  {
    question: "What languages are available ?",
    answer:
      "Guru AI currently supports 2 language options: Indonesian and English. We will be adding more languages in the future.",
  },
  {
    question: "How does Guru AI help with language learning ?",
    answer:
      "Guru AI provides interactive conversations in the language of your choice, helping you practice grammar, listening and comprehension skills.",
  },
  {
    question: "Does Guru AI support text-to-speech ?",
    answer:
      "Yes, Guru AI includes text-to-speech functionality, allowing you to hear the correct pronunciation of words and sentences in the language you are learning.",
  },
  {
    question: "How does the credits system work ?",
    answer:
      " You purchase credits which can be used to access various features of Guru AI, such as initiating conversations with the AI assistant.",
  },
  {
    question: "How many credits do I need to start a conversation ?",
    answer:
      "The number of credits required one to start a conversation depends on the number of messages you send.",
  },
  {
    question: "What is Midtrans ?",
    answer:
      "Midtrans is a secure payment gateway that allows you to make safe and easy transactions when purchasing credits or other services within Guru AI.",
  },
];

export { TERMS_OF_SERVICES, PRIVACY_POLICY, FAQ };

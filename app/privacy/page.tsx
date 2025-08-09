'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              At OneClickPDF, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we process it, the safeguards we apply, and the rights you have. By using our website and tools, you agree to the practices described here.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-secondary-600 mb-4">
              We collect the minimum information necessary to provide and improve our services. When you upload a document for processing, the file is handled transiently for the sole purpose of performing the requested action (e.g., merge, convert, compress). We may also collect non-identifying technical data such as device type, browser version, language, and approximate location derived from your IP address for analytics and service reliability. If you contact us, we will collect the information you provide, such as your name, email address, and the contents of your message.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">2. File Handling and Retention</h2>
            <p className="text-secondary-600 mb-4">
              Files you upload are processed securely and are not used to train models or shared with third parties for marketing. Unless otherwise stated, files are automatically deleted within 24 hours after processing or earlier when you close your session. Output links may remain accessible to you during this period. You are responsible for downloading and securely storing your results. We do not keep long-term archives of your documents.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">3. Legal Bases for Processing</h2>
            <p className="text-secondary-600 mb-4">
              We process your information to perform our contract with you (providing the requested PDF tools), to comply with legal obligations, and to pursue legitimate interests such as improving service quality, preventing abuse, and maintaining security. Where required by law, we obtain your consent—for example, for optional analytics or cookies that are not strictly necessary.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">4. Security Measures</h2>
            <p className="text-secondary-600 mb-4">
              Security is built into our platform. We use HTTPS for data in transit, apply access controls, and isolate processing to minimize exposure. We continuously monitor for vulnerabilities and follow industry best practices to protect data from unauthorized access, alteration, disclosure, or destruction. While no method of transmission or storage is 100% secure, we strive to maintain a high standard of security.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">5. Cookies and Analytics</h2>
            <p className="text-secondary-600 mb-4">
              We may use strictly necessary cookies to enable core functionality and optional analytics cookies to understand aggregate usage patterns. Analytics data helps us improve performance, diagnose issues, and prioritize features. You can manage cookie preferences through your browser settings. We do not use cookies for interest-based advertising.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">6. Third-Party Services</h2>
            <p className="text-secondary-600 mb-4">
              Some functionality may rely on trusted infrastructure or content delivery providers. These partners are contractually bound to protect data and may only process information on our behalf. We do not sell your personal data. If we introduce integrations that involve additional data sharing, we will disclose those details and obtain consent where required.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">7. International Transfers</h2>
            <p className="text-secondary-600 mb-4">
              Depending on your location, your information may be processed in a country with different data protection laws. When transferring data across borders, we implement appropriate safeguards such as standard contractual clauses and technical measures that preserve confidentiality and integrity.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">8. Your Rights</h2>
            <p className="text-secondary-600 mb-4">
              Subject to applicable law, you may have the right to access, correct, delete, or restrict the processing of your personal information, as well as the right to data portability and to object to certain processing. You may also withdraw consent where processing is based on consent. We will respond to verified requests within a reasonable timeframe.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">9. Children’s Privacy</h2>
            <p className="text-secondary-600 mb-4">
              Our services are not directed to children under the age required by local law to provide consent without parental authorization. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">10. Changes to This Policy</h2>
            <p className="text-secondary-600 mb-4">
              We may update this Privacy Policy to reflect operational or regulatory changes. The “Last updated” date will be revised when changes are posted. Your continued use of OneClickPDF after an update constitutes acceptance of the revised policy.
            </p>

            <h2 className="text-2xl font-semibold text-secondary-800 mt-8 mb-4">11. Contact Us</h2>
            <p className="text-secondary-600">
              If you have questions or wish to exercise your privacy rights, please contact us at <a href="mailto:hello@oneclickpdf.info">hello@oneclickpdf.info</a>. We are committed to working with you to resolve any concerns promptly and transparently.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

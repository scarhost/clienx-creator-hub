
import { MainLayout } from "@/components/layout/MainLayout";

const Terms = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Terms of Service</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p>Last Updated: August 15, 2023</p>
            
            <p>
              Please read these terms of service carefully before using our website customization services. 
              By using our services, you agree to be bound by these terms and conditions.
            </p>
            
            <h2>1. Acceptance of Terms</h2>
            
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2>2. Services Description</h2>
            
            <p>
              WebCraft provides website customization services based on professional templates. Our services include:
            </p>
            
            <ul>
              <li>Template customization</li>
              <li>Content integration</li>
              <li>Technical setup</li>
              <li>Ongoing maintenance (as per selected plan)</li>
              <li>Support services</li>
            </ul>
            
            <h2>3. Payment Terms</h2>
            
            <p>
              Services are billed according to the plan selected. Monthly subscriptions are billed in advance. 
              Setup fees are due before work begins. All fees are non-refundable unless otherwise stated.
            </p>
            
            <h2>4. Intellectual Property Rights</h2>
            
            <p>
              Upon full payment, you will own the rights to the content you provide. Template licensing rights 
              are granted as part of your subscription. WebCraft retains rights to the base templates and 
              any proprietary code or systems.
            </p>
            
            <h2>5. Client Responsibilities</h2>
            
            <p>Clients are responsible for:</p>
            
            <ul>
              <li>Providing accurate and timely content</li>
              <li>Reviewing and approving deliverables</li>
              <li>Maintaining their own domain and hosting (unless included in plan)</li>
              <li>Ensuring content complies with all applicable laws</li>
            </ul>
            
            <h2>6. Service Level Agreement</h2>
            
            <p>
              We strive to maintain 99.9% uptime for all services we host. Support response times vary by plan level. 
              Emergency support is available for critical issues as defined in your service agreement.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            
            <p>
              WebCraft shall not be liable for any indirect, incidental, special, consequential or punitive damages, 
              or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
            
            <h2>8. Term and Termination</h2>
            
            <p>
              Services continue until terminated by either party with 30 days written notice. We reserve the right 
              to terminate services immediately for violation of these terms.
            </p>
            
            <h2>9. Modifications to Terms</h2>
            
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an 
              updated revision date. Continued use of services constitutes acceptance of modified terms.
            </p>
            
            <h2>10. Contact Information</h2>
            
            <p>
              For questions about these terms, please contact us at:<br />
              Email: legal@webcraft.com<br />
              Phone: (555) 123-4567<br />
              Address: 123 Web Street, Suite 100, San Francisco, CA 94101
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;

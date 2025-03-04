
import { MainLayout } from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Privacy Policy</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p>Last Updated: August 15, 2023</p>
            
            <p>
              At WebCraft, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2>1. Information We Collect</h2>
            
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
            
            <h2>2. How We Use Your Personal Data</h2>
            
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            
            <h2>3. Data Security</h2>
            
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
              In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
            
            <h2>4. Data Retention</h2>
            
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, 
              including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
            </p>
            
            <h2>5. Your Legal Rights</h2>
            
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            
            <h2>6. Contact Us</h2>
            
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:<br />
              Email: privacy@webcraft.com<br />
              Phone: (555) 123-4567<br />
              Address: 123 Web Street, Suite 100, San Francisco, CA 94101
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;

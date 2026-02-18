import React from 'react';
import { Layout } from '../components/ui/Layout';
export function Privacy() {
  return <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#222222] pb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[#888888]">Last updated: October 2023</p>
        </div>

        <div className="space-y-8 text-[#cccccc] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create or modify your account, request on-demand services,
              contact customer support, or otherwise communicate with us. This
              information may include: name, email, phone number, postal
              address, profile picture, payment method, items requested (for
              delivery services), delivery notes, and other information you
              choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. How We Use Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, such as to facilitate payments, send
              receipts, provide products and services you request (and send
              related information), develop new features, provide customer
              support to Users and Freelancers, develop safety features,
              authenticate users, and send product updates and administrative
              messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Cookies & Tracking
            </h2>
            <p>
              We use cookies and similar technologies to collect information
              about your use of our Services and your preferences. You can
              control cookies through your browser settings and other tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Data Sharing
            </h2>
            <p>
              We may share the information we collect about you as described in
              this Statement or as described at the time of collection or
              sharing, including as follows: with Freelancers to enable them to
              provide the Services you request; with third parties to provide
              you a service you requested through a partnership or promotional
              offering made by a third party or us; with the general public if
              you submit content in a public forum.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Data Security
            </h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. User Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              data. You may also object to the processing of your data or
              request data portability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at privacy@unifreelancer.com.
            </p>
          </section>
        </div>
      </div>
    </Layout>;
}
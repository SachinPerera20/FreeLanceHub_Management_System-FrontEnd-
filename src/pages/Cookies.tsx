import React from 'react';
import { Layout } from '../components/ui/Layout';
export function Cookies() {
  return <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#222222] pb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
          <p className="text-[#888888]">Last updated: October 2023</p>
        </div>

        <div className="space-y-8 text-[#cccccc] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files that are placed on your computer or
              mobile device by websites that you visit. They are widely used in
              order to make websites work, or work more efficiently, as well as
              to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Types of Cookies Used
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Necessary for the website to
                function properly.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors interact with the website.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Enable the website to
                provide enhanced functionality and personalization.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> Used to deliver
                advertisements more relevant to you and your interests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. How to Control Cookies
            </h2>
            <p>
              Most web browsers allow some control of most cookies through the
              browser settings. To find out more about cookies, including how to
              see what cookies have been set, visit www.aboutcookies.org or
              www.allaboutcookies.org.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Third-Party Services
            </h2>
            <p>
              We may use third-party services (such as analytics providers) that
              also set cookies on your device. We do not control these cookies
              and you should check the relevant third-party website for more
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Changes to Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time. We encourage
              you to periodically review this page for the latest information on
              our privacy practices.
            </p>
          </section>
        </div>
      </div>
    </Layout>;
}
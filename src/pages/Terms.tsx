import React from 'react';
import { Layout } from '../components/ui/Layout';
export function Terms() {
  return <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#222222] pb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-[#888888]">Last updated: October 2023</p>
        </div>

        <div className="space-y-8 text-[#cccccc] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using UniFreelancer, you accept and agree to be
              bound by the terms and provision of this agreement. In addition,
              when using this websites particular services, you shall be subject
              to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. User Accounts
            </h2>
            <p>
              To access certain features of the platform, you must register for
              an account. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Freelancer Responsibilities
            </h2>
            <p>
              Freelancers are responsible for performing services in a
              professional manner and delivering work that meets the
              specifications agreed upon with the Client. Freelancers must
              respect intellectual property rights and maintain confidentiality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Client Responsibilities
            </h2>
            <p>
              Clients agree to provide clear requirements, communicate
              effectively, and pay for services rendered in accordance with the
              agreed terms. Clients must not request work that violates academic
              integrity policies of their institution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Payments & Disputes
            </h2>
            <p>
              All payments are processed securely through the platform. In the
              event of a dispute, users agree to first attempt to resolve the
              issue directly. If resolution is not possible, UniFreelancer may
              intervene to mediate a fair outcome.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Reviews & Ratings
            </h2>
            <p>
              Users may leave reviews and ratings for each other. These must be
              honest, fair, and based on actual experience. We reserve the right
              to remove reviews that violate our content guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Prohibited Conduct
            </h2>
            <p>
              Users agree not to use the platform for any unlawful purpose, to
              harass others, or to violate academic integrity policies. We
              reserve the right to terminate accounts found in violation of
              these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              UniFreelancer shall not be liable for any indirect, incidental,
              special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </section>
        </div>
      </div>
    </Layout>;
}
export const metadata = {
  title: "Privacy Policy | GoalSense",
  description: "Learn how GoalSense collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-400 mb-8">
          Last updated: July 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>

            <p>
              GoalSense collects information you provide when creating an
              account, purchasing Premium, or contacting support. This may
              include your email address and payment-related information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your account.</li>
              <li>Provide Premium access.</li>
              <li>Process payments securely.</li>
              <li>Improve our services.</li>
              <li>Respond to support requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. Payments
            </h2>

            <p>
              Payments are processed securely through trusted third-party
              payment providers. GoalSense does not store your card or bank
              details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Cookies
            </h2>

            <p>
              We may use cookies or similar technologies to improve your
              experience and keep you signed in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. Data Security
            </h2>

            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              6. Third-Party Services
            </h2>

            <p>
              GoalSense uses trusted third-party services including Supabase,
              Paystack, and Vercel to operate the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Contact
            </h2>

            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us through our Contact page.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
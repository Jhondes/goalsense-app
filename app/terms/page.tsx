export const metadata = {
  title: "Terms & Conditions | GoalSense",
  description: "Terms and Conditions for using GoalSense.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 mb-8">
          Last updated: July 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing or using GoalSense, you agree to these Terms and
              Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. Service Description
            </h2>

            <p>
              GoalSense provides football match analysis, prediction tools,
              statistics, and Premium features for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. No Guaranteed Results
            </h2>

            <p>
              Football is unpredictable. While GoalSense uses statistical
              analysis and probability models, we do not guarantee the accuracy
              of predictions or any financial outcome.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Premium Subscription
            </h2>

            <p>
              Premium subscriptions provide access to additional features.
              Subscription benefits begin after successful payment verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. User Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate account information.</li>
              <li>Keep your login credentials secure.</li>
              <li>Use the platform responsibly.</li>
              <li>Comply with applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              6. Age Requirement
            </h2>

            <p>
              You must be at least 18 years old to use GoalSense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Limitation of Liability
            </h2>

            <p>
              GoalSense shall not be liable for losses arising from reliance on
              predictions, statistics, or analytical content provided on the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              8. Changes
            </h2>

            <p>
              We may update these Terms & Conditions at any time. Continued use
              of GoalSense indicates acceptance of any changes.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
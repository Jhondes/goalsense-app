export const metadata = {
  title: "Contact Us | GoalSense",
  description:
    "Need help with your GoalSense account or Premium subscription? Contact our support team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="mt-4 text-gray-400 leading-7">
          Need help with your Premium subscription, payment, or account?
          We're here to help.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Email Support</h2>

            <p className="mt-3 text-gray-400">
              For payment issues, account support, or general enquiries.
            </p>

            <a
              href="mailto:support@goalsense.live"
              className="mt-4 inline-block text-cyan-400 hover:underline"
            >
              support@goalsense.live
            </a>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Response Time</h2>

            <p className="mt-3 text-gray-400">
              We usually respond within 24 hours. Most questions are answered
              much sooner.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Premium Support</h2>

            <p className="mt-3 text-gray-400">
              If you've completed payment but Premium hasn't activated, please
              include:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-400">
              <li>Your account email</li>
              <li>Payment reference</li>
              <li>Date of payment</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Business Enquiries</h2>

            <p className="mt-3 text-gray-400">
              For partnerships, sponsorships, or advertising opportunities,
              contact us via email.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-6">
          <h2 className="text-xl font-semibold">
            Before contacting support
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-300">
            <li>Check that your payment was successful.</li>
            <li>Allow a few minutes for Premium activation.</li>
            <li>Log out and back into your account.</li>
            <li>If the issue continues, send us your payment reference.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
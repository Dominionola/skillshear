export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_90%,#fff_40%,#2563eb_100%)]"
      />
      {/* Your Content/Components */}
      <div className="pt-16 flex justify-center items-center min-h-screen relative z-10">
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">
              Check Your Email
            </h1>
            <p className="text-lg mb-4">
              We've sent you a confirmation link to your email address. Please check your inbox and click the link to activate your account.
            </p>
            <p className="text-sm text-gray-600">
              If you don't see the email, check your spam folder or try signing up again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

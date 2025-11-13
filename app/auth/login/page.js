import SigninPlaceholderForm from "./SigninPlaceholderForm";

export default function SignUpPage() {
  return (
    <div className="pt-16 flex justify-center items-center min-h-screen ">
      <div className="w-full px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Sign Up to Join a Community you Love
          </h1>
          <SigninPlaceholderForm />
        </div>
      </div>
    </div>
  );
}

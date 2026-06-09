import { AuthScreen } from "@/components/auth/auth-screen";

export default function SignUpScreen() {
  return (
    <AuthScreen
      mode="sign-up"
      title="Create your account"
      subtitle="Start your language journey today ✨"
      buttonLabel="Sign Up"
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerHref="/sign-in"
      showPassword
    />
  );
}

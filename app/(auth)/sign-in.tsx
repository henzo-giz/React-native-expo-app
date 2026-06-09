import { AuthScreen } from "@/components/auth/auth-screen";

export default function SignInScreen() {
  return (
    <AuthScreen
      mode="sign-in"
      title="Welcome back"
      subtitle="Continue your language journey today ✨"
      buttonLabel="Sign In"
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerHref="/sign-up"
    />
  );
}

import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Join Loop AI and start analyzing customer feedback."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Envelope, Lock, SignIn } from "phosphor-react";
import { login } from "@/lib/auth";
import InputAuth from "@/components/ui/InputAuth";
import ButtonAuth from "@/components/ui/ButtonAuth";
import FooterAuth from "@/components/ui/FooterAuth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useToast } from "@chakra-ui/react";

const LoginView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    setError(null);
    try {
      await login(email, password);
      setisLoading(false);
      router.push("/");
      toast({
        title: "Login Success",
        description: "You have successfully logged in",
        status: "success",
      });
    } catch (err) {
      setError("Invalid email or password");
      setisLoading(false);
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        status: "error",
      });
    }
  };

  return (
    <AuthLayout header="Welcome Back!">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputAuth
          icon={<Envelope />}
          name="email"
          label="Email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <InputAuth
          icon={<Lock />}
          name="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <ButtonAuth
          icon={<SignIn className="icon-auth" aria-hidden="true" />}
          label="Login"
          isLoading={isLoading}
        />
      </form>
      <FooterAuth
        text="Don't have an account? "
        href="/auth/register"
        direct="Sign Up"
      />
    </AuthLayout>
  );
};

export default LoginView;

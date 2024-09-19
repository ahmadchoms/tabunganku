import React, { useState } from "react";
import { useRouter } from "next/router";
import { Envelope, Lock, User, UserPlus } from "phosphor-react";
import { register } from "@/lib/auth";
import InputAuth from "@/components/ui/InputAuth";
import ButtonAuth from "@/components/ui/ButtonAuth";
import FooterAuth from "@/components/ui/FooterAuth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useToast } from "@chakra-ui/react";

const RegisterView = () => {
  const [username, setUsername] = useState("");
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
      await register(username, email, password);
      setisLoading(false);
      router.push("/");
      toast({
        title: "Registration Success",
        description: "You have successfully registered",
        status: "success",
      });
    } catch (err) {
      setError("Registration failed. Please try again.");
      setisLoading(false);
      toast({
        title: "Registration Failed",
        description: "Registration failed. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <AuthLayout header="Create an Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputAuth
          icon={<User />}
          name="user"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
        <InputAuth
          icon={<Envelope />}
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email address"
        />
        <InputAuth
          icon={<Lock />}
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <ButtonAuth
          icon={<UserPlus className="icon-auth" aria-hidden="true" />}
          label="Register"
          isLoading={isLoading}
        />
      </form>
      <FooterAuth
        text="Already have an account? "
        href="/auth/login"
        direct="Sign In"
      />
    </AuthLayout>
  );
};

export default RegisterView;

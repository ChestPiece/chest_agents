"use client";

import { useLogin } from "@/context/login-context";
import { LoginModal } from "@/components/ui/login-modal";

export default function ModalContainer() {
  const { isLoginOpen, closeLogin } = useLogin();

  return <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />;
}

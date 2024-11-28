"use client";
import { sendAuthCode } from "@/app/api/calendarService/sendAuthCode";
import UserCookie from "@/interfaces/userCookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function CalendarLogin() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function fetchUser(): Promise<UserCookie | undefined> {
    try {
      const response = await axios.get("/api/getUser");
      return response.data as UserCookie;
    } catch (error) {
      console.error("Failed to fetch token", error);
      return undefined;
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const userId = (await fetchUser())?.id;
      if (userId) {
        const accessToken = await sendAuthCode({
          code: codeResponse.code,
          id: userId,
        });
        console.log(accessToken);
        setAccessToken(accessToken);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    redirect_uri: "http://localhost:3000/auth/calendar",
  });

  return accessToken ? (
    <div>Logado</div>
  ) : (
    <button onClick={() => login()} className="btn btn-info btn-ghost">
      <span>Entrar com Google</span>
      <FaGoogle />
    </button>
  );
}

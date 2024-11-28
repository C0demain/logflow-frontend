"use client";
import { sendAuthCode } from "@/app/api/calendarService/sendAuthCode";
import UserCookie from "@/interfaces/userCookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function CalendarLogin() {
  const [isLogged, setIsLogged] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function fetchUserCookie(): Promise<UserCookie | undefined> {
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
      const userId = (await fetchUserCookie())?.id;
      if (userId) {
        await sendAuthCode({
          code: codeResponse.code,
          id: userId,
        });
        setIsLogged(true);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    redirect_uri: "http://localhost:3000/auth/calendar",
  });

  return isLogged ? (
    <></>
  ) : (
    <button onClick={() => login()} className="btn btn-info btn-ghost">
      <span>Entrar com Google</span>
      <FaGoogle />
    </button>
  );
}

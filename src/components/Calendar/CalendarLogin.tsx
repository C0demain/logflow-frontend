"use client";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

function App() {
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>Usuário logado</h3>
          <p>Nome: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={logOut} className="btn btn-error">Sair</button>
        </div>
      ) : (
        <button onClick={() => login()} className="btn btn-info btn-ghost">
          <span>Entrar com Google</span>
          <FaGoogle/>
        </button>
      )}
    </div>
  );
}
export default App;

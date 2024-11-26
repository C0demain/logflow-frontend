"use client";
import CalendarBox from "@/components/Calendar/CalendarBox";
import CalendarLogin from "@/components/Calendar/CalendarLogin";
import CreateButton from "@/components/Shared/createButton";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import React from "react";

export default function CalendarPage() {
  return (
    <>
      <CalendarLogin />
      <CalendarBox />
      <CreateButton>
        <div>
          <h1 className="text-2xl text-center">Adicionar novo evento</h1>
          <form className="modal-middle space-y-3 flex flex-col items-center">
            <div className="w-full max-w-md">
              <label htmlFor="title" className="block mb-2">
                Titulo
              </label>
              <input
                type="text"
                id="title"
                className="input input-bordered rounded-md w-full"
              />
            </div>{" "}
            <div className="w-full max-w-md">
              <label className="block mb-2" htmlFor="description">
                Descrição
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[100px] max-h-[170px]"
                placeholder="Descrição"
              ></textarea>
            </div>
            <div>
              <input type="date" className="input" />
              <input type="time" className="input" />
            </div>
            <div className="w-full max-w-md flex justify-center ">
              <button type="submit" className="btn btn-info mt-4">
                Registrar evento
              </button>
            </div>
          </form>
        </div>
      </CreateButton>
    </>
  );
}

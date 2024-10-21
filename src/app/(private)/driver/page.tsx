"use client"
import React from "react";
import { useState } from "react";

export default function DriverPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <p>tela do motorista</p>
  )
}

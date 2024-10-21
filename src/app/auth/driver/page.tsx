"use client"
import { useState } from "react";

export default function UserPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
  <p>tela do motorista</p>
  )
}

"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import FadeInImage from "@/components/FadeInImage";
import FormDate from "./FormDate";
import React, { useEffect, useState } from "react";

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export default function ModalDate({ tipo, setSelectedId }: { tipo: number | null,setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openTriggered, setOpenTriggered] = useState(false);


  useEffect(() => {
   
      console.log("open")

      onOpen();
      setOpenTriggered(true);

  }, []);

  

  useEffect(() => {
    if (openTriggered && !isOpen) {
      setSelectedId(null);

      setOpenTriggered(false); // Resetear flag si es necesario
    }
  }, [isOpen, openTriggered]);

  return (
    <>
      
      <Modal
        backdrop="transparent"
        className=" h-[500px]   bg-neutral-900	"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="border border-gray-500		">
          {(onClose ) => (
            <>
              <ModalBody>
                <div className="pointer-events-none absolute inset-0 top-[-25%] z-10 ">
                  <FadeInImage
                    fill
                    priority
                    alt="Gradient background"
                    src="/bg-gradient.png"
                  />
                </div>

                <FormDate onClose={onClose} tipo={tipo} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

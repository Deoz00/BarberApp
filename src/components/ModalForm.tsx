"use client"
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,

} from "@nextui-org/react";
import FadeInImage from "@/components/FadeInImage";

import FormLogin from "./FormLogin/FormLogin";





export default function ModalForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>

    
      <Button
        className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
        radius="full"
        onPress={onOpen}
      >
        Iniciar sesión
      </Button>
      <Modal  backdrop="transparent" className=" h-[500px] bg-opacity-900  bg-neutral-900	"  isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="border border-gray-500		"  >
          {(onClose) => (
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

                
                <FormLogin />

              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
  );
}

import FormDate from "@/components/dateForm/FormDate";
import Image from "next/image";
import Select2 from "../../components/select2";
import BarberCard from "@/components/barberos/BarberCard";

export default function barberos() {
  return (
    <>
      <section className="bg-black bg-opacity-60">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
           
            <p className="sm:text-xl ">
            Un equipo de barberos expertos listos para brindarte el mejor corte y estilo.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 lg:gap-16 justify-center">

           <BarberCard/>




          </div>
        </div>
      </section>
    </>
  );
}

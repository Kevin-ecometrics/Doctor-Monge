import { useState } from "react";
import "./FIcha.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import toast, { Toaster } from "react-hot-toast";

const pdfWorker = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Viewer = ({ title, pdf }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const shareUrl = window.location.href;

  const onDocLoad = ({ numPages }) => setTotalPages(numPages);

  const changePage = (direction) => {
    setPageNumber((prev) =>
      direction === "prev"
        ? Math.max(prev - 1, 1)
        : Math.min(prev + 1, totalPages)
    );
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "Recomendaciones_para_una_columna_sana.pdf";
    link.click();
  };

  const copyLink = () => {
    toast.success("Enlace copiado al portapapeles");
  };

  const printPDF = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Ocultar el iframe
    iframe.src = pdf; // Ruta del archivo PDF
    iframe.onload = () => {
      iframe.contentWindow.print(); // Imprimir el contenido del iframe
    };
    document.body.appendChild(iframe); // Agregar el iframe al DOM
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <main className="md:h-screen flex overflow-hidden text-black">
        {/* Sidebar */}
        <div className="border-r-2 border-gray-400 px-3 w-80 p-2 h-full md:block hidden">
          <div className="px-2 py-3 border-b-2 text-center font-semibold text-lg text-white mb-4">
            Paginas
          </div>
          <div className="h-full w-auto overflow-auto flex flex-col items-center text-black">
            <Document file={pdf} onLoadSuccess={onDocLoad}>
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  onClick={() => setPageNumber(index + 1)}
                  className={`border-[4px] cursor-pointer relative rounded my-2 ${
                    pageNumber === index + 1 ? "border-green-700" : ""
                  }`}
                >
                  <Page height={180} pageNumber={index + 1} />
                </div>
              ))}
            </Document>
          </div>
        </div>

        {/* Main Viewer */}
        <div className="h-full w-full flex flex-col bg-slate-100">
          {/* Header */}
          <div className="bg-white py-2 px-4 flex flex-col items-center">
            <div className="font-semibold text-lg text-[#005692]">{title}</div>
            <div className="flex items-center gap-2">
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => changePage("prev")}
              />
              <span>
                {pageNumber} of {totalPages}
              </span>
              <IoIosArrowForward
                className="cursor-pointer"
                onClick={() => changePage("next")}
              />
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-grow p-4 overflow-auto md:flex justify-center items-start hidden ">
            <Document file={pdf}>
              <Page pageNumber={pageNumber} scale={1.0} />
            </Document>
          </div>
          <div className="flex-grow md:p-4 overflow-auto md:hidden flex justify-center items-start">
            <Document file={pdf}>
              <Page pageNumber={pageNumber} scale={0.7} />
            </Document>
          </div>
        </div>
        <div className="md:flex hidden justify-center items-center md:px-16 flex-col gap-8">
          <div className="border border-white h-full"></div>
          <img
            src="/menu1.svg"
            className="cursor-pointer"
            alt="Descargar"
            onClick={downloadPDF}
            onMouseOver={(e) => (e.currentTarget.src = "/menu1-1.svg")}
            onMouseOut={(e) => (e.currentTarget.src = "/menu1.svg")}
          />
          <img
            src="/menu2.svg"
            className="cursor-pointer"
            alt="Copiar vínculo"
            onClick={copyLink}
            onMouseOver={(e) => (e.currentTarget.src = "/menu2-1.svg")}
            onMouseOut={(e) => (e.currentTarget.src = "/menu2.svg")}
          />
          <img
            src="/menu3.svg"
            className="cursor-pointer"
            alt="Imprimir"
            onClick={printPDF}
            onMouseOver={(e) => (e.currentTarget.src = "/menu3-1.svg")}
            onMouseOut={(e) => (e.currentTarget.src = "/menu3.svg")}
          />
          <div className="flex flex-col gap-8">
            <FacebookShareButton url={shareUrl} quote="¡Mira este documento!">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <FacebookMessengerShareButton
              url={shareUrl}
              appId="123456789"
              title="¡Mira este documento!"
            >
              <FacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>
            <WhatsappShareButton url={shareUrl} title="¡Mira este documento!">
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
          <div className="border border-white h-full"></div>
        </div>
      </main>
      <section className="flex md:hidden justify-center items-center gap-8 py-8">
        <img
          src="/menu1.svg"
          className="cursor-pointer"
          alt="Descargar"
          onClick={downloadPDF}
          onMouseOver={(e) => (e.currentTarget.src = "/menu1-1.svg")}
          onMouseOut={(e) => (e.currentTarget.src = "/menu1.svg")}
        />
        <img
          src="/menu2.svg"
          className="cursor-pointer"
          alt="Copiar vínculo"
          onClick={copyLink}
          onMouseOver={(e) => (e.currentTarget.src = "/menu2-1.svg")}
          onMouseOut={(e) => (e.currentTarget.src = "/menu2.svg")}
        />
        <img
          src="/menu3.svg"
          className="cursor-pointer"
          alt="Imprimir"
          onClick={printPDF}
          onMouseOver={(e) => (e.currentTarget.src = "/menu3-1.svg")}
          onMouseOut={(e) => (e.currentTarget.src = "/menu3.svg")}
        />
        <FacebookShareButton url={shareUrl} quote="¡Mira este documento!">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={shareUrl}
          title="¡Mira este documento!"
        >
          <FacebookMessengerIcon size={32} round={true} />
        </FacebookMessengerShareButton>
        <WhatsappShareButton url={shareUrl} title="¡Mira este documento!">
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </section>
    </div>
  );
};

export default Viewer;

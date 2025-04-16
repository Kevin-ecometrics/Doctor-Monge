import { useState } from "react";
import "./FIcha.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import toast, { Toaster } from "react-hot-toast";

const pdfWorker = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Viewer = ({ title, pdf }) => {
  const URL = window.location.href;
  const isEnglish = URL.includes("/en/");
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
    link.download = `${title}`;
    link.click();
  };

  const copyLink = () => {
    const link = document.createElement("input");
    link.value = shareUrl;
    document.body.appendChild(link);
    link.select();
    document.execCommand("copy");
    document.body.removeChild(link);
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
        <div className="border-r-2 border-gray-300 bg-gray-100 px-4 w-80 p-4 h-full md:block hidden">
          {/* Título del sidebar */}
          <div className="px-2 py-4 border-b-2 text-center font-semibold text-lg text-[#005692] mb-4">
            {isEnglish ? "Pages of the Document" : "Páginas del Documento"}
          </div>

          {/* Lista de miniaturas de páginas */}
          <div className="h-full w-auto overflow-y-auto  flex flex-col items-center gap-4">
            <Document file={pdf} onLoadSuccess={onDocLoad}>
              {Array.from({ length: totalPages }, (_, index) => (
                <div
                  key={index}
                  onClick={() => setPageNumber(index + 1)}
                  className={`cursor-pointer relative rounded-lg mt-4 mb-4 overflow-hidden shadow-md transition transform hover:scale-105 ${
                    pageNumber === index + 1
                      ? "border-4 border-[#005692]"
                      : "border border-gray-300"
                  }`}
                >
                  <Page height={150} pageNumber={index + 1} />
                  {/* Indicador de página */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 text-center py-1 text-sm font-semibold ${
                      pageNumber === index + 1
                        ? "bg-[#005692] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isEnglish ? "Page" : "Página"} {index + 1}
                  </div>
                </div>
              ))}
            </Document>
          </div>
        </div>

        {/* Main Viewer */}
        <div className="h-full w-full flex flex-col bg-slate-100">
          {/* Header */}
          <div className="bg-white py-4 px-6 flex flex-col md:flex-row justify-between items-start gap-4 md:items-center shadow-md">
            {/* Título del PDF */}
            <div className="flex flex-col items-start">
              <div className="font-bold text-xl text-[#005692]">{title}</div>
              <div className="text-sm text-gray-500">
                {isEnglish ? "Page" : "Página"} {pageNumber}{" "}
                {isEnglish ? "of" : "de"} {totalPages}
              </div>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => changePage("prev")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-[#005692] hover:text-white transition"
              >
                <IoIosArrowBack className="text-2xl" />
              </button>
              <span className="text-gray-600 font-medium">
                {pageNumber} / {totalPages}
              </span>
              <button
                onClick={() => changePage("next")}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-[#005692] hover:text-white transition"
              >
                <IoIosArrowForward className="text-2xl" />
              </button>
            </div>

            {/* Botón de descarga */}
            <div>
              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                {isEnglish ? "Download" : "Descargar"}
              </button>
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
        <WhatsappShareButton url={shareUrl} title="¡Mira este documento!">
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </section>
    </div>
  );
};

export default Viewer;

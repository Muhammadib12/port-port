import React from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react"; // استخدام أيقونات Lucide
import RecomandationPDF from "../assets/pdfs/Recomandation.pdf";

function Recomanded() {
  return (
    <div className="border-b border-neutral-900 pb-10 lg:mb-35 flex flex-col  gap-20 ">
      <h1 className="text-center text-3xl font-semibold">Recomndation</h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto  bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl p-6 text-center"
      >
        <FileText size={48} className="text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white">
          Recommendation To Frontend postion
        </h3>
        <p className="text-neutral-400 text-sm my-2">
          Click below to view or download the document.
        </p>

        <div className="flex justify-center space-x-4 mt-4">
          {/* زر فتح الملف في صفحة جديدة */}
          <a
            href={RecomandationPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            <ExternalLink size={16} className="mr-2" />
            Open
          </a>

          {/* زر تحميل الملف */}
          <a
            href={RecomandationPDF}
            download="Recomandation.pdf"
            className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            <FileText size={16} className="mr-2" />
            Download
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Recomanded;

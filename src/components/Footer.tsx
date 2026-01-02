import Link from "next/link";
import { FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white py-3 text-[13px] shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-5 whitespace-nowrap flex-wrap md:flex-nowrap text-gray-600">

          <span>Follow us</span>

          <Link
            href="https://www.instagram.com/eircoreconstruction?igsh=czlta2s3cXFvODVs&utm_source=qr"
            target="_blank"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaInstagram className="text-emerald-600" />
          </Link>

          <Link
            href="mailto:eircoreconstruction@gmail.com"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaEnvelope className="text-emerald-600" />
            eircoreconstruction@gmail.com
          </Link>

          <Link
            href="tel:+353874637389"
            className="flex items-center gap-1 hover:text-emerald-600"
          >
            <FaPhoneAlt className="text-emerald-600" />
            +353 87 463 7389
          </Link>

          <span className="text-gray-400">
            © {new Date().getFullYear()} EirCore
          </span>

        </div>
      </div>
    </footer>
  );
}

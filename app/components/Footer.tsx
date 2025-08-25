import { Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footerpage() {
  return (
    <footer className="bg-indigo-900 text-white py-12 rounded-t-lg shadow-inner">
      <div className="container mx-auto px-4 text-center py-2">
        <p className="text-xl font-semibold mb-6">
          Politrack Africa: Where Numbers Meet Narrative.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-yellow-400 transition"
          >
            <Twitter size={28} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-yellow-400 transition"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:text-yellow-400 transition"
          >
            <Youtube size={28} />
          </a>
        </div>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} Politrack Africa. All rights reserved.
        </p>
      </div>
      </footer>
  );
}

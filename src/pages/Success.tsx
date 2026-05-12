import { Leaf } from "lucide-react";
import logo from "@/assets/phresh-logo.jpg";

const Success = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ background: "#2d5a27" }}
  >
    <img src={logo} alt="Phresh logo" className="w-16 h-16 rounded-full object-cover mb-6" />
    <div className="flex items-center gap-2 mb-4" style={{ color: "#97ad5b" }}>
      <Leaf className="w-5 h-5" />
      <span className="text-sm font-medium tracking-widest uppercase">Order Confirmed</span>
    </div>
    <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
      Thank you! 🎉
    </h1>
    <p className="text-white/70 text-lg max-w-sm mb-10">
      Your order is confirmed. You'll receive an email shortly with your details.
    </p>
    <a
      href="/"
      className="px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
      style={{ background: "#97ad5b" }}
    >
      Back to Phresh
    </a>
  </div>
);

export default Success;

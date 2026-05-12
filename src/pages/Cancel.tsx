import logo from "@/assets/phresh-logo.jpg";

const Cancel = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ background: "#f5f0e8" }}
  >
    <img src={logo} alt="Phresh logo" className="w-16 h-16 rounded-full object-cover mb-6" />
    <h1 className="font-display text-5xl md:text-6xl font-bold mb-4" style={{ color: "#2d5a27" }}>
      Order Cancelled
    </h1>
    <p className="text-gray-500 text-lg max-w-sm mb-10">
      No worries — your items are still saved in your cart whenever you're ready.
    </p>
    <a
      href="/"
      className="px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
      style={{ background: "#2d5a27" }}
    >
      Back to Shop
    </a>
  </div>
);

export default Cancel;

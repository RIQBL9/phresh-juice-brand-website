import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Leaf, ArrowLeft, Check } from "lucide-react";
import logo from "@/assets/phresh-logo.jpg";
import { useCart } from "@/context/CartContext";

const DG = "#2d5a27";
const MG = "#97ad5b";
const CREAM = "#f5f0e8";
const LG = "#e8f2d4";

const fmt = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

const bundles = [
  {
    id: 101,
    count: 5,
    price: 2500,
    original: 3000,
    label: "Starter",
    perJuice: 500,
    popular: false,
    perks: ["Mix any 5 flavours", "Free chilled delivery bag", "Perfect for a week"],
  },
  {
    id: 102,
    count: 10,
    price: 5000,
    original: 6000,
    label: "Most Popular",
    perJuice: 500,
    popular: true,
    perks: ["Mix any 10 flavours", "Free chilled delivery bag", "Great for a cleanse"],
  },
  {
    id: 103,
    count: 15,
    price: 7000,
    original: 9000,
    label: "Family",
    perJuice: Math.round(7000 / 15),
    popular: false,
    perks: ["Mix any 15 flavours", "Free chilled delivery bag", "Save £20 vs individual"],
  },
  {
    id: 104,
    count: 20,
    price: 9000,
    original: 12000,
    label: "Bulk",
    perJuice: 450,
    popular: false,
    perks: ["Mix any 20 flavours", "Free chilled delivery bag", "Best value — save £30"],
  },
];

const Bundles = () => {
  const { totalItems, openCart, addItem } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [added, setAdded] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAdd = (bundle: typeof bundles[0]) => {
    addItem({ id: bundle.id, name: `Bundle — ${bundle.count} Juices`, price: bundle.price }, 1);
    setAdded(bundle.id);
    setTimeout(() => setAdded(null), 1800);
    openCart();
  };

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>

      {/* ── Navbar ── */}
      <header style={{ background: DG }} className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <a href="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Phresh logo" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-display text-xl font-bold text-white leading-none flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" style={{ color: MG }} />
                Phresh
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: MG }}>MCR</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <a href="/" className="hover:opacity-70 transition-opacity">Home</a>
            <a href="/#juices" className="hover:opacity-70 transition-opacity">Shop</a>
            <a href="/#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="/#community" className="hover:opacity-70 transition-opacity">Community</a>
            <a href="/bundles" className="transition-opacity font-bold" style={{ color: MG }}>Bundles</a>
            <button
              onClick={openCart}
              aria-label={`Cart (${totalItems} items)`}
              className="relative hover:opacity-70 transition-opacity text-white"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: MG }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-4 pb-4" style={{ background: DG }}>
            <nav className="flex flex-col gap-3 pt-3 text-sm font-medium text-white">
              <a href="/" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Home</a>
              <a href="/#juices" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Shop</a>
              <a href="/#about" onClick={() => setMobileOpen(false)} className="hover:opacity-70">About</a>
              <a href="/#community" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Community</a>
              <a href="/bundles" onClick={() => setMobileOpen(false)} style={{ color: MG }} className="font-bold">Bundles</a>
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero banner ── */}
      <section style={{ background: DG }} className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-opacity hover:opacity-70"
            style={{ color: MG }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to shop
          </button>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Juice Bundles
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: MG }}>
            Stock up and save. Mix any flavours you like — we'll pack them fresh for you.
          </p>
        </div>
        {/* Torn edge */}
        <div style={{ background: DG, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path d="M0,30 C80,10 160,50 240,28 C320,8 400,46 480,24 C560,6 640,44 720,26 C800,10 880,48 960,26 C1040,8 1120,44 1200,28 C1280,12 1360,48 1440,28 L1440,60 L0,60 Z" fill={CREAM} />
          </svg>
        </div>
      </section>

      {/* ── Bundle cards ── */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundles.map((bundle) => {
            const saving = bundle.original - bundle.price;
            const isAdded = added === bundle.id;
            return (
              <div
                key={bundle.id}
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "white",
                  boxShadow: bundle.popular
                    ? `0 0 0 3px ${MG}, 0 8px 32px rgba(45,90,39,0.15)`
                    : "0 4px 20px rgba(45,90,39,0.08)",
                }}
              >
                {bundle.popular && (
                  <div
                    className="text-center text-xs font-bold tracking-widest uppercase py-2 text-white"
                    style={{ background: MG }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1 gap-4">
                  {/* Count */}
                  <div className="text-center">
                    <div className="font-display text-6xl font-bold leading-none" style={{ color: DG }}>
                      {bundle.count}
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-widest mt-1" style={{ color: MG }}>
                      Juices
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-center">
                    <div className="font-display text-3xl font-bold" style={{ color: DG }}>
                      {fmt(bundle.price)}
                    </div>
                    <div className="text-sm text-gray-400 line-through mt-0.5">
                      {fmt(bundle.original)}
                    </div>
                    <div
                      className="inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: LG, color: DG }}
                    >
                      Save {fmt(saving)}
                    </div>
                  </div>

                  {/* Per juice */}
                  <div className="text-center text-xs text-gray-400">
                    {fmt(bundle.perJuice)} per juice
                  </div>

                  {/* Perks */}
                  <ul className="space-y-2 flex-1">
                    {bundle.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MG }} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleAdd(bundle)}
                    className="w-full py-3.5 rounded-lg font-semibold text-white transition-all"
                    style={{
                      background: isAdded ? MG : DG,
                      opacity: 1,
                    }}
                  >
                    {isAdded ? "Added to cart ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-sm mt-10" style={{ color: DG }}>
          After checkout, we'll be in touch to confirm your flavour choices via WhatsApp or email.
        </p>
      </section>

    </div>
  );
};

export default Bundles;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Leaf, ArrowLeft, Check, Minus, Plus } from "lucide-react";
import logo from "@/assets/phresh-logo.jpg";
import { useCart } from "@/context/CartContext";

const DG = "#2d5a27";
const MG = "#97ad5b";
const CREAM = "#f5f0e8";
const LG = "#e8f2d4";

const fmt = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

const JUICES = [
  { id: 1, name: "Revitalise", ingredients: "Apple · Beetroot · Carrot · Lemon · Cucumber" },
  { id: 2, name: "Revive Green", ingredients: "Apple · Celery · Lemon · Cucumber · Lime" },
  { id: 3, name: "Resist Grape", ingredients: "Seeded Grape" },
  { id: 4, name: "Immunity", ingredients: "Ginger · Lime · Lemon" },
  { id: 5, name: "Rehydrate", ingredients: "Watermelon · Lemon · Lime" },
];

const bundles = [
  { id: 101, count: 5,  price: 2500, original: 3000, popular: false,
    perks: ["Mix any 5 flavours", "Free chilled delivery bag", "Perfect for a week"] },
  { id: 102, count: 10, price: 5000, original: 6000, popular: true,
    perks: ["Mix any 10 flavours", "Free chilled delivery bag", "Great for a cleanse"] },
  { id: 103, count: 15, price: 7000, original: 9000, popular: false,
    perks: ["Mix any 15 flavours", "Free chilled delivery bag", "Save £20 vs individual"] },
  { id: 104, count: 20, price: 9000, original: 12000, popular: false,
    perks: ["Mix any 20 flavours", "Free chilled delivery bag", "Best value — save £30"] },
];

type Bundle = typeof bundles[0];

const Bundles = () => {
  const { totalItems, openCart, addItem } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBundle, setActiveBundle] = useState<Bundle | null>(null);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  const totalSelected = Object.values(counts).reduce((s, n) => s + n, 0);
  const isFull = activeBundle ? totalSelected >= activeBundle.count : false;
  const remaining = activeBundle ? activeBundle.count - totalSelected : 0;

  const openSelector = (bundle: Bundle) => {
    setActiveBundle(bundle);
    setCounts({});
  };

  const closeSelector = () => {
    setActiveBundle(null);
    setCounts({});
  };

  const adjust = (juiceId: number, delta: number) => {
    setCounts((prev) => {
      const current = prev[juiceId] ?? 0;
      const next = current + delta;
      if (next < 0) return prev;
      if (delta > 0 && isFull) return prev;
      return { ...prev, [juiceId]: next };
    });
  };

  const confirmBundle = () => {
    if (!activeBundle || remaining !== 0) return;
    const juicesStr = JUICES
      .filter((j) => (counts[j.id] ?? 0) > 0)
      .map((j) => `${j.name} x${counts[j.id]}`)
      .join(", ");
    addItem(
      { id: activeBundle.id, name: `${activeBundle.count} Juice Bundle`, price: activeBundle.price, juices: juicesStr },
      1
    );
    closeSelector();
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
            <a href="/bundles" className="font-bold transition-opacity" style={{ color: MG }}>Bundles</a>
            <button
              onClick={openCart}
              aria-label={`Cart (${totalItems} items)`}
              className="relative hover:opacity-70 transition-opacity text-white"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: MG }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
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
            Stock up and save. Choose your flavours — we'll pack them fresh for you.
          </p>
        </div>
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
                  <div className="text-center text-xs font-bold tracking-widest uppercase py-2 text-white" style={{ background: MG }}>
                    Most Popular
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="text-center">
                    <div className="font-display text-6xl font-bold leading-none" style={{ color: DG }}>{bundle.count}</div>
                    <div className="text-sm font-semibold uppercase tracking-widest mt-1" style={{ color: MG }}>Juices</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-3xl font-bold" style={{ color: DG }}>{fmt(bundle.price)}</div>
                    <div className="text-sm text-gray-400 line-through mt-0.5">{fmt(bundle.original)}</div>
                    <div className="inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: LG, color: DG }}>
                      Save {fmt(saving)}
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-400">
                    {fmt(Math.round(bundle.price / bundle.count))} per juice
                  </div>
                  <ul className="space-y-2 flex-1">
                    {bundle.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MG }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openSelector(bundle)}
                    className="w-full py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ background: DG }}
                  >
                    Choose Flavours
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Juice selector modal ── */}
      {activeBundle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={closeSelector} />

          <div
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl flex flex-col"
            style={{ background: "white" }}
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b" style={{ background: "white", borderColor: "#e5e7eb" }}>
              <div>
                <h2 className="font-display text-2xl font-bold" style={{ color: DG }}>
                  Choose your {activeBundle.count} juices
                </h2>
                <p className="text-sm mt-0.5" style={{ color: totalSelected === activeBundle.count ? MG : "#6b7280" }}>
                  {totalSelected === activeBundle.count
                    ? "✓ Bundle complete — confirm below"
                    : `${totalSelected}/${activeBundle.count} juices selected`}
                </p>
              </div>
              <button onClick={closeSelector} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Over-limit warning */}
            {isFull && totalSelected > 0 && (
              <div className="mx-6 mt-4 px-4 py-3 rounded-lg text-sm font-medium" style={{ background: LG, color: DG }}>
                Bundle full! Decrease a juice to swap flavours.
              </div>
            )}

            {/* Juice cards */}
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              {JUICES.map((juice) => {
                const count = counts[juice.id] ?? 0;
                const disabled = isFull && count === 0;
                return (
                  <div
                    key={juice.id}
                    className="rounded-xl border p-4 flex flex-col gap-3 transition-opacity"
                    style={{
                      borderColor: count > 0 ? MG : "#e5e7eb",
                      background: count > 0 ? "rgba(151,173,91,0.06)" : disabled ? "#f9fafb" : "white",
                      opacity: disabled ? 0.45 : 1,
                    }}
                  >
                    <div>
                      <p className="font-semibold text-sm" style={{ color: DG }}>{juice.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{juice.ingredients}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => adjust(juice.id, -1)}
                        disabled={count === 0}
                        aria-label="Decrease"
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
                        style={{ borderColor: count > 0 ? MG : "#d1d5db", color: DG }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm" style={{ color: DG }}>{count}</span>
                      <button
                        onClick={() => adjust(juice.id, 1)}
                        disabled={disabled || isFull}
                        aria-label="Increase"
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
                        style={{ borderColor: (!disabled && !isFull) ? MG : "#d1d5db", color: DG }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      {count > 0 && (
                        <span className="text-xs font-medium ml-auto" style={{ color: MG }}>
                          {count} added
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 px-6 py-4 border-t" style={{ background: "white", borderColor: "#e5e7eb" }}>
              {/* Summary */}
              {totalSelected > 0 && (
                <p className="text-xs text-gray-500 mb-3">
                  {JUICES.filter((j) => (counts[j.id] ?? 0) > 0)
                    .map((j) => `${j.name} ×${counts[j.id]}`)
                    .join("  ·  ")}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={closeSelector}
                  className="flex-1 py-3 rounded-lg font-semibold border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#d1d5db", color: "#555" }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBundle}
                  disabled={remaining !== 0}
                  className="flex-1 py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: DG }}
                >
                  {remaining > 0
                    ? `Add ${remaining} more`
                    : "Confirm Bundle →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bundles;

import { useState } from "react";
import {
  Instagram, MapPin, ShoppingCart, ChevronDown,
  Truck, Droplets, Sparkles, Menu, X, Mail, Leaf,
} from "lucide-react";
import logo from "@/assets/phresh-logo.jpg";
import juice1 from "@/assets/juice-1.jpeg";
import juice2 from "@/assets/juice-2.jpeg";
import juice3 from "@/assets/juice-3.jpeg";
import juice4 from "@/assets/juice-4.jpeg";
import juice5 from "@/assets/juice-5.jpeg";
import aboutImg from "@/assets/IMG_7724.jpeg";

const DG = "#2d5a27";
const CREAM = "#f5f0e8";
const LG = "#e8f2d4";
const MG = "#97ad5b";

const juices = [
  { id: 1, img: juice1, name: "Juice 1", ingredients: ["Apple", "Beetroot", "Carrot", "Lemon", "Cucumber"] },
  { id: 2, img: juice2, name: "Juice 2", ingredients: ["Apple", "Celery", "Lemon", "Cucumber", "Lime"] },
  { id: 3, img: juice3, name: "Juice 3", ingredients: ["Seeded Grape"] },
  { id: 4, img: juice4, name: "Juice 4", ingredients: ["Ginger", "Lime", "Lemon"] },
  { id: 5, img: juice5, name: "Juice 5", ingredients: ["Watermelon", "Lemon", "Lime"] },
];

const stripeLinks: Record<number, string> = {
  1: import.meta.env.VITE_STRIPE_JUICE_1_LINK ?? "#",
  2: import.meta.env.VITE_STRIPE_JUICE_2_LINK ?? "#",
  3: import.meta.env.VITE_STRIPE_JUICE_3_LINK ?? "#",
  4: import.meta.env.VITE_STRIPE_JUICE_4_LINK ?? "#",
  5: import.meta.env.VITE_STRIPE_JUICE_5_LINK ?? "#",
};

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const TornEdge = ({ fill }: { fill: string }) => (
  <div style={{ lineHeight: 0 }}>
    <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "56px" }}>
      <path
        d="M0,32 C80,12 160,50 240,28 C320,8 400,46 480,24 C560,6 640,44 720,26 C800,10 880,48 960,26 C1040,8 1120,44 1200,28 C1280,12 1360,48 1440,28 L1440,56 L0,56 Z"
        fill={fill}
      />
    </svg>
  </div>
);

const Placeholder = ({ label, className = "" }: { label: string; className?: string }) => (
  <div
    className={`flex items-center justify-center border-2 border-dashed rounded-xl text-sm font-medium ${className}`}
    style={{ borderColor: MG, color: DG, background: "rgba(151,173,91,0.1)" }}
  >
    <span className="px-4 text-center">[UPLOAD: {label}]</span>
  </div>
);

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlStatus("loading");
    try {
      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setNlStatus("success");
        setEmail("");
      } else {
        setNlStatus("error");
      }
    } catch {
      setNlStatus("error");
    }
  };

  return (
    <div className="min-h-screen">

      {/* ── Navbar ── */}
      <header style={{ background: DG }} className="fixed top-0 inset-x-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">

          <a href="#top" className="flex items-center gap-2.5">
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
            <a href="#top" className="hover:opacity-70 transition-opacity">Home</a>
            <div className="relative">
              <button
                className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                onClick={() => setShopOpen(!shopOpen)}
                onBlur={() => setTimeout(() => setShopOpen(false), 150)}
              >
                Shop <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {shopOpen && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg shadow-xl py-2 min-w-[140px] border border-white/10"
                  style={{ background: DG }}
                >
                  <a href="#juices" className="block px-4 py-2 text-white hover:opacity-70 transition-opacity">Our Juices</a>
                  <a href="#juices" className="block px-4 py-2 text-white hover:opacity-70 transition-opacity">Wellness Shots</a>
                </div>
              )}
            </div>
            <a href="#juices" className="hover:opacity-70 transition-opacity">Cleanses</a>
            <a href="#community" className="hover:opacity-70 transition-opacity">Community</a>
            <a href="#juices" aria-label="Cart" className="hover:opacity-70 transition-opacity">
              <ShoppingCart className="w-5 h-5" />
            </a>
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
              <a href="#top" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Home</a>
              <a href="#juices" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Shop</a>
              <a href="#juices" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Cleanses</a>
              <a href="#community" onClick={() => setMobileOpen(false)} className="hover:opacity-70">Community</a>
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="top" style={{ background: DG }} className="pt-20">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Fuel Your Day the Phresh Way
              </h1>
              <p className="text-lg" style={{ color: MG }}>
                Cold-pressed juices · Wellness boosters,<br />
                Cleanses & community vibes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/447305171143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: "#1a3d15" }}
                >
                  ORDER NOW
                </a>
                <a
                  href="#juices"
                  className="px-8 py-3.5 rounded-lg font-semibold text-white transition-colors border-2"
                  style={{ borderColor: "#1a3d15" }}
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseOut={e => (e.currentTarget.style.background = "transparent")}
                >
                  EXPLORE THE RANGE
                </a>
              </div>
            </div>
            <Placeholder label="Hero Juice Bottles Image" className="aspect-[4/5] w-full" />
          </div>
        </div>
        <TornEdge fill={CREAM} />
      </section>

      {/* ── About ── */}
      <section id="about" style={{ background: CREAM }}>
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: DG }}>
                About Phresh
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Phresh MCR is all about clean living and nutrient-packed juices, served with that Manchester energy. From stress busting blends to detox cleanses and wellness shots, we make feeling good look fresh.
              </p>
            </div>
            <img
              src={aboutImg}
              alt="PHRESH brand lifestyle"
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: "4/5" }}
            />
          </div>
        </div>
        <TornEdge fill={LG} />
      </section>

      {/* ── Best Sellers ── */}
      <section id="juices" style={{ background: LG }}>
        <div className="container mx-auto px-4 py-20 md:py-28">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-14" style={{ color: DG }}>
            Our Best Sellers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {juices.map((j) => (
              <article
                key={j.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={j.img}
                    alt={`${j.name} — ${j.ingredients.join(", ")}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-2xl font-bold" style={{ color: DG }}>{j.name}</h3>
                  <p className="text-sm text-gray-500">{j.ingredients.join(" · ")}</p>
                  <a
                    href={stripeLinks[j.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ background: DG }}
                  >
                    ORDER NOW
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <TornEdge fill="white" />
      </section>

      {/* ── Why Phresh Works ── */}
      <section style={{ background: "white" }} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: DG }}>
            Why Phresh Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Droplets className="w-9 h-9" />, label: "Cold-Pressed Goodness" },
              { icon: <MapPin className="w-9 h-9" />, label: "Made in Manchester" },
              { icon: <Truck className="w-9 h-9" />, label: "Delivered Fresh" },
              { icon: <Sparkles className="w-9 h-9" />, label: "Cleanses & Boosts" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <div className="p-5 rounded-full" style={{ background: LG, color: DG }}>
                  {icon}
                </div>
                <span className="font-semibold text-sm leading-snug" style={{ color: DG }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <TornEdge fill={MG} />
      </section>

      {/* ── Community ── */}
      <section id="community" style={{ background: MG }} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Community in Action
            </h2>
            <p className="text-white/80 italic text-lg mt-2">Manchester Strong, Manchester Fresh</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <Placeholder key={n} label={`Community Photo ${n}`} className="aspect-[3/4] w-full" />
            ))}
          </div>
          <p className="text-center text-white font-medium mt-8 text-sm tracking-wide">
            Tag us @phreshmcr to be featured!
          </p>
        </div>
        <TornEdge fill={DG} />
      </section>

      {/* ── Newsletter ── */}
      <section style={{ background: DG }} className="py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Join the Phresh Family
          </h2>
          <p className="mb-8" style={{ color: MG }}>Get exclusive offers & wellness tips!</p>

          {nlStatus === "success" ? (
            <p className="text-white text-lg font-medium rounded-xl py-4 px-6 bg-white/10">
              You're in! Welcome to the Phresh family.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-lg text-sm text-white outline-none placeholder-white/50"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
              <button
                type="submit"
                disabled={nlStatus === "loading"}
                className="px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: MG }}
              >
                {nlStatus === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          )}

          {nlStatus === "error" && (
            <p className="text-red-300 text-sm mt-3">Something went wrong. Please try again.</p>
          )}
        </div>
      </section>

      {/* ── Social & Contact ── */}
      <section style={{ background: "#1a3d15" }} className="py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-5 flex-wrap">
          <a
            href="https://www.instagram.com/phreshmcr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-75 border border-white/20"
            style={{ background: DG }}
          >
            <Instagram className="w-5 h-5" /> Instagram
          </a>
          <a
            href="https://wa.me/447305171143"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-75 border border-white/20"
            style={{ background: DG }}
          >
            <WhatsAppIcon className="w-5 h-5" /> WhatsApp
          </a>
          <a
            href="mailto:phreshmcr@outlook.com"
            className="inline-flex items-center gap-2 font-medium text-white transition-opacity hover:opacity-70"
          >
            <Mail className="w-5 h-5" /> phreshmcr@outlook.com
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: DG }} className="border-t border-white/10 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Phresh logo" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-display text-xl font-bold text-white flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" style={{ color: MG }} /> Phresh
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: MG }}>MCR</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <a href="#top" className="hover:text-white transition-colors">Home</a>
            <a href="#juices" className="hover:text-white transition-colors">Shop</a>
            <a href="#juices" className="hover:text-white transition-colors">Cleanses</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/phreshmcr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/447305171143"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-white/40 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" /> Manchester, UK · © {new Date().getFullYear()} Phresh
        </p>
      </footer>

    </div>
  );
};

export default Index;

import { Instagram, MapPin } from "lucide-react";

const juices = [
  { n: "Juice 1", ingredients: ["Apple", "Beetroot", "Carrot", "Lemon", "Cucumber"] },
  { n: "Juice 2", ingredients: ["Apple", "Celery", "Lemon", "Cucumber", "Lime"] },
  { n: "Juice 3", ingredients: ["Seeded Grape"] },
  { n: "Juice 4", ingredients: ["Ginger", "Lime", "Lemon"] },
  { n: "Juice 5", ingredients: ["Watermelon", "Lemon", "Lime"] },
];

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const UploadBox = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`upload-placeholder ${className}`}>
    <span className="px-4 text-center">[UPLOAD: {label}]</span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#top" className="font-display text-2xl font-semibold text-primary">Phresh</a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#juices" className="hover:text-primary transition-colors">Juices</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#connect" className="hover:text-primary transition-colors">Connect</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="pt-28 md:pt-32 pb-20 md:pb-28">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-medium">
                <MapPin className="w-4 h-4" /> Manchester, UK
              </div>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-foreground">
                Phresh
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
                [Add your tagline here — a short, memorable line about your juice.]
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#juices" className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-dark transition-colors shadow-[var(--shadow-soft)]">
                  Explore Juices
                </a>
                <a href="#connect" className="px-7 py-3.5 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary-soft transition-colors">
                  Get in Touch
                </a>
              </div>
            </div>
            <UploadBox label="Hero Image" className="aspect-[4/5] w-full" />
          </div>
        </div>
      </section>

      {/* Juices */}
      <section id="juices" className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">The Range</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-4">Our Juices</h2>
            <p className="text-muted-foreground">Five cold-pressed blends, made fresh in Manchester.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {juices.map((j) => (
              <article key={j.n} className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:-translate-y-1 transition-transform duration-300">
                <UploadBox label={`${j.n} Photo`} className="aspect-square w-full rounded-none border-x-0 border-t-0" />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">{j.n}</h3>
                  <ul className="space-y-1.5">
                    {j.ingredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <UploadBox label="Brand / Lifestyle Image" className="aspect-[4/5] w-full" />
            <div className="space-y-6">
              <span className="text-sm font-medium tracking-widest uppercase text-primary">About</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                Cold-pressed in Manchester.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                [Add a short paragraph about Phresh here — your story, your approach, what makes your juice different. Edit this text to suit your brand voice.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="py-20 md:py-28 bg-primary-soft/50">
        <div className="container mx-auto text-center max-w-2xl">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">Connect</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-4">Say hello.</h2>
          <p className="text-muted-foreground mb-10">Order, ask a question, or follow along.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/phreshmcr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-dark transition-colors shadow-[var(--shadow-soft)]"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
            <a
              href="https://wa.me/447305171143"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-dark transition-colors shadow-[var(--shadow-soft)]"
            >
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-display text-2xl font-semibold text-primary">Phresh</div>
            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5 justify-center md:justify-start">
              <MapPin className="w-3.5 h-3.5" /> Manchester, UK
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/phreshmcr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/447305171143"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Phresh</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

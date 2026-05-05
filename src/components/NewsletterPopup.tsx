import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "phresh_popup_seen";
const DG = "#2d5a27";
const MG = "#97ad5b";

const NewsletterPopup = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.setItem(STORAGE_KEY, "true");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-heading"
        className="fixed z-50 inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-md rounded-2xl shadow-2xl p-8"
        style={{ background: DG }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <p className="text-white text-lg font-semibold leading-snug">
              You're in! Check your email for your 10% off code 🎉
            </p>
          </div>
        ) : (
          <>
            <h2
              id="popup-heading"
              className="font-display text-3xl font-bold text-white mb-2"
            >
              Stay Phresh 🌿
            </h2>
            <p className="text-sm mb-6" style={{ color: MG }}>
              Sign up and get 10% off your first order
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-lg text-sm text-white outline-none placeholder-white/40"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: MG }}
              >
                {status === "loading" ? "..." : "Claim My 10% Off"}
              </button>
            </form>

            {status === "error" && (
              <p className="text-red-300 text-xs mt-3 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NewsletterPopup;

import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

const DG = "#2d5a27";
const MG = "#97ad5b";

const fmt = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

const isManchesterPostcode = (postcode: string) => {
  const cleaned = postcode.trim().toUpperCase();
  return cleaned.startsWith("M") && !cleaned.startsWith("MK");
};

const DELIVERY_CHARGE = 1099;

type Step = "cart" | "delivery";

const CartSidebar = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ id: string; promotionCodeId: string | null; percent_off: number | null; amount_off: number | null } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep("cart");
        setError(false);
        setCouponInput("");
        setAppliedCoupon(null);
        setCouponError(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const isManchester = postcode.trim().length >= 2 ? isManchesterPostcode(postcode) : null;
  const deliveryCost: number | null =
    isManchester === null ? null : isManchester ? 0 : DELIVERY_CHARGE;

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponError(false);
    setAppliedCoupon(null);
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ id: code, promotionCodeId: data.promotionCodeId, percent_off: data.discount.percent_off, amount_off: data.discount.amount_off });
      } else {
        setCouponError(true);
      }
    } catch {
      setCouponError(true);
    } finally {
      setCouponLoading(false);
    }
  };

  const discountLabel = appliedCoupon
    ? appliedCoupon.percent_off !== null
      ? `${appliedCoupon.percent_off}% off`
      : `${fmt(appliedCoupon.amount_off!)} off`
    : null;

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const shipping = isManchesterPostcode(postcode) ? 0 : DELIVERY_CHARGE;
    setLoading(true);
    setError(false);
    try {
      const bundleSelections = items
        .filter((i) => i.juices)
        .map((i) => `${i.name}: ${i.juices}`)
        .join(" | ");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity, juices: i.juices })),
          shipping,
          couponCode: appliedCoupon?.id ?? null,
          promotionCodeId: appliedCoupon?.promotionCodeId ?? null,
          metadata: {
            customer_name: name,
            customer_phone: phone,
            delivery_postcode: postcode,
            delivery_notes: notes,
            bundle_selections: bundleSelections,
          },
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm border outline-none transition-colors focus:border-[#2d5a27]";
  const inputStyle = { borderColor: "#d1d5db", color: "#111" };
  const labelClass = "block text-xs font-semibold mb-1.5 uppercase tracking-wide";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "white" }}
      >
        {step === "cart" && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#e5e7eb" }}>
              <h2 className="font-display text-2xl font-bold" style={{ color: DG }}>Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
              {items.length === 0 ? (
                <p className="text-gray-400 text-sm text-center mt-16">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: DG }}>{item.name}</p>
                      {item.juices ? (
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: MG }}>{item.juices}</p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-0.5">{fmt(item.price)} each</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors hover:border-[#97ad5b] disabled:opacity-30"
                        style={{ borderColor: "#d1d5db" }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors hover:border-[#97ad5b]"
                        style={{ borderColor: "#d1d5db" }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold w-14 text-right" style={{ color: DG }}>
                      {fmt(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t" style={{ borderColor: "#e5e7eb" }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-600 text-sm">Subtotal</span>
                  <span className="font-bold text-xl" style={{ color: DG }}>{fmt(subtotal)}</span>
                </div>
                <button
                  onClick={() => setStep("delivery")}
                  className="w-full py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
                  style={{ background: DG }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {step === "delivery" && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#e5e7eb" }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setStep("cart"); setError(false); }}
                  aria-label="Back to cart"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="font-display text-2xl font-bold" style={{ color: DG }}>Delivery</h2>
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-sm text-gray-500 mb-6">
                Enter your details below. We'll calculate your delivery cost based on your postcode.
              </p>

              <form id="delivery-form" onSubmit={handleDeliverySubmit} className="space-y-4">
                <div>
                  <label className={labelClass} style={{ color: DG }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ color: DG }}>Postcode</label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="M1 1AE"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                  {deliveryCost !== null && (
                    <div
                      className="mt-2 px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
                      style={{
                        background: deliveryCost === 0 ? "rgba(151,173,91,0.12)" : "rgba(45,90,39,0.06)",
                        color: deliveryCost === 0 ? DG : "#555",
                        border: `1px solid ${deliveryCost === 0 ? MG : "#e5e7eb"}`,
                      }}
                    >
                      {deliveryCost === 0 ? (
                        <>&#x2705; Free local Manchester delivery</>
                      ) : (
                        <>&#x1F69A; UK Next Day Delivery — £10.99</>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass} style={{ color: DG }}>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07700 900000"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ color: DG }}>
                    Delivery Notes{" "}
                    <span className="normal-case font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Leave at door, ring bell, safe place..."
                    rows={3}
                    className={inputClass}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                <div>
                  <label className={labelClass} style={{ color: DG }}>
                    Discount Code{" "}
                    <span className="normal-case font-normal text-gray-400">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponError(false); setAppliedCoupon(null); }}
                      placeholder="Enter code"
                      disabled={!!appliedCoupon}
                      className={inputClass}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !!appliedCoupon || !couponInput.trim()}
                      className="px-4 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40 shrink-0"
                      style={{ background: DG, color: "white" }}
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="mt-2 text-sm font-medium" style={{ color: DG }}>
                      ✅ Discount applied!
                    </p>
                  )}
                  {couponError && (
                    <p className="mt-2 text-sm text-red-500">❌ Invalid code, please try again.</p>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-5 border-t" style={{ borderColor: "#e5e7eb" }}>
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span style={{ color: deliveryCost === 0 ? MG : undefined }}>
                    {deliveryCost === null ? "—" : deliveryCost === 0 ? "Free" : fmt(deliveryCost)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1.5 border-t" style={{ borderColor: "#f3f4f6", color: DG }}>
                  <span>Total</span>
                  <span>{deliveryCost !== null ? fmt(subtotal + deliveryCost) : "—"}</span>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs mb-3 text-center">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                form="delivery-form"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: DG }}
              >
                {loading ? "Redirecting to checkout..." : "Proceed to Payment"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

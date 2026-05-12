import { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const DG = "#2d5a27";
const MG = "#97ad5b";

const fmt = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);

const CartSidebar = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
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

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "white" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#e5e7eb" }}
        >
          <h2 className="font-display text-2xl font-bold" style={{ color: DG }}>
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {items.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-16">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-4 border-b"
                style={{ borderColor: "#f3f4f6" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: DG }}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmt(item.price)} each</p>
                </div>

                {/* Quantity controls */}
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

                {/* Line total */}
                <p className="text-sm font-semibold w-14 text-right" style={{ color: DG }}>
                  {fmt(item.price * item.quantity)}
                </p>

                {/* Remove */}
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: "#e5e7eb" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600 text-sm">Subtotal</span>
              <span className="font-bold text-xl" style={{ color: DG }}>
                {fmt(subtotal)}
              </span>
            </div>
            {error && (
              <p className="text-red-500 text-xs mb-3 text-center">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: DG }}
            >
              {loading ? "Redirecting to checkout..." : "Checkout"}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Prices shown are placeholders — confirm at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

import { useMemo, useState } from "react";
import itemsAll from "./data/menu.js";
import Checkout from "./components/Checkout.jsx";

/** ====== UI ย่อยแบบ inline ====== */
function Header() {
  return (
    <div style={{ background: "#dc2626", color: "#fff", padding: "14px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <strong style={{ fontSize: 18 }}>🍣 SushiGo! – สั่งออนไลน์</strong>
        <span style={{ opacity: 0.9 }}>เปิด 10:00–21:00 • โทร 02-123-4567</span>
      </div>
    </div>
  );
}

function CategoryFilter({ selected, onChange, categories }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid",
            borderColor: c === selected ? "#dc2626" : "#d6d3d1",
            background: c === selected ? "#dc2626" : "#fff",
            color: c === selected ? "#fff" : "#1f2937",
            fontSize: 14,
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function FoodCard({ item, onAdd }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100%", height: 170, objectFit: "cover" }}
        onError={(e) => { e.currentTarget.src = "/menu/placeholder.png"; }}
      />
      <div style={{ padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <strong>{item.name}</strong>
          <span style={{ color: "#dc2626", fontWeight: 700 }}>฿{item.price}</span>
        </div>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "6px 0 10px" }}>{item.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#9ca3af", fontSize: 12 }}>{item.category}</span>
          <button onClick={onAdd} style={{ background: "#dc2626", color: "#fff", padding: "8px 12px", borderRadius: 10 }}>
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onRemove, onClear, total, onCheckout }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} />
      <div style={{
        position: "absolute", right: 0, top: 0, height: "100%", width: "100%", maxWidth: 420,
        background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 24px rgba(0,0,0,.15)"
      }}>
        <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
          <strong>ตะกร้าของฉัน</strong>
          <button onClick={onClose}>ปิด</button>
        </div>

        <div style={{ padding: 16, flex: 1, overflow: "auto", display: "grid", gap: 10 }}>
          {items.length === 0 && <span style={{ color: "#6b7280" }}>ยังไม่มีรายการสินค้า</span>}
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", gap: 10, border: "1px solid #e5e7eb", borderRadius: 12, padding: 10 }}>
              <img src={i.image} alt={i.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{i.name} x{i.qty}</span>
                  <strong>฿{i.price * i.qty}</strong>
                </div>
                <small style={{ color: "#9ca3af" }}>{i.category}</small>
              </div>
              <button onClick={() => onRemove(i.id)} style={{ color: "#dc2626" }}>ลบ</button>
            </div>
          ))}
        </div>

        {/* รวม + ปุ่มล้างตะกร้า + ปุ่มชำระเงิน */}
        <div style={{ padding: 16, borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>รวม</span>
            <span style={{ fontWeight: 700 }}>฿{total}</span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClear}
              disabled={items.length === 0}
              style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: "1px solid #d1d5db", background: "#fff" }}
            >
              ล้างตะกร้า
            </button>

            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              style={{ flex: 2, padding: "10px 0", borderRadius: 12, background: "#dc2626", color: "#fff", fontWeight: 700, opacity: items.length === 0 ? .5 : 1 }}
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ====== แอปหลัก ====== */
export default function App() {
  const [category, setCategory] = useState("ทั้งหมด");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]); // {id, name, price, image, category, qty}

  // หมวดหมู่อัตโนมัติจากข้อมูล
  const categories = useMemo(() => {
    const set = new Set(itemsAll.map(i => i.category));
    return ["ทั้งหมด", ...Array.from(set)];
  }, []);

  // ฟิลเตอร์เมนูตามหมวด
  const items = useMemo(() => (
    category === "ทั้งหมด" ? itemsAll : itemsAll.filter(m => m.category === category)
  ), [category]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const ex = prev.find((x) => x.id === item.id);
      if (ex) return prev.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setCart([]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: 20, flex: 1 }}>
        <CategoryFilter selected={category} onChange={setCategory} categories={categories} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
          {items.map((it) => (
            <FoodCard key={it.id} item={it} onAdd={() => addToCart(it)} />
          ))}
        </div>
      </main>
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: 16, textAlign: "center", color: "#6b7280" }}>
        © {new Date().getFullYear()} SushiGo! ทุกสิทธิ์
      </footer>

      {/* ปุ่มลอยเปิดตะกร้า */}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed", right: 20, bottom: 20, zIndex: 40,
          background: "#dc2626", color: "#fff", borderRadius: 9999, padding: "12px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,.15)", fontWeight: 700
        }}
      >
        ตะกร้า ({count}) • ฿{total}
      </button>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onClear={clearCart}
        total={total}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {/* โมดัลชำระเงิน */}
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={total}
        onPaid={() => { clearCart(); }}
      />
    </div>
  );
}

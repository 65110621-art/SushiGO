import { useCart } from "./CartContext.jsx";
import { useState } from "react";


export default function Cart() {
  const { items, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {/* ปุ่มลอยเปิดตะกร้า */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full shadow-lg bg-red-600 text-white px-5 py-3"
      >
        ตะกร้า ({items.reduce((s, i) => s + i.qty, 0)}) • ฿{total}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[26rem] bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">ตะกร้าของฉัน</h2>
              <button onClick={() => setOpen(false)} className="text-stone-600">ปิด</button>
            </div>

            <div className="p-4 flex-1 overflow-auto space-y-3">
              {items.length === 0 && (
                <p className="text-stone-500">ยังไม่มีรายการสินค้า</p>
              )}
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3 border rounded-xl p-3">
                  <img src={i.image} alt={i.name} className="h-14 w-14 rounded object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{i.name} x{i.qty}</p>
                      <p className="font-semibold">฿{i.price * i.qty}</p>
                    </div>
                    <p className="text-xs text-stone-500">{i.category}</p>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t space-y-3">
              <div className="flex items-center justify-between font-semibold">
                <span>รวม</span> <span>฿{total}</span>
              </div>
              <button
                onClick={() => {
                  alert("ขอบคุณที่สั่งซื้อ! (เดโม)");
                  clear();
                  setOpen(false);
                }}
                disabled={items.length === 0}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold disabled:opacity-50"
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
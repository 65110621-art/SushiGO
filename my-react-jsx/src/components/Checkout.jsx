// src/components/Checkout.jsx
import { useEffect, useMemo, useState } from "react";
import { buildPromptPayPayload } from "../utils/promptpay";
import QRCode from "qrcode";

export default function Checkout({ open, onClose, cart, total, onPaid }) {
  const [method, setMethod] = useState("promptpay"); // promptpay | transfer | cod
  const [buyer, setBuyer] = useState({ name: "", phone: "", address: "" });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [slip, setSlip] = useState(null);

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  // >>> ตั้ง PromptPay ID ของร้านที่นี่ <<<
  const PROMPTPAY_ID = "0929821533"; // เปลี่ยนเป็นเบอร์/พร้อมเพย์ของคุณ

  // สร้าง QR เมื่อเปิดโมดัล/เปลี่ยนยอด/วิธีจ่าย
  useEffect(() => {
    if (!open) return;
    if (method !== "promptpay") return setQrDataUrl("");

    const payload = buildPromptPayPayload({
      id: PROMPTPAY_ID,
      idType: "mobile", // "mobile" | "idcard" | "ewallet"
      amount: total || 0,
    });

    QRCode.toDataURL(payload, { width: 280, margin: 2 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [open, method, total]);

  const handleConfirm = () => {
    if (method === "promptpay") {
      alert("รับชำระพร้อมเพย์แล้ว ขอบคุณครับ!");
    } else if (method === "transfer") {
      if (!slip) return alert("กรุณาแนบสลิปก่อนยืนยัน");
      alert("รับสลิปโอนเงินแล้ว ขอบคุณครับ!");
    } else {
      alert("เลือกเก็บเงินปลายทางเรียบร้อย");
    }
    onPaid?.(); // ให้ App เคลียร์ตะกร้า
    onClose?.();
  };

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} />
      <div style={{
        position: "absolute", right: 0, top: 0, height: "100%", width: "100%", maxWidth: 520,
        background: "#fff", boxShadow: "-10px 0 24px rgba(0,0,0,.2)", display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: 16, borderBottom: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between" }}>
          <strong>เช็คเอาต์ • {count} รายการ</strong>
          <button onClick={onClose}>ปิด</button>
        </div>

        <div style={{ padding: 16, overflow: "auto", flex: 1, display: "grid", gap: 16 }}>
          {/* ข้อมูลผู้รับ */}
          <section>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>ข้อมูลผู้รับ</div>
            <div style={{ display: "grid", gap: 8 }}>
              <input placeholder="ชื่อ-สกุล" value={buyer.name}
                     onChange={e=>setBuyer({...buyer, name:e.target.value})}
                     style={inputStyle}/>
              <input placeholder="เบอร์โทร" value={buyer.phone}
                     onChange={e=>setBuyer({...buyer, phone:e.target.value})}
                     style={inputStyle}/>
              <textarea placeholder="ที่อยู่จัดส่ง" value={buyer.address}
                        onChange={e=>setBuyer({...buyer, address:e.target.value})}
                        rows={3} style={{...inputStyle, resize:"vertical"}}/>
            </div>
          </section>

          {/* วิธีชำระเงิน */}
          <section>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>วิธีชำระเงิน</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["promptpay","transfer","cod"].map(m=>(
                <button key={m} onClick={()=>setMethod(m)}
                        style={{
                          padding:"8px 12px", borderRadius:999, border:"1px solid",
                          borderColor: m===method ? "#dc2626" : "#d1d5db",
                          background: m===method ? "#dc2626" : "#fff",
                          color: m===method ? "#fff" : "#374151"
                        }}>
                  {m==="promptpay" && "พร้อมเพย์ (QR)"}
                  {m==="transfer" && "โอน/แนบสลิป"}
                  {m==="cod" && "เก็บเงินปลายทาง"}
                </button>
              ))}
            </div>
          </section>

          {method === "promptpay" && (
            <section>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>สแกนจ่ายพร้อมเพย์</div>
              {qrDataUrl
                ? <img src={qrDataUrl} alt="PromptPay QR" style={{ width: 280, height: 280 }} />
                : <div style={{ color:"#6b7280" }}>กำลังสร้าง QR...</div>}
              <div style={{ marginTop:8, color:"#374151" }}>
                ยอดชำระ <b>฿{total.toFixed(2)}</b> | เบอร์พร้อมเพย์: <b>{PROMPTPAY_ID}</b>
              </div>
            </section>
          )}

          {method === "transfer" && (
            <section>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>อัปโหลดสลิป</div>
              <input type="file" accept="image/*,.pdf" onChange={(e)=>setSlip(e.target.files?.[0]||null)} />
              {slip && <div style={{ marginTop:8, fontSize:12, color:"#6b7280" }}>ไฟล์: {slip.name}</div>}
              <div style={{ marginTop:8, color:"#374151" }}>
                โอนเข้าเลขบัญชี <b>xxx-x-x1234-x</b> ธนาคาร ABC (สาขา DEF)
              </div>
            </section>
          )}
        </div>

        <div style={{ padding: 16, borderTop:"1px solid #e5e5e5", display:"grid", gap:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700 }}>
            <span>ยอดรวม</span><span>฿{total.toFixed(2)}</span>
          </div>
          <button onClick={handleConfirm}
                  style={{ padding:"12px 0", borderRadius:12, background:"#dc2626", color:"#fff", fontWeight:700 }}>
            ยืนยันการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 10,
  border: "1px solid #d1d5db", outline: "none"
};

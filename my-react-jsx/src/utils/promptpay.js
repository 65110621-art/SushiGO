// src/utils/promptpay.js
// สร้าง PromptPay EMVCo payload + CRC16-CCITT
function crc16ccitt(input) {
  let crc = 0xFFFF;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function tlv(id, value) {
  const len = value.length.toString().padStart(2, "0");
  return id + len + value;
}

// แปลงเบอร์ 08xxxxxxxx → 0066xxxxxxxx (ตัด 0 หน้าออก)
function normalizeMobile(thMobile) {
  let t = thMobile.replace(/\D/g, "");
  if (t.startsWith("0")) t = "66" + t.slice(1);
  if (t.startsWith("66") === false) t = "66" + t; // กันกรณีผู้ใช้ใส่ 8/9 หลุดมา
  return t;
}

// idType: "mobile"|"idcard"|"ewallet"
export function buildPromptPayPayload({ id, idType = "mobile", amount }) {
  let merchantInfo = "00" + "14" + "A000000677010111"; // AID
  if (idType === "mobile") {
    const acc = normalizeMobile(id);
    merchantInfo += tlv("01", acc);
  } else if (idType === "idcard") {
    merchantInfo += tlv("02", id.replace(/\D/g, ""));
  } else if (idType === "ewallet") {
    merchantInfo += tlv("03", id);
  }

  const payload =
    tlv("00", "01") +             // Payload Format Indicator
    tlv("01", "12") +             // Point of Initiation Method (12 = dynamic)
    tlv("29", merchantInfo) +     // Merchant Account Information (PromptPay)
    tlv("53", "764") +            // Transaction Currency (764 = THB)
    tlv("54", Number(amount).toFixed(2)) + // Amount
    tlv("58", "TH") +             // Country Code
    tlv("59", "SushiGo") +        // Merchant Name (ปรับได้)
    tlv("60", "Bangkok") +        // City (ปรับได้)
    "6304";                       // CRC placeholder

  const crc = crc16ccitt(payload);
  return payload + crc;
}

// src/data/menu.js

const itemsAll = [
  // ---------------- ซูชิ ----------------
  {
    id: "ss1",
    name: "ซูชิแซลมอน",
    price: 35,
    category: "ซูชิ",
    desc: "ข้าวปั้นหน้าแซลมอนสด ชิ้นโตมันกำลังดี",
    image: "/menu/sushi-salmon.png",
  },
  {
    id: "ss2",
    name: "ซูชิหน้าไข่ปลาแซลมอน",
    price: 20,
    category: "ซูชิ",
    desc: "ไข่ปลาแซลมอนเด้ง ๆ เต็มคำ",
    image: "/menu/sushi-salmon-roe.png",
  },
  {
    id: "ss3",
    name: "ซูชิหน้ากุ้ง",
    price: 35,
    category: "ซูชิ",
    desc: "กุ้งเนื้อหวาน วางเต็มคำ",
    image: "/menu/sushi-shrimp.png",
  },
  {
    id: "ss4",
    name: "ซูชิปลาฮามาจิหมักงา",
    price: 40,
    category: "ซูชิ",
    desc: "ปลาฮามาจิหมักซอสงาหอม ๆ",
    image: "/menu/sushi-hamachi-sesame.png",
  },
  {
    id: "ss5",
    name: "ซูชิเอ็นกาวะย่าง",
    price: 45,
    category: "ซูชิ",
    desc: "เอ็นกาวะย่างไฟ หอมมันนุ่มละลาย",
    image: "/menu/sushi-engawa.png",
  },
  {
    id: "ss6",
    name: "ซูชิแซลมอนย่าง",
    price: 40,
    category: "ซูชิ",
    desc: "แซลมอนย่างซอสหอม ๆ มันกำลังดี",
    image: "/menu/sushi-salmon-grill.png",
  },
  {
    id: "ss7",
    name: "ซูชิทูน่า",
    price: 30,
    category: "ซูชิ",
    desc: "เนื้อทูน่าสด ชิ้นหนากำลังดี",
    image: "/menu/sushi-tuna.png",
  },

  // ---------------- ราเมง / เส้น ----------------
  {
    id: "rm1",
    name: "ราเมงไก่ซอสโชยุ",
    price: 89,
    category: "ราเมง",
    desc: "ราเมงซุปไก่โชยุ หอมกลมกล่อม",
    image: "/menu/ramen-chicken-shoyu.png",
  },
  {
    id: "rm2",
    name: "อุดงเทมปุระ",
    price: 95,
    category: "ราเมง",
    desc: "อุดงเส้นหนึบ เสิร์ฟพร้อมเทมปุระกรอบ",
    image: "/menu/udon-tempura.png",
  },
  {
    id: "rm3",
    name: "ราเมงเกี๊ยวกุ้งมิโซะ",
    price: 99,
    category: "ราเมง",
    desc: "ราเมงซุปมิโซะ ใส่เกี๊ยวกุ้งเด้ง ๆ",
    image: "/menu/ramen-shrimp-gyoza-miso.png",
  },

  // ---------------- ของทานเล่น ----------------
  {
    id: "sn1",
    name: "ไก่คาราอาเกะ",
    price: 69,
    category: "ของทานเล่น",
    desc: "ไก่ทอดคาราอาเกะกรอบนอกนุ่มใน",
    image: "/menu/snack-karaage.png",
  },
  {
    id: "sn2",
    name: "เฟรนฟราย",
    price: 49,
    category: "ของทานเล่น",
    desc: "มันฝรั่งทอดกรอบ เสิร์ฟพร้อมซอส",
    image: "/menu/snack-fries.png",
  },
  {
    id: "sn3",
    name: "หมึกอาราอาเกะ",
    price: 79,
    category: "ของทานเล่น",
    desc: "หมึกชิ้นพอดีคำ ชุบแป้งทอดกรอบ",
    image: "/menu/snack-squid-karaage.png",
  },
  {
    id: "sn4",
    name: "เทมปุระ",
    price: 75,
    category: "ของทานเล่น",
    desc: "ผักและกุ้งเทมปุระทอดกรอบ",
    image: "/menu/snack-tempura.png",
  },

  // ---------------- เครื่องดื่ม ----------------
  {
    id: "dr1",
    name: "ลาเต้ร้อน",
    price: 55,
    category: "เครื่องดื่ม",
    desc: "ลาเต้ร้อนนมหอมมัน",
    image: "/menu/drink-latte-hot.png",
  },
  {
    id: "dr2",
    name: "ลาเต้เย็น",
    price: 65,
    category: "เครื่องดื่ม",
    desc: "ลาเต้เย็นหวานน้อย หอมกาแฟ",
    image: "/menu/drink-latte-ice.png",
  },
];

export default itemsAll;

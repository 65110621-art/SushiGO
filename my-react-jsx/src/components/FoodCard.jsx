import { useCart } from "./CartContext.jsx";  // << เปลี่ยน path

export default function FoodCard({ item }) {
  const { add } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-800">{item.name}</h3>
          <span className="font-bold text-red-600">฿{item.price}</span>
        </div>
        <p className="text-sm text-stone-600 mt-1 line-clamp-2">{item.desc}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xs text-stone-500">{item.category}</span>
          <button
            onClick={() => add(item)}
            className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}
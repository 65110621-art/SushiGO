import FoodCard from "./FoodCard.jsx";

export default function MenuGrid({ items }) {
  if (items.length === 0) {
    return <p className="text-stone-500">ไม่พบเมนูที่เลือก</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
}
export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((c) => {
        const active = c === selected;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={
              "px-4 py-2 rounded-full text-sm border transition " +
              (active
                ? "bg-red-600 border-red-600 text-white"
                : "bg-white border-stone-300 text-stone-700 hover:border-stone-500")
            }
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
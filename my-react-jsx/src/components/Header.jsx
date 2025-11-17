export default function Header() {
  return (
    <header className="bg-red-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">🍣 SushiGo! – สั่งออนไลน์</h1>
        <div className="hidden sm:flex items-center gap-4 text-sm">
          <span className="opacity-90">เวลาเปิด: 10:00–21:00</span>
          <span className="opacity-90">โทร 02-123-4567</span>
        </div>
      </div>
    </header>
  );
}
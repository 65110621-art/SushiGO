export default function Footer() {
  return (
    <footer className="mt-8 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-stone-500 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
        <p>© {new Date().getFullYear()} SushiGo! ทุกสิทธิ์</p>
        <p>ส่งฟรีในห้าง • จ่ายปลายทาง/โอน</p>
      </div>
    </footer>
  );
}
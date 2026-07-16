export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span>© 2025 NT Digital Group · NEQ: 2281300162</span>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-gray-400 transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-gray-400 transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
        </div>
        <span>ntwebux.com</span>
      </div>
    </footer>
  );
}

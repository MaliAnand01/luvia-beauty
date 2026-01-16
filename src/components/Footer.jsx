export default function Footer() {
  return (
    <footer className="bg-luxury-black text-cream py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif tracking-widest text-gold">LUVIA</h2>
          <p className="text-xs leading-relaxed opacity-60">
            Crafting timeless beauty rituals through sustainable, high-performance skincare.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 font-bold">Shop</h4>
          <ul className="text-xs space-y-3 opacity-60">
            <li>Cleansers</li>
            <li>Serums</li>
            <li>Moisturizers</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 font-bold">Company</h4>
          <ul className="text-xs space-y-3 opacity-60">
            <li>Our Story</li>
            <li>Ethics</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-6 font-bold">Newsletter</h4>
          <div className="flex border-b border-cream/30 pb-2">
            <input type="text" placeholder="Your email" className="bg-transparent outline-none text-xs w-full" />
            <button className="text-[10px] uppercase">Join</button>
          </div>
        </div>
      </div>
      <div className="text-center text-[10px] opacity-30 mt-16 tracking-widest uppercase">
        © 2026 Luvia Beauty. All Rights Reserved.
      </div>
    </footer>
  );
}
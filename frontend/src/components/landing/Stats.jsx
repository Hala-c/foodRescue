export default function Stats() {
  const stats = [
    { target: 1200, label: 'restaurants onboard' },
    { target: 480, label: 'charities connected' },
    { target: 52000, label: 'meals saved this month' },
    { target: 98, label: '% food utilised' },
  ];

  return (
    /* Changed grid-cols-4 to grid-cols-2 md:grid-cols-4 for mobile wrapping */
    <section id="stats-section" className="bg-[#111111] text-white py-16 md:py-20 px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center border-y border-white/5">
      {stats.map((s, i) => (
        <div key={i} className="stat-item opacity-0 translate-y-5 transition-all">
          {/* Slightly reduced mobile font size for the numbers */}
          <span className="stat-num block font-serif text-[2.5rem] md:text-[3.2rem] font-black text-[#C8A96E]" data-target={s.target}>0</span>
          <div className="text-[0.6rem] md:text-[0.7rem] opacity-40 mt-2 tracking-[0.3em] uppercase font-bold">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
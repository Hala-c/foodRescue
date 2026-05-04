export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen font-sans selection:bg-orange-200" style={{ backgroundColor: '#F2EFE7' }}>
      
      {/* 
        Main Content Area 
        Added pt-32 (padding-top) so the content drops down below your fixed global Navbar!
      */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-16 pt-32">
        {children}
      </main>
      
    </div>
  );
}
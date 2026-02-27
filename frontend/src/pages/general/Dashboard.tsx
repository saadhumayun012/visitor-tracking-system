export const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-[#f8f9f5]">
      
      {/* Green orb top left */}
      <div className="absolute top-[10%] left-[10%] w-100 h-100 rounded-full blur-[50px]"
           style={{ background: "radial-gradient(circle, rgba(20,83,45,0.12) 0%, transparent 70%)" }} />

      {/* Gold orb bottom right */}
      <div className="absolute bottom-[10%] right-[10%] w-87.5 h-87.5 rounded-full blur-[50px]"
           style={{ background: "radial-gradient(circle, rgba(161,119,35,0.12) 0%, transparent 70%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: "radial-gradient(circle, rgba(20,83,45,0.15) 1px, transparent 1px)",
             backgroundSize: "36px 36px",
           }} />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 w-175 h-100 -translate-x-1/2 -translate-y-1/2"
           style={{ background: "radial-gradient(ellipse, rgba(248,249,245,0.98) 0%, transparent 65%)" }} />

      {/* Content */}
      <div className="text-center relative z-10">
        <div className="w-px h-20 mx-auto mb-10"
             style={{ background: "linear-gradient(to bottom, transparent, #14532d)" }} />

        <p className="text-[11px] tracking-[7px] uppercase text-[#a17723] mb-6 font-sans">
          Khyber Pakhtunkhwa Police
        </p>

        <h1 className="text-[clamp(40px,7vw,76px)] font-light text-[#1a1a1a] -tracking-[2px] leading-[1.1] mb-2">
          Visitor Tracking
        </h1>

        <h2 className="text-[clamp(40px,7vw,76px)] font-extrabold -tracking-[2px] leading-[1.1] mb-10 bg-linear-to-br from-[#14532d] via-[#166534] to-[#a17723] bg-clip-text text-transparent">
          System
        </h2>

        <div className="w-px h-20 mx-auto"
             style={{ background: "linear-gradient(to bottom, #a17723, transparent)" }} />
      </div>
    </div>
  );
};
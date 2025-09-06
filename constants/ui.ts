// UI 相关常量
export const BRAND_CONFIG = {
  name: "Amphi",
  fontFamily: "Arial, sans-serif",
};

export const LAYOUT_CONFIG = {
  container: {
    className:
      "min-h-screen bg-black flex items-center justify-center main-container",
    backgroundColor: "#000000",
  },
  brand: {
    position: "absolute top-6 left-6 z-30",
    className: "text-white text-2xl font-bold tracking-wider",
  },
  menu: {
    position:
      "absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-full max-w-[900px] px-4 md:px-0 z-30 mobile-menu",
  },
  searchButton: {
    position: "absolute top-6 right-6 z-30",
    className:
      "p-2 transition-all duration-300 hover:scale-110 hover:opacity-80",
  },
  logoLoop: {
    position: "absolute bottom-10 right-10 z-20 w-80 mobile-logo",
  },
};

export const BUTTON_CONFIG = {
  getStarted: {
    className: "[&>div]:px-[14px] [&>div]:py-[8px] [&>div]:text-[11px]",
    text: "Get Started",
  },
  learnMore: {
    className:
      "bg-white text-black px-[14px] py-[8px] rounded-[12px] text-[11px] font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white",
    text: "Learn More",
  },
  doc: {
    className:
      "card-nav-cta-button inline-flex items-center justify-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-medium cursor-pointer transition-all duration-300 backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-xl",
    text: "Doc",
  },
};

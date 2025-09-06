"use client";

import Orb from '@/components/Orb';
import StarBorder from '@/components/StarBorder';
import ShinyText from '@/components/ShinyText';
import FluidGlassInput from '@/components/FluidGlassInput';
import CardNav from '@/components/CardNav';
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiNodedotjs } from 'react-icons/si';

export default function Home() {
  const navItems = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", href: "#", ariaLabel: "About Company" },
        { label: "Careers", href: "#", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", href: "#", ariaLabel: "Featured Projects" },
        { label: "Case Studies", href: "#", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", href: "#", ariaLabel: "Email us" },
        { label: "Twitter", href: "#", ariaLabel: "Twitter" },
        { label: "LinkedIn", href: "#", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center main-container" style={{ backgroundColor: "#000000" }}>

      {/* 菜单栏 */}
      <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-full max-w-[900px] px-4 md:px-0 z-30 mobile-menu">
        <CardNav
          logo="/logo.svg"
          logoAlt="Agent Logo"
          items={navItems}
          baseColor="#1a1a1a"
          menuColor="#fff"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
          rightContent={
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="card-nav-cta-button inline-flex items-center justify-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-medium cursor-pointer transition-all duration-300 backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-xl"
                style={{ color: "#000000" }}
              >
                Doc
              </button>
              <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80">
                <ShinyText 
                  text="API" 
                  speed={2}
                  className="text-gray-600 text-2xl font-normal"
                />
              </div>
            </div>
          }
        />
      </div>

      <div 
        className="relative mobile-scale"
        style={{ 
          width: '100%', 
          height: '600px', 
          transform: 'scale(1.8)'
        }}
      >
        {/* 主题文字、搜索框和按钮 */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white font-normal leading-tight pointer-events-none">
          <div className="mb-6 mt-12">
            <div className="text-2xl mb-2 font-sans tracking-tight">What can I do for you today?</div>
          </div>
          
          {/* 搜索框 */}
          <div className="pointer-events-auto z-20 mb-4 -mt-2">
            <FluidGlassInput 
              placeholder="Type in anything you want to know..."
              className="w-96 h-10"
            />
          </div>
          
          {/* 按钮组 */}
          <div className="pointer-events-auto z-20 flex gap-4 items-center mt-2">
            <div className="relative group">
              <StarBorder
                as="button"
                color="white"
                speed="5s"
                className="[&>div]:px-[14px] [&>div]:py-[8px] [&>div]:text-[11px]"
              >
                <span className="text-[11px] font-normal">
                  Get Started
                </span>
              </StarBorder>
              
              {/* 下拉菜单 */}
              <div className="absolute top-full left-0 mt-1 w-24 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 ease-out z-50">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-md overflow-hidden shadow-lg shadow-black/20">
                  <button className="w-full px-2 py-1.5 text-left text-white/90 text-[10px] hover:bg-white/10 hover:text-white transition-all duration-150 ease-out">
                    Sign In
                  </button>
                  <button className="w-full px-2 py-1.5 text-left text-white/90 text-[10px] hover:bg-white/10 hover:text-white transition-all duration-150 ease-out">
                    Login
                  </button>
                </div>
              </div>
            </div>
            
            <button className="bg-white text-black px-[14px] py-[8px] rounded-[12px] text-[11px] font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Orb 组件 */}
        <Orb
          hoverIntensity={1.2}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      
      {/* 全局搜索按钮 - 右上角 */}
      <div className="absolute top-6 right-6 z-30">
        <button 
          className="p-2 transition-all duration-300 hover:scale-110 hover:opacity-80"
          onClick={() => {
            // 这里可以添加跳转到全局搜索界面的逻辑
            console.log('跳转到全局搜索界面');
          }}
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>

      {/* LogoLoop 组件 - 页面右下方 */}
      <div className="absolute bottom-10 right-10 z-20 w-80 mobile-logo">
        <div className="text-white text-sm font-sans tracking-tight mb-3 text-center opacity-70 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg px-3 py-1">
          Partners
        </div>
        <LogoLoop
          logos={[
            { 
              node: <SiReact className="text-white" size={28} />, 
              title: "React", 
              href: "https://react.dev" 
            },
            { 
              node: <SiNextdotjs className="text-white" size={28} />, 
              title: "Next.js", 
              href: "https://nextjs.org" 
            },
            { 
              node: <SiTypescript className="text-white" size={28} />, 
              title: "TypeScript", 
              href: "https://www.typescriptlang.org" 
            },
            { 
              node: <SiTailwindcss className="text-white" size={28} />, 
              title: "Tailwind CSS", 
              href: "https://tailwindcss.com" 
            },
            { 
              node: <SiJavascript className="text-white" size={28} />, 
              title: "JavaScript", 
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" 
            },
            { 
              node: <SiNodedotjs className="text-white" size={28} />, 
              title: "Node.js", 
              href: "https://nodejs.org" 
            },
          ]}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={48}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#000000"
          scaleOnHover={true}
          className="px-4"
          ariaLabel="Technology stack"
        />
      </div>
    </div>
  );
}

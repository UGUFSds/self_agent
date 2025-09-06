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
    <div className="min-h-screen bg-black flex items-center justify-center" style={{ backgroundColor: "#000000" }}>

      {/* 菜单栏和 API 字样容器 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-[900px] flex items-start z-30">
        <CardNav
          logo="/logo.svg"
          logoAlt="Agent Logo"
          items={navItems}
          baseColor="#1a1a1a"
          menuColor="#fff"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
          ease="power3.out"
        />
        <div className="ml-8 flex items-center h-[60px] mt-7">
          <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-80">
            <ShinyText 
              text="API" 
              speed={2}
              className="text-gray-600 text-2xl font-normal"
            />
          </div>
        </div>
      </div>

      <div 
        className="relative"
        style={{ 
          width: '100%', 
          height: '600px', 
          transform: 'scale(1.8)'
        }}
      >
        {/* 主题文字、搜索框和按钮 */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white font-bold leading-tight pointer-events-none">
          <div className="mb-6 mt-12">
            <div className="text-2xl mb-2">The most powerful agent is coming</div>
            <div className="text-2xl mb-4">stay tuned!</div>
          </div>
          
          {/* 搜索框 */}
          <div className="pointer-events-auto z-20 mb-4 -mt-2">
            <FluidGlassInput 
              placeholder="Search"
              className="w-80 h-10"
            />
          </div>
          
          {/* 按钮组 */}
          <div className="pointer-events-auto z-20 flex gap-4 items-center -mt-2">
            <StarBorder
              as="button"
              color="white"
              speed="5s"
            >
              <span className="text-[13px] font-normal">
                Get Started
              </span>
            </StarBorder>
            
            <button className="bg-white text-black px-[18px] py-[10px] rounded-[14px] text-[13px] font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white">
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
      
      {/* LogoLoop 组件 - 页面右下方 */}
      <div className="absolute bottom-10 right-10 z-20 w-80">
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

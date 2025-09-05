import Orb from '../components/Orb';
import StarBorder from '../components/StarBorder';
import ShinyText from '../components/ShinyText';
import FluidGlassInput from '../components/FluidGlassInput';
import CardNav from '../components/CardNav';
import Lanyard from '../components/Lanyard';

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
    <div className="min-h-screen bg-black flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
      {/* 可拖拽卡片 - 左上方 */}
      <div className="absolute top-20 left-20 z-30 w-32 h-40">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* CardNav 菜单 */}
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
            <div className="text-3xl mb-2">The most powerful</div>
            <div className="text-3xl mb-2">agent is coming,</div>
            <div className="text-3xl mb-4">stay tuned!</div>
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
    </div>
  );
}

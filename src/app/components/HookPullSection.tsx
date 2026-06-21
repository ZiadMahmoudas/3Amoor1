"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HookPullSection({
  children,
  index = 1,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const panel = section.querySelector(".hook-panel");
      const hook = section.querySelector(".hook-icon");
      const rope = section.querySelector(".hook-rope");

      gsap.set(panel, {
        y: 120,
        scale: 0.96,
        opacity: 0.65,
      });

      gsap.set(hook, {
        y: -120,
        rotate: -10,
      });

      gsap.set(rope, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.to(
        hook,
        {
          y: 180,
          rotate: 8,
          ease: "none",
        },
        0
      )
        .to(
          rope,
          {
            scaleY: 1,
            ease: "none",
          },
          0
        )
        .to(
          panel,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          },
          0.1
        );
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="hook-pull-section"
      style={{ zIndex: index }}
    >
      <div className="hook-visual" aria-hidden="true">
        <span className="hook-rope" />
        <span className="hook-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="687" height="2191" viewBox="0 0 687 2191" fill="none">
<path d="M593.4 317.33L593.42 823.08L593.42 945.87L556.39 945.87L556.39 885L556.4 823.08L556.42 393.16C565.34 363.75 577.29 339.14 593.4 317.33Z" fill="black"/>
<path d="M556.38 1073.13L556.38 945.87L593.42 945.87L593.42 1223.79C616.73 1211.04 641.03 1206.74 667.88 1209.36L667.91 1320.02L645.88 1320.43C636.75 1328.33 629.78 1337.53 623.6 1348.4C613.6 1368.01 606.71 1388.36 602.11 1409.63C595.76 1416.3 588.71 1422.65 580.97 1428.7C557.03 1446.67 528.95 1461.87 482.81 1483.2C483.41 1403.72 501.85 1314.33 556.37 1253.92L556.37 1073.13L556.38 1073.13Z" fill="#A61C24"/>
<path d="M556.43 3.00072e-05L593.39 2.83916e-05L593.39 287.27L593.4 317.33C577.29 339.14 565.34 363.75 556.42 393.16L556.42 3.00076e-05L556.43 3.00072e-05Z" fill="#A61C24"/>
<path d="M241.67 2071.14C255.34 2088.22 268.53 2102.03 281.71 2113.41C317.01 2143.26 348.88 2157.29 409.45 2168.65C383.96 2179.14 356.69 2186.14 328.23 2189.11C152.74 2207.44 0.950051 2068.42 0.460044 1899.66L7.54756e-05 1726.68L79.97 1776.58L268.59 1894.24L135.73 1894.54L111.65 1894.59C112 1977.64 166.5 2047.64 241.68 2071.14L241.67 2071.14Z" fill="#A61C24"/>
<path d="M593.36 1717.38L593.99 1751.43C596.99 1781.42 615.75 1805.31 641.93 1815.33C650.26 1818.54 659.39 1820.34 668.98 1820.45C680.83 1820.59 688.02 1832.73 686.22 1841.78C682.95 1858.26 663.45 1860.14 641.93 1854.28C624.61 1849.59 606 1839.87 593.64 1828.73L592.96 1912.89C588.71 1983.98 559.05 2048.56 512.91 2097.48C514.46 2070.19 515.93 2060.19 515.93 2007.71L515.93 1776.77C515.93 1765.68 516.01 1755.58 516.23 1746.37L593.37 1717.39L593.36 1717.38Z" fill="#A61C24"/>
<path d="M593.39 1495.07L593.25 1529.88L482.61 1571.25L482.78 1536.44L593.39 1495.07Z" fill="#A61C24"/>
<path d="M593.28 1643.35L593.36 1678.05L518.81 1705.94L482.59 1719.5L482.56 1684.8L530.36 1666.91L593.28 1643.35Z" fill="#A61C24"/>
<path d="M593.28 1569.24L593.36 1603.94L482.61 1645.36L482.89 1610.5L593.28 1569.24Z" fill="#A61C24"/>
</svg>
        </span>
      </div>

      <div className="hook-panel">{children}</div>
    </div>
  );
}
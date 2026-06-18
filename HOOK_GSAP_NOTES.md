# Hook GSAP setup

تم فصل تأثير الصنارة والسكشنات في ملفات مستقلة:

- `src/components/hook/HookSvg.tsx` شكل الخطاف SVG.
- `src/components/hook/HookRig.tsx` الصنارة الثابتة على اليمين، بتنزل وترجع حسب السكشن الحالي.
- `src/components/hook/HookPullSection.tsx` يغلف كل سكشن ويعمل card pull animation بالـ GSAP ScrollTrigger.
- `src/components/hook/hookBus.ts` event بسيط بيربط السكشنات بالصنارة.
- `src/app/providers.tsx` Lenis + GSAP ScrollTrigger sync.
- `src/lib/utils.ts` تمت إضافته لحل `@/lib/utils`.

الفكرة:
كل `HookPullSection` مع السكرول يبعت progress للصنارة. الصنارة تنزل في أول الحركة، تمسك السكشن، وبعدين ترجع فوق كأنها بتسحبه وتخليه كارت ظاهر فوق اللي قبله.

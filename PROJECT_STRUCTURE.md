# Project Structure

تم تقسيم الصفحة الرئيسية والصفحات الداخلية بنظام Next.js App Router:

- `src/app/page.tsx` مسؤول فقط عن route الصفحة الرئيسية `/`.
- `src/app/works/page.tsx` مسؤول عن route صفحة الأعمال `/works`.
- `src/app/components/pages` يحتوي Page Containers.
- `src/app/components/sections/home` يحتوي Sections الصفحة الرئيسية.
- `src/app/components/sections/works` يحتوي Sections صفحة الأعمال.
- `src/app/components/layout` يحتوي Navbar / Footer / ScrollToTop.
- `src/app/components/shared` يحتوي العناصر المشتركة مثل SectionBadge و Counter.
- `src/app/components/hook` يحتوي ملفات الأنيميشن الخاصة بالـ Hook و GSAP.

مهم: لا تضع كود UI كبير داخل ملفات `src/app/**/page.tsx`، خليها للراوت فقط.

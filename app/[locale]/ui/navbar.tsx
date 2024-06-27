import NavLinks from '@/app/[locale]/ui/nav-links';
import NavLogo from '@/app/[locale]/ui/nav-logo';
import NavLanguageSwitcher from '@/app/[locale]/ui/nav-language-switcher';

export default function NavBar() {
  return (
    <div className="align-center shadow-primary-regular border-primary-light sticky top-0 z-40 flex h-16 w-full content-center items-center justify-between gap-2 border-b bg-white px-4 shadow-sm md:px-12 md:shadow-lg">
      <NavLogo />
      <NavLinks className="flex-grow" />
      <NavLanguageSwitcher />
    </div>
  );
}

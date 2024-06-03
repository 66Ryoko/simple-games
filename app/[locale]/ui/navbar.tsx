import NavLinks from '@/app/[locale]/ui/nav-links';
import NavLogo from '@/app/[locale]/ui/nav-logo';
import NavLanguageSwitcher from '@/app/[locale]/ui/nav-language-switcher';

export default function NavBar() {
  return (
    <div className="align-center sticky top-0 z-40 flex h-16 w-full content-center items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-2 shadow-sm shadow-gray-100 md:px-12 md:shadow-lg">
      <NavLogo />
      <div className="flex-grow">
        <NavLinks />
      </div>
      <NavLanguageSwitcher />
    </div>
  );
}

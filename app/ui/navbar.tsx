import NavLinks from '@/app/ui/nav-links';
import NavLogo from '@/app/ui/nav-logo';
export default function NavBar() {
  return (
    <div className="align-center sticky top-0 z-40 flex h-16 w-full content-center items-center justify-between border-b border-gray-200 bg-white px-4 py-2 shadow-lg shadow-gray-100 md:px-12">
      <NavLogo />
      <NavLinks />
    </div>
  );
}

import Link from 'next/link';

const LOGO_TEXT = 'SUJAMES';

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">{LOGO_TEXT}</span>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

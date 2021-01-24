import Link from 'next/link';

const LOGO_TEXT = '<sujames />';

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="title-font font-medium text-gray-600 hover:text-blue-600 ml-3 text-xl">
            <span>{LOGO_TEXT}</span>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

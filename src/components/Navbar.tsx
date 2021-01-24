import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap pl-5 flex-col md:flex-row items-center justify-center">
        <Link href="/">
          <a>
            <div className="logo-wrapper">
              <Image
                alt="Sujames Blog Logo"
                objectFit="contain"
                src="https://images.ctfassets.net/ucagv55u4mg1/2Kqj6ixBp1RgtsSnXCRS3L/cf89f3734150f73426db4fd2e502093d/Untitled_Artwork.webp"
                width={2048}
                height={2048}
                layout="responsive"
              />
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

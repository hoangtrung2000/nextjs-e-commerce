import Link from "next/link";
import Container from "./Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-slate-300 w-full z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex gap-3 items-center justify-between md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-Shop
            </Link>
            <div>Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

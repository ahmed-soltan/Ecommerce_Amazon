import { footer } from "@/Utils/footer";
import Container from "@/components/Container";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-800 py-8 h-full pb-16 mt-auto">
      <Container>
        <div className="flex items-start justify-start lg:justify-evenly flex-wrap gap-16">
          {footer.map((footer) => {
            return (
              <div className="flex flex-col items-start gap-2" key={footer.title}>
                <h1 className="font-bold text-white ">{footer.title}</h1>
                <ul>
                  {footer.links.map((link) => {
                    return (
                      <li
                        key={link.label}
                        className="text-sm text-slate-200 my-1"
                      >
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Footer;

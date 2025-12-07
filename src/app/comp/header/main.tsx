import Link from "next/link";
import { links } from "./variables";

export default function Header() {
  return (
    <div className="dark:bg-contrast-dark bg-contrast-light fixed top-4 left-1/2 flex w-11/12 max-w-[1440px] -translate-x-1/2 items-center justify-between rounded-md px-4 py-3">
      <h1 className="text-contrast-dark dark:text-contrast-light text-xl">
        Lumen
      </h1>

      <div>
        {links.map((link) => {
          return (
            <Link
              href={link.path}
              key={link.path}
              className="text-contrast-dark"
            >
              <span>{link.id}</span>
            </Link>
          );
        })}
      </div>

      <Link href="/auth" className="bg-primary-light font-semibold text-lg dark:bg-primary-dark rounded-md px-4 py-1.5 text-contrast-light dark:text-contrast-dark">
        Get started
      </Link>
    </div>
  );
}

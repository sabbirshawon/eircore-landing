import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white py-4 text-center shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <Image
        src="/logo-dark.svg"
        alt="EirCore Logo"
        width={180}
        height={52}
        className="mx-auto"
        priority
      />
    </header>
  );
}

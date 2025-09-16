import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-black text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <h1 className="text-8xl font-bold bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent text-center sm:text-left">
          Devora App
        </h1>
        <p className="text-gray-400 text-center sm:text-left">
          Our stack to deploy fully working applications includes Next.js,
          Convex, ShadCN and Tailwind CSS.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full   transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-200 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://github.com/denislav-nedkov/devora-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github-mark.svg"
              alt="GitHub logomark"
              width={20}
              height={20}
            />
            View on GitHub
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-400"
          href="https://github.com/denislav-nedkov"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Denislav Nedkov
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-400"
          href="https://github.com/DenisHranislavov"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Denis Hranislavov
        </a>
      </footer>
    </div>
  );
}

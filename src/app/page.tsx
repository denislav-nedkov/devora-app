import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 text-foreground sm:p-20 bg-background">
      <main className="row-start-2 -mt-8 flex flex-col items-center justify-start gap-8 text-center">
        <header>
          <h1 className="text-6xl font-bold sm:text-8xl text-secondary-foreground">
            Devora App
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground text-center">
            Our stack to deploy fully working applications includes Next.js,
            Convex, ShadCN and Tailwind CSS.
          </p>
        </header>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="https://github.com/denislav-nedkov/devora-app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Devora App on GitHub"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 sm:text-base"
          >
            <FaGithub className="h-6 w-6" />
            View on GitHub
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
        <a
          href="https://github.com/denislav-nedkov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          @Denislav&nbsp;Nedkov
        </a>
        <a
          href="https://github.com/DenisHranislavov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          @Denis&nbsp;Hranislavov
        </a>
      </footer>
    </div>
  );
}

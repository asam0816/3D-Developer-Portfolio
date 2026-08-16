"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

/*
 * English-only language system.
 *
 * Spanish has been completely removed.
 */
export type Lang = "en";

type LanguageContext = {
  lang: "en";
  setLang: (lang: "en") => void;
  t: (path: string) => string;
};

const Ctx = createContext<LanguageContext | null>(null);

/*
 * English translations.
 */
const translations: Record<string, string> = {
  "header.availability": "Open to Opportunities",

  "hero.greeting": "Hi, I am",
  "hero.roleLine": "Software Engineer & Tech Lead.",
  "hero.tagline":
    "Specialised in ERPs and full-stack apps for businesses.",
  "hero.cv": "Download CV",
  "hero.hire": "Hire Me",
  "hero.scroll": "Scroll to explore",
  "hero.keysHint": "Hover the keys",

  "stack.title": "Tech Stack",
  "stack.hint": "Hover over the keyboard to explore",
  "stack.hintMobile": "Explore my technologies",

  "experience.title": "Experience",
  "experience.subtitle":
    "Professional experience and contributions",

  "projects.kicker": "Featured Project",
  "projects.viewMore": "View Project",

  "contact.kicker": "Get in touch",
  "contact.title": "Let's Work Together",
  "contact.body":
    "Have a project, opportunity, or idea you'd like to discuss? Feel free to get in touch.",
  "contact.copyEmail": "Copy Email",
  "contact.openMail": "Open Mail",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.footer": "© Mohamed Asam",
};

/*
 * Keyboard skill descriptions.
 */
const keyboardTaglines: Record<string, string> = {
  html: "Markup",
  html5: "Markup",

  css: "Styling",
  css3: "Styling",

  javascript: "Programming",
  typescript: "Typed JavaScript",

  react: "UI Library",
  reactjs: "UI Library",

  nextjs: "React Framework",

  nodejs: "Runtime",
  node: "Runtime",

  expressjs: "Backend Framework",
  express: "Backend Framework",

  mongodb: "Database",
  mysql: "Database",
  postgresql: "Database",

  tailwindcss: "CSS Framework",
  tailwind: "CSS Framework",

  git: "Version Control",
  github: "Code Hosting",

  python: "Programming",
  java: "Programming",

  figma: "UI/UX Design",
};

function getTranslation(path: string): string {
  const directTranslation = translations[path];

  if (directTranslation) {
    return directTranslation;
  }

  const prefix = "keyboard.taglines.";

  if (path.startsWith(prefix)) {
    const slug = path
      .slice(prefix.length)
      .toLowerCase();

    return (
      keyboardTaglines[slug] ??
      slug.replace(/[-_]/g, " ")
    );
  }

  /*
   * Unknown translation keys safely return the key itself.
   */
  return path;
}

/*
 * Bootstrap script.
 *
 * Forces the entire website to English and removes
 * the old language preference from localStorage.
 */
export const LANG_BOOT_SCRIPT = `
(function () {
  try {
    document.documentElement.lang = "en";
    localStorage.removeItem("portfolio-lang");
  } catch (e) {}
})();
`;

/*
 * English-only LanguageProvider.
 */
export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const setLang = useCallback((_lang: "en") => {
    document.documentElement.lang = "en";

    try {
      localStorage.removeItem("portfolio-lang");
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  const t = useCallback(
    (path: string) => getTranslation(path),
    []
  );

  return (
    <Ctx.Provider
      value={{
        lang: "en",
        setLang,
        t,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export default LanguageProvider;

/*
 * Language hook.
 *
 * Components can safely call useLanguage() even if they are
 * rendered outside the provider.
 */
export function useLanguage(): LanguageContext {
  const ctx = useContext(Ctx);

  if (ctx) {
    return ctx;
  }

  return {
    lang: "en",
    setLang: () => {},
    t: getTranslation,
  };
}
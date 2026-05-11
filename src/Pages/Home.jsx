import { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { scheduleScrollToSection } from "../utils/sectionScroll";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";

/* =========================
  SMALL COMPONENTS
========================= */

const StatusBadge = memo(() => (
  <div
    className="inline-flex animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group rounded-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-xl">
        Software Developer
      </div>
    </div>
  </div>
));



const MainTitle = memo(() => (

  <div
    className="space-y-2"
    data-aos="fade-up"
    data-aos-delay="600"
  >

    <h1 className="text-[clamp(2.75rem,12vw,4.5rem)] sm:text-[clamp(3.75rem,8vw,5rem)] lg:text-[clamp(4rem,6vw,5.5rem)] font-bold tracking-tight leading-[0.95]">

      <span className="relative inline-block">

        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>

        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Flutter
        </span>

      </span>

      <br />

      <span className="relative inline-block mt-2">

        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>

        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>

      </span>

    </h1>

  </div>

));



const TechStack = memo(({ tech }) => (

  <div className="px-3.5 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs md:text-sm text-gray-300 hover:bg-white/10 transition-colors">

    {tech}

  </div>

));



const CTAButton = memo(({ to, text, icon: Icon, sectionId }) => (

  <Link
    className="w-full sm:w-auto"
    to={to}
    state={sectionId ? { scrollTo: sectionId, scrollTick: Date.now() } : undefined}
    onClick={() => {
      if (sectionId) {
        scheduleScrollToSection(sectionId);
      }
    }}
  >

    <button className="group relative w-full sm:w-[160px]">

      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-300"></div>

      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden">

        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>

        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-200">

          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>

          <Icon className="w-4 h-4 text-gray-200 group-hover:translate-x-1 transition-all duration-200 z-10" />

        </span>

      </div>

    </button>

  </Link>

));



const SocialLink = memo(({ icon: Icon, link }) => (

  <a href={link} target="_blank" rel="noopener noreferrer">

    <button className="group relative p-3">

      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>

      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-200">

        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />

      </div>

    </button>

  </a>

));



/* =========================
   CONSTANTS
========================= */

const TYPING_SPEED = 100;

const ERASING_SPEED = 50;

const PAUSE_DURATION = 2000;

const WORDS = [
  "Flutter Developer",
  "Frontend & Backend Developer",
];

const TECH_STACK = [
  "Flutter",
  "Dart",
  "Firebase",
  "REST API",
  "Python",
  "Django",
  "React",
];

const SOCIAL_LINKS = [

  {
    icon: Github,
    link: "https://github.com/rashid-flutter",
  },

  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/rashidv-flutter-developer/",
  },

  {
    icon: Instagram,
    link: "https://www.instagram.com/ra.shiee_/",
  },

];



/* =========================
   MAIN COMPONENT
========================= */

const Home = () => {

  const [text, setText] = useState("");

  const [isTyping, setIsTyping] = useState(true);

  const [wordIndex, setWordIndex] = useState(0);

  const [charIndex, setCharIndex] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  const [isHovering, setIsHovering] = useState(false);


  /* PAGE LOAD */

  useEffect(() => {

    setIsLoaded(true);

    return () => setIsLoaded(false);

  }, []);



  /* TYPING EFFECT */

  const handleTyping = useCallback(() => {

    if (isTyping) {

      if (charIndex < WORDS[wordIndex].length) {

        setText(prev =>
          prev + WORDS[wordIndex][charIndex]
        );

        setCharIndex(prev => prev + 1);

      }

      else {

        setTimeout(() => {

          setIsTyping(false);

        }, PAUSE_DURATION);

      }

    }

    else {

      if (charIndex > 0) {

        setText(prev =>
          prev.slice(0, -1)
        );

        setCharIndex(prev =>
          prev - 1
        );

      }

      else {

        setWordIndex(prev =>
          (prev + 1) % WORDS.length
        );

        setIsTyping(true);

      }

    }

  }, [
    charIndex,
    isTyping,
    wordIndex
  ]);



  useEffect(() => {

    const timeout = setTimeout(
      handleTyping,
      isTyping
        ? TYPING_SPEED
        : ERASING_SPEED
    );

    return () => clearTimeout(timeout);

  }, [
    handleTyping,
    isTyping
  ]);



  return (

    <section
      className="min-h-[100svh] bg-[#030014] overflow-hidden"
      id="Home"
    >

      <div
        className={`relative z-10 transition-all duration-1000 ease-out ${
          isLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >

        <div className="mx-auto flex min-h-[100svh] w-full max-w-7xl px-[5%] sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16">

          <div className="flex w-full flex-col lg:flex-row items-center justify-center md:justify-between gap-10 lg:gap-16 xl:gap-20">

            {/* LEFT */}

            <div
              className="w-full lg:w-[48%] space-y-6 text-center lg:text-left"
              data-aos="fade-right"
              data-aos-delay="200"
            >

              <div className="space-y-5 sm:space-y-6">

                <StatusBadge />

                <MainTitle />



                {/* TYPING */}

                <div
                  className="min-h-8 flex items-center justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >

                  <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">

                    {text}

                  </span>

                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-pulse"></span>

                </div>



                {/* DESCRIPTION */}

                <p
                  className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >

                  I'm a passionate Flutter Developer with strong experience in Dart, Firebase, React and backend systems.

                </p>



                {/* TECH STACK */}

                <div
                  className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >

                  {TECH_STACK.map((tech, index) => (

                    <TechStack
                      key={index}
                      tech={tech}
                    />

                  ))}

                </div>



                {/* BUTTONS */}

                <div
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >

                  <CTAButton
                    to="/projects"
                    sectionId="Projects"
                    text="Projects"
                    icon={ExternalLink}
                  />

                  <CTAButton
                    to="/contact"
                    sectionId="Contact"
                    text="Contact"
                    icon={Mail}
                  />

                </div>



                {/* SOCIAL */}

                <div
                  className="hidden sm:flex gap-4 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="850"
                >

                  {SOCIAL_LINKS.map(
                    (social, index) => (

                      <SocialLink
                        key={index}
                        {...social}
                      />

                    )
                  )}

                </div>

              </div>

            </div>



            {/* RIGHT GIF SECTION */}

            <div
              className="w-full lg:w-[52%] flex items-center justify-center"
              onMouseEnter={() =>
                setIsHovering(true)
              }
              onMouseLeave={() =>
                setIsHovering(false)
              }
              data-aos="fade-left"
              data-aos-delay="600"
            >

              <div className="relative w-full max-w-[min(82vw,460px)] sm:max-w-[520px] xl:max-w-[620px]">

                {/* GLOW */}

                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 blur-3xl rounded-full transition-all duration-700 ${
                    isHovering
                      ? "scale-110 opacity-60"
                      : "scale-100 opacity-30"
                  }`}
                ></div>



                {/* GIF */}
  <img
  src="/Animation1.gif"
  alt="Developer Animation"
  className={`relative z-10 w-full h-auto max-h-[38svh] sm:max-h-[44svh] lg:max-h-[68svh] object-contain transition-transform duration-500 ease-out ${
    isHovering
      ? "scale-[1.02]"
      : "scale-100"
  }`}
  draggable="false"
  style={{
    imageRendering: "auto"
  }}
/>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};



export default memo(Home);

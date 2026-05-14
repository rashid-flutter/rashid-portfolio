import {
  memo,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { scheduleScrollToSection } from "../utils/sectionScroll";

// Header Component
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>

    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

// Profile Image Component
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />

        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">

          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />

          <img
            src="my---pica.png"
            alt="Rashid V"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

// Stats Card Component
const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation, onNavigate }) => (
    <Link
      to="/projects"
      state={{ scrollTo: "Projects", scrollTick: Date.now() }}
      onClick={onNavigate}
      aria-label={`Go to ${label}`}
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014] rounded-2xl"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">

        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>

          <span className="text-4xl font-bold text-white">
            {value}
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
            {label}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {description}
            </p>

            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
);

// Main Component
const AboutPage = () => {

  const handleProjectsNavigation = useCallback(() => {
    scheduleScrollToSection("Projects");
  }, []);

  // Dynamic Counts
 const [totalProjects, setTotalProjects] = useState(0);
const [totalCertificates, setTotalCertificates] = useState(0);

useEffect(() => {

  fetch("/project.json")
    .then((res) => res.json())
    .then((data) => {
      setTotalProjects(data.projects.length || 0);
    })
    .catch((err) => {
      console.log("Project Error:", err);
    });

  fetch("/certificate.json")
    .then((res) => res.json())
    .then((data) => {
      setTotalCertificates(data.certificates.length || 0);
    })
    .catch((err) => {
      console.log("Certificate Error:", err);
    });

}, []);
  // Experience Calculation
  const YearExperience = useMemo(() => {

    const startDate = new Date("2021-11-06");
    const today = new Date();

    return (
      today.getFullYear() -
      startDate.getFullYear() -
      (
        today <
        new Date(
          today.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
          ? 1
          : 0
      )
    );

  }, []);

  // Stats Data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>

              <span className="block mt-2 text-gray-200">
                Rashid V
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I'm a passionate Flutter Developer who loves building fast,
              smooth, and user-friendly apps for mobile and web. With
              experience in Firebase, REST APIs, Riverpod, and Bloc,
              I focus on creating seamless digital experiences and
              high-performance applications.
            </p>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:px-0 w-full">

              <a
                href="https://drive.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">

                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />

                  Download CV

                </button>
              </a>

              <Link
                to="/projects"
                state={{ scrollTo: "Projects", scrollTick: Date.now() }}
                onClick={handleProjectsNavigation}
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10">

                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />

                  View Projects

                </button>
              </Link>

            </div>
          </div>

          {/* Right Image */}
          <ProfileImage />

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">

          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
              onNavigate={handleProjectsNavigation}
            />
          ))}

        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
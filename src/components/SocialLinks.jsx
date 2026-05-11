import {
  Linkedin,
  Github,
  Instagram,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/rashidv-flutter-developer/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@ra.shiee_",
    icon: Instagram,
    url: "https://www.instagram.com/ra.shiee_/?next=%2F",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]"
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@rashid-flutter",
    icon: Github,
    url: "https://github.com/rashid-flutter", // Fixed typo: "ttps" to "https"
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const iconVariants = {
  rest: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -8, 8, 0],
    scale: 1.12,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const SocialLinks = () => {
  const linkedIn = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);
  const [instagram, github] = otherLinks;

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl border border-white/10 shadow-2xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <motion.span
          className="inline-block w-8 h-1 bg-indigo-500 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
        Connect With Me
      </h3>

      <motion.div className="flex flex-col gap-4" variants={containerVariants}>
        {/* LinkedIn - Primary Row */}
        <motion.a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open LinkedIn profile"
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center justify-between p-4 rounded-lg 
                     bg-white/5 border border-white/10 overflow-hidden
                     hover:border-white/25 transition-colors duration-500
                     hover:shadow-lg hover:shadow-[#0A66C2]/10"
          style={{ willChange: "transform" }}
        >
          {/* Hover Gradient Background */}
          <div 
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                       bg-gradient-to-r ${linkedIn.gradient}`}
          />
          <div className="absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
          
          {/* Content Container */}
          <div className="relative flex items-center gap-4">
            {/* Icon Container */}
            <div className="relative flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-20 rounded-md blur-sm transition-all duration-500
                           group-hover:scale-125 group-hover:opacity-40"
                style={{ backgroundColor: linkedIn.color }}
              />
              <motion.div className="relative p-2 rounded-md" variants={iconVariants}>
                <linkedIn.icon
                  className="w-6 h-6"
                  style={{ color: linkedIn.color }}
                />
              </motion.div>
            </div>

            {/* Text Container */}
            <div className="flex flex-col">
              <span className="text-lg font-bold pt-[0.2rem] text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          {/* External Link */}
          <ExternalLink 
            className="relative w-5 h-5 text-gray-500 group-hover:text-white
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       transform group-hover:translate-x-1 -translate-x-1"
          />

          {/* Shine Effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </motion.a>

        {/* Second Row - Instagram & GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[instagram, github].map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${link.name} profile`}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                         bg-white/5 border border-white/10 overflow-hidden
                         hover:border-white/25 transition-colors duration-500
                         hover:shadow-lg hover:shadow-purple-500/10"
              style={{ willChange: "transform" }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                               bg-gradient-to-r ${link.gradient}`} />
              <div className="absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 rounded-lg blur-sm transition-all duration-500
                                 group-hover:scale-150 group-hover:opacity-40"
                       style={{ backgroundColor: link.color }} />
                <motion.div className="relative p-2 rounded-lg" variants={iconVariants}>
                  <link.icon
                    className="w-5 h-5"
                    style={{ color: link.color }}
                  />
                </motion.div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                       opacity-0 group-hover:opacity-100 transition-all duration-300
                                       transform group-hover:translate-x-1 -translate-x-2" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialLinks;

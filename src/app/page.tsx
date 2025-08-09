"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// NOTE: This is a single-file Next.js page component (pages/index.js).
// Dependencies to install:
// npm i framer-motion swiper emailjs-com react-icons
// Tailwind must be configured in the project (see Tailwind docs).
const words = [
    "Full‑Stack Developer",
    "DevOps Engineer",
    "Performance Optimizer",
    "Product-minded Builder",
  ];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const idxRef = useRef(0);
  const letterRef = useRef(0);
  const directionRef = useRef(1); // 1 typing, -1 deleting

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      const word = words[idxRef.current];
      if (directionRef.current === 1) {
        // typing
        letterRef.current += 1;
        setTypingText(word.slice(0, letterRef.current));
        if (letterRef.current === word.length) {
          directionRef.current = -1;
          setTimeout(() => {}, 600);
        }
      } else {
        // deleting
        letterRef.current -= 1;
        setTypingText(word.slice(0, letterRef.current));
        if (letterRef.current === 0) {
          directionRef.current = 1;
          idxRef.current = (idxRef.current + 1) % words.length;
        }
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  // Persisted dark mode
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("sumit_dark");
    if (stored) setDark(stored === "true");
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("sumit_dark", dark.toString());
  }, [dark]);

  // Simple parallax: transform backgrounds on scroll
  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      const el = document.getElementById("parallax-hero");
      if (el) el.style.backgroundPosition = `center ${Math.max(-30, -sc * 0.15)}px`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const skills = [
    { name: "Frontend", level: 92 },
    { name: "Backend", level: 88 },
    { name: "DevOps", level: 90 },
    { name: "Databases", level: 82 },
  ];

  const projects = [
    {
      title: "Inventory Management App",
      tag: "Web App",
      desc: "Full-stack app with real-time stock updates, vendor management and reporting.",
      tech: ["React", "Node.js", "Postgres", "Docker"]
    },
    {
      title: "DevOps Automation Suite",
      tag: "Infrastructure",
      desc: "CI/CD templates, infra-as-code, and monitoring playbooks for startups.",
      tech: ["Terraform", "K8s", "GitHub Actions"]
    },
    {
      title: "Micro-SaaS: InvoiceGen",
      tag: "SaaS",
      desc: "Invoice generator with templates, exports & Stripe billing.",
      tech: ["Next.js", "Stripe", "Vercel"]
    }
  ];

  const testimonials = [
    { name: "Rahul Mehta", role: "Founder, RetailCo", text: "Sumit turned our manual stock system into a real-time app — incredible delivery and communication." },
    { name: "Priya Sharma", role: "CEO, StudioX", text: "Reliable, fast, and technical — his automation saved our devs countless hours." },
    { name: "Ankit Verma", role: "CTO, QuickStart", text: "Hands-on DevOps mastery — setup, docs, and mentorship. Highly recommend." }
  ];

  // Contact form handler (uses emailjs — replace with your keys)
  // const sendRef = useRef(null);
  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // lightweight client-side validation
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const msg = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();
    if (!name || !email || !msg) {
      alert("Please fill all fields");
      return;
    }
    // If you set up emailjs, uncomment below and add your IDs
    /*
    import emailjs from 'emailjs-com';
    emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID')
      .then(()=> alert('Message sent!'))
      .catch(()=> alert('Error sending message'));
    */
    alert("(Demo) Message captured. Hook up EmailJS or your backend to send it.");
    form.reset();
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className={`min-h-screen ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>

        {/* Floating social icons */}
        <div className="fixed left-4 top-1/3 z-40 flex flex-col gap-3">
          <a href="#contact" className="flex items-center justify-center p-2 rounded-full bg-blue-600 text-white shadow-md hover:scale-105 transform transition">✉️</a>
          <a href="https://github.com/sumit" target="_blank" rel="noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:scale-105">GH</a>
          <a href="https://linkedin.com/in/sumit" target="_blank" rel="noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:scale-105">in</a>
        </div>

        {/* Responsive Breadcrumb Navigation */}
        <nav className={`fixed w-full z-30 top-0 ${dark ? 'bg-black/40' : 'bg-white/70'} backdrop-blur-md shadow-sm`} aria-label="Breadcrumb">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            {/* Mobile Layout */}
            <div className="flex md:hidden items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">SK</div>
                <div>
                  <div className="font-semibold text-sm">Sumit Kumar</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 hidden sm:block">Full‑Stack • DevOps</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDark(d => !d)} className="px-2 py-1 rounded-md border text-xs">{dark ? '☀️' : '🌙'}</button>
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  className="p-1 rounded-md border text-xs"
                >
                  {mobileMenuOpen ? '✕' : '☰'}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-3 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-2">
                  <span className="text-xs text-gray-400 px-2">Navigation</span>
                  <a href="#projects" className="px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                  <a href="#testimonials" className="px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                  <a href="#contact" className="px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
              </div>
            )}
            
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">SK</div>
                <div>
                  <div className="font-semibold">Sumit Kumar</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Full‑Stack • DevOps • Product</div>
                </div>
              </div>
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-400">Portfolio</span>
                <span className="text-gray-400 mx-1">/</span>
                <div className="flex items-center gap-4">
                  <a href="#projects" className="hover:underline hover:text-blue-600 transition-colors">Projects</a>
                  <span className="text-gray-400">/</span>
                  <a href="#testimonials" className="hover:underline hover:text-blue-600 transition-colors">Testimonials</a>
                  <span className="text-gray-400">/</span>
                  <a href="#contact" className="hover:underline hover:text-blue-600 transition-colors">Contact</a>
                </div>
                <button onClick={() => setDark(d => !d)} className="ml-4 px-3 py-1 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{dark ? 'Light' : 'Dark'}</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero with parallax background */}
        <section id="parallax-hero" className="relative h-[62vh] flex items-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-6xl mx-auto px-6 pt-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-3xl">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-3xl text-white font-bold">SK</div>
                  <div>
                    <h1 className="text-3xl font-bold">Hi, I&#39;m Sumit Kumar</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{typingText}<span className="ml-1 text-blue-600 dark:text-blue-400">|</span></p>
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">I design and build fast, reliable web apps — from UI to infra. I love automating repetitive work so teams can focus on shipping features.</p>
                    <div className="mt-4 flex gap-3">
                      <a href="/resume.pdf" download className="px-4 py-2 rounded-md bg-blue-600 text-white shadow hover:scale-105 transform">Download Resume</a>
                      <a href="#projects" className="px-4 py-2 rounded-md border">See Projects</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-6 py-12">

          {/* Skills - animated bars with percent */}
          <section id="skills" className="mb-12">
            <motion.h2 className="text-2xl font-semibold mb-6" initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}}>Skills</motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {skills.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.level}%</div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                      <motion.div initial={{width:0}} whileInView={{width:`${s.level}%`}} transition={{duration:1.1, delay:i*0.15}} className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"></motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-white/60 to-gray-50 dark:from-black/40 dark:to-gray-800 p-6 rounded-xl shadow-inner">
                <h3 className="font-semibold mb-2">Quick Blurb</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">I ship frontends that feel native, backends that scale, and infra that stays reliable. If you need performance, observability, or faster deploys — I’ll build it.</p>
                <div className="mt-4 flex gap-3">
                  <a href="#contact" className="px-4 py-2 rounded-md border">Work with me</a>
                  <a href="#testimonials" className="px-4 py-2 rounded-md">See feedback</a>
                </div>
              </div>
            </div>
          </section>

          {/* Projects gallery - hover flip cards */}
          <section id="projects" className="mb-12">
            <motion.h2 className="text-2xl font-semibold mb-6" initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}}>Projects</motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <motion.div key={p.title} whileHover={{scale:1.03}} className="relative group perspective">
                  <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 transform transition-transform duration-300">
                    <div className="p-5">
                      <div className="text-sm text-blue-600 font-medium">{p.tag}</div>
                      <h3 className="font-bold text-lg mt-2">{p.title}</h3>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tech.map(t => <span key={t} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{t}</span>)}
                      </div>
                    </div>
                    <div className="p-3 border-t text-sm text-gray-500 dark:text-gray-400">View case study →</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials Carousel */}
          <section id="testimonials" className="mb-12">
            <motion.h2 className="text-2xl font-semibold mb-6" initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}}>Testimonials</motion.h2>
            <Swiper modules={[Autoplay, Pagination]} pagination={{clickable:true}} autoplay={{delay:3500}} spaceBetween={20} slidesPerView={1}>
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white dark:bg-gray-800 p-6 mb-12 mx-1 rounded-xl shadow-md">
                    <p className="italic">{t.text}</p>
                    <div className="mt-4 font-semibold">— {t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* Contact form */}
          <section id="contact" className="mb-16">
            <motion.h2 className="text-2xl font-semibold mb-6" initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}}>Contact</motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white/60 to-gray-50 dark:from-black/40 dark:to-gray-800 p-6 rounded-xl shadow-inner">
                <h4 className="font-semibold mb-2">Let&apos;s talk</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Describe your project and timeline — I’ll get back within 24–48 hours.</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3"><span className="font-medium">Email:</span><a href="mailto:sumit@example.com" className="text-blue-600">sumit@example.com</a></div>
                  <div className="flex items-center gap-3"><span className="font-medium">Location:</span><span className="text-gray-600">India</span></div>
                </div>
              </div>

              <form onSubmit={handleContact} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <div className="mb-3">
                  <label htmlFor="name" className="block text-sm mb-1">Name</label>
                  <input id="name" name="name" className="w-full px-3 py-2 rounded-md border bg-transparent" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <input id="email" name="email" type="email" className="w-full px-3 py-2 rounded-md border bg-transparent" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="block text-sm mb-1">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 rounded-md border bg-transparent" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Send Message</button>
                </div>
              </form>
            </div>
          </section>

        </main>

        <footer className="py-6 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Sumit Kumar — Built with Next.js & Tailwind
        </footer>
      </div>
    </div>
  );
}

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Trophy, Umbrella, Users, Sparkles, MapPin } from "lucide-react";
import ScrollReveal, { ScrollRevealStagger, itemReveal, WordReveal } from "@/components/ui/ScrollReveal";

const CATEGORY_ICONS = {
  "Sports Event": Trophy,
  "Tech": Zap,
  "Leisure": Umbrella,
  "Adventure": MapPin,
  "Club Party": Users,
  "Festival": Sparkles,
};

const CATEGORY_COLORS = {
  "Sports Event": "from-orange-500/20 to-amber-600/10 border-orange-500/30 text-orange-400",
  "Tech": "from-blue-500/20 to-cyan-600/10 border-blue-500/30 text-blue-400",
  "Leisure": "from-teal-500/20 to-emerald-600/10 border-teal-500/30 text-teal-400",
  "Adventure": "from-green-500/20 to-emerald-600/10 border-green-500/30 text-green-400",
  "Club Party": "from-purple-500/20 to-fuchsia-600/10 border-purple-500/30 text-purple-400",
  "Festival": "from-pink-500/20 to-rose-600/10 border-pink-500/30 text-pink-400",
};

export const EVENTS = [
  {
    id: "cricket-tournament",
    title: "Cricket Tournament",
    category: "Sports Event",
    year: "Nov 2025",
    tagline: "Engineering the ultimate competitive environment",
    description: "A high-energy competitive sports event with strong crowd and execution feel, demanding absolute precision.",
    story: [
      "A high-energy competitive sporting experience designed to bring together skill, passion, and crowd excitement.",
      "The Cricket Tournament showcased intense matches, strategic gameplay, and a strong sense of sportsmanship.",
      "From powerful batting performances to precise bowling spells, every moment kept the audience engaged.",
      "The event was structured to ensure smooth scheduling and professional-level organization.",
      "Spectators experienced a stadium-like atmosphere filled with energy and enthusiasm.",
      "Team coordination, competition, and adrenaline defined the spirit of the tournament.",
      "The setup ensured seamless match transitions and high-quality gameplay conditions.",
      "Players had the opportunity to perform under pressure and showcase their true potential.",
      "Audience engagement remained consistently high throughout the event.",
      "This tournament reflected Evox Ventures’ ability to execute large-scale sports experiences flawlessly."
    ],
    image: "/images/cricket-main-final.jpg",
    span: "col-span-1 lg:col-span-2",
    height: "h-[420px] lg:h-[520px]",
    highlights: ["12 Elite Teams", "3 Days of Action", "500+ Spectators"],
    moments: [
      "/images/cricket-main-final.jpg",
      "/images/cricket-main-final.jpg",
      "/images/cricket-main-final.jpg",
      "/images/cricket-main-final.jpg"
    ]
  },
  {
    id: "kalsubai-trek",
    title: "Kalsubai Trek",
    category: "Adventure",
    year: "Dec 2025",
    tagline: "Ascending the highest peak of Maharashtra safely",
    description: "An immersive outdoor adventure experience fusing the endurance of the trail with an unforgettable atmosphere.",
    story: [
      "An immersive adventure experience set against the breathtaking backdrop of the highest peak in Maharashtra.",
      "The Kalsubai Trek brought together thrill, endurance, and natural beauty in one unforgettable journey.",
      "Participants experienced the excitement of ascending challenging trails and witnessing panoramic views.",
      "The trek was carefully organized to balance safety with adventure.",
      "From early morning climbs to the rewarding summit experience, every moment was curated.",
      "The journey fostered teamwork, resilience, and a deep connection with nature.",
      "The atmosphere was filled with motivation and collective achievement.",
      "Each step of the climb reflected determination and shared energy among participants.",
      "The experience created lasting memories through both challenge and scenic beauty.",
      "This event highlighted Evox Ventures’ ability to craft meaningful outdoor experiences."
    ],
    image: "/images/trek-hero.png",
    span: "col-span-1",
    height: "h-[420px] lg:h-[520px]",
    highlights: ["Sunrise Summit", "Guided Safety", "Luxury Provisions"],
    moments: [
      "/images/trek-hero.png",
      "/images/travel-v2.jpg",
      "/images/travel-poster.jpg",
      "/images/travel-v3.jpg"
    ]
  },
  {
    id: "alibaug-beach-trip",
    title: "Alibaug Beach Trip",
    category: "Leisure",
    year: "Jan 2026",
    tagline: "A premium coastal escape balanced with elite execution",
    description: "An elevated beach getaway curated for relaxation, energy, and seamlessly engineered group moments.",
    story: [
      "A premium coastal escape designed to deliver relaxation, energy, and unforgettable moments.",
      "The Alibaug Beach Trip offered a perfect blend of leisure and vibrant group experiences.",
      "Participants enjoyed scenic ocean views, refreshing sea breezes, and a laid-back luxury atmosphere.",
      "The event was curated to balance comfort with engaging activities.",
      "From beachside interactions to group bonding experiences, the trip felt seamless.",
      "The environment encouraged relaxation while maintaining a lively energy.",
      "Carefully planned logistics ensured a smooth and enjoyable journey.",
      "Every element was designed to create a premium getaway experience.",
      "The coastal setting added a refreshing dimension to the overall experience.",
      "This trip showcased Evox Ventures’ ability to design high-quality travel and lifestyle events."
    ],
    image: "/images/alibaug-pool.jpg",
    span: "col-span-1 lg:col-span-2",
    height: "h-[400px] lg:h-[500px]",
    highlights: ["Private Cabanas", "Sunset DJ Sets", "Curated Dining"],
    moments: [
      "/images/alibaug-pool.jpg",
      "/images/beach-1.png",
      "/images/beach-2.png",
      "/images/beach-3.png"
    ]
  },
  {
    id: "night-wave",
    title: "Night Wave",
    category: "Club Party",
    year: "Feb 2026",
    tagline: "Unleashing the ultimate premium club atmosphere",
    description: "A high-energy nightlife experience designed with intense mood, electronic music, and a premium neon atmosphere.",
    story: [
      "A high-energy nightlife experience designed to deliver a premium club atmosphere.",
      "Night Wave transformed the venue into an immersive party environment with music, lights, and energy.",
      "The event featured dynamic lighting setups and an engaging crowd experience.",
      "The atmosphere was crafted to feel exclusive, vibrant, and unforgettable.",
      "Music, rhythm, and movement defined the entire experience.",
      "Guests experienced a seamless blend of entertainment and premium ambiance.",
      "The event maintained high energy levels throughout the night.",
      "Every detail contributed to a luxury nightlife vibe.",
      "The crowd engagement and mood made the event truly memorable.",
      "Night Wave highlighted Evox Ventures’ expertise in curating elite nightlife experiences."
    ],
    image: "/images/night-wave.jpg",
    span: "col-span-1",
    height: "h-[400px] lg:h-[500px]",
    highlights: ["VIP Bottle Service", "World-Class DJs", "Exclusive Access"],
    moments: [
      "/images/night-wave.jpg",
      "/images/social-v2.jpg",
      "/images/social-v3.jpg",
      "/images/corporate-v2.jpg"
    ]
  },
  {
    id: "rangholic",
    title: "Rangholic",
    category: "Festival",
    year: "3 Mar 2026",
    tagline: "Executing a massive luxury color festival",
    description: "A color-filled festive celebration unmatched in energy, scale, and an absolutely unforgettable atmosphere.",
    story: [
      "A vibrant celebration of colors, culture, and collective energy.",
      "Rangholic brought together people in a high-energy Holi festival experience.",
      "The event was filled with colors, music, and joyful interactions.",
      "Participants experienced a lively and festive atmosphere throughout.",
      "The celebration reflected tradition while maintaining a modern event feel.",
      "Energy levels remained high as colors filled the air.",
      "The environment was safe, organized, and highly engaging.",
      "Every moment was designed to maximize fun and participation.",
      "The event created a strong sense of community and celebration.",
      "Rangholic demonstrated Evox Ventures’ ability to deliver large-scale festive experiences."
    ],
    image: "/images/rangholic.jpg",
    span: "col-span-1 lg:col-span-2",
    height: "h-[400px] lg:h-[500px]",
    highlights: ["Organic Color Blasts", "Live DJ Sets", "Curated Energy"],
    moments: [
      "/images/rangholic.jpg",
      "/images/social-v2.jpg",
      "/images/social-v3.jpg"
    ]
  },
  {
    id: "badminton-tournament",
    title: "Badminton Tournament",
    category: "Sports Event",
    year: "Mar 2026",
    tagline: "Precision execution of competitive indoor sports",
    description: "A fast-paced indoor sports competition executed with high precision and non-stop athletic excitement.",
    story: [
      "A fast-paced competitive indoor sports event focused on precision and agility.",
      "The Badminton Tournament showcased skill, speed, and intense gameplay.",
      "Players competed in a well-structured tournament environment.",
      "The event ensured fair play and smooth match transitions.",
      "Audience engagement remained strong throughout the matches.",
      "The indoor setup created a focused and energetic environment.",
      "Participants demonstrated technical excellence and competitive spirit.",
      "The tournament emphasized performance and discipline.",
      "Each match contributed to a high-energy sporting atmosphere.",
      "This event highlighted Evox Ventures’ capability in organizing indoor sports competitions."
    ],
    image: "/images/badminton.jpg",
    span: "col-span-1",
    height: "h-[400px]",
    highlights: ["Pro-Grade Courts", "Digital Scoring", "Elite Bracket"],
    moments: [
      "/images/badminton.jpg",
      "/images/sports-v2.jpg",
      "/images/sports-poster.jpg",
      "/images/corporate-v2.jpg"
    ]
  },
  {
    id: "tech-hackathon",
    title: "Tech Hackathon",
    category: "Tech",
    year: "Apr 2026",
    tagline: "A dynamic 48-hour innovation-driven arena",
    description: "A collaborative, ultra-modern tech-first event focused entirely on driving ideas, breakthrough innovation, and pure execution.",
    story: [
      "A dynamic innovation-driven event designed for creativity and problem-solving.",
      "The Tech Hackathon brought together developers, designers, and thinkers.",
      "Participants collaborated to build solutions in a high-energy environment.",
      "The event fostered innovation, teamwork, and rapid execution.",
      "Ideas were transformed into working prototypes within a short timeframe.",
      "The atmosphere encouraged experimentation and learning.",
      "Teams worked intensively to deliver impactful results.",
      "The event showcased the power of collaboration and technology.",
      "Participants gained valuable experience in real-time problem-solving.",
      "This hackathon demonstrated Evox Ventures’ ability to execute modern tech-driven experiences."
    ],
    image: "/images/corporate-v3.jpg",
    span: "col-span-1 lg:col-span-3",
    height: "h-[450px]",
    highlights: ["48-Hour Sprint", "Cloud Architecture", "VC Networking"],
    moments: [
      "/images/corporate-v3.jpg",
      "/images/corporate-poster.jpg",
      "/images/social-v3.jpg",
      "/images/corporate-v2.jpg"
    ]
  }
];

function EventCard({ event, index }) {
  const reduced = useReducedMotion();
  const [imgSrc, setImgSrc] = useState(event.image);
  const [imgError, setImgError] = useState(false);
  const Icon = CATEGORY_ICONS[event.category];
  const catColor = CATEGORY_COLORS[event.category];

  // Map category to a reliable local fallback if primary fails
  const BACKGROUND_FALLBACKS = {
    "Sports Event": "/images/sports-v3.jpg",
    "Tech": "/images/corporate-v3.jpg",
    "Leisure": "/images/travel-v3.jpg",
    "Adventure": "/images/travel-v2.jpg",
    "Club Party": "/images/social-v3.jpg",
    "Festival": "/images/social-v2.jpg",
  };

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true);
      const fallback = BACKGROUND_FALLBACKS[event.category] || "/images/social-poster.jpg";
      setImgSrc(fallback);
    }
  };

  return (
    <motion.div
      variants={itemReveal}
      className={`group relative overflow-hidden rounded-2xl ${event.span} ${event.height} cursor-pointer`}
    >
      <Link href={`/portfolio/${event.id}`} className="absolute inset-0 z-20" aria-label={`View ${event.title}`} />

      {/* Background image */}
      <div className={`absolute inset-0 overflow-hidden rounded-2xl bg-zinc-900 transition-colors duration-500 ${imgError ? 'bg-gradient-to-br from-zinc-800 to-zinc-900' : ''}`}>
        {!imgError || imgSrc !== event.image ? (
          <Image
            src={imgSrc}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
            priority={index < 2}
            onError={handleImgError}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${catColor} opacity-20`} />
        )}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-all duration-500 group-hover:from-black/98 group-hover:via-black/55" />

      {/* Orange glow border on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1.5px rgba(249,115,22,0.6), 0 0 40px rgba(249,115,22,0.15)",
        }}
      />

      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ease-out group-hover:w-full" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-7">
        {/* Category tag */}
        <div className="mb-3 flex items-center gap-2 transition-transform duration-400 ease-out group-hover:-translate-y-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${catColor}`}
          >
            {Icon && <Icon className="h-3 w-3" />}
            {event.category}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
            {event.year}
          </span>
        </div>

        <h3
          className="font-[family-name:var(--font-poppins)] text-3xl font-black tracking-tighter leading-[1.1] text-white transition-transform duration-400 ease-out group-hover:-translate-y-2 drop-shadow-xl"
        >
          {event.title}
        </h3>

        {/* Description — fades in on hover */}
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400 opacity-0 transition-all duration-400 ease-out group-hover:-translate-y-1 group-hover:opacity-100">
          {event.description}
        </p>

        {/* CTA button — appears on hover */}
        <div className="mt-4 opacity-0 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 translate-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-400 backdrop-blur-sm transition-all duration-200 hover:bg-orange-500/25">
            Explore Event
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = activeFilter === "All" 
    ? EVENTS 
    : EVENTS.filter(e => e.category === activeFilter);

  return (
    <section id="events" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.06), transparent 65%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-20 text-center">
          <span className="eyebrow mb-8 inline-block italic">Our Events</span>
          <WordReveal className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Stories we&apos;ve written
          </WordReveal>
          <p className="mx-auto mt-6 max-w-xl text-zinc-500 font-medium">
            {filteredEvents.length} extraordinary events. Hundreds of unforgettable moments. Each one a chapter in the Evox story.
          </p>
        </div>

        {/* Filter tags */}
        <ScrollReveal delay={0.1} className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {["All", "Sports Event", "Leisure", "Adventure", "Club Party", "Tech", "Festival"].map((filter) => (
            <motion.span
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                activeFilter === filter
                  ? "border-orange-500 bg-orange-500/20 text-orange-400"
                  : "border-white/10 bg-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
              }`}
            >
              {filter}
            </motion.span>
          ))}
        </ScrollReveal>

        {/* Masonry-style grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

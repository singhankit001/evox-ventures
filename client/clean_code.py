import os
import re

replacements = {
    "src/app/about/page.jsx": [
        ("Trophy, ", ""), ("Users, ", ""), ("ArrowRight, ", ""), ("Zap, ", "")
    ],
    "src/app/api/concierge/route.js": [
        ("const BASE_PRICING = {\n  STANDARD: 50000,\n  PREMIUM: 150000,\n  ENTERPRISE: 500000\n};\n", "")
    ],
    "src/app/portfolio/page.jsx": [
        ("motion, ", "")
    ],
    "src/app/quotation/page.jsx": [
        ("useEffect, ", ""), 
        ("AnimatePresence, ", ""),
        ("ArrowRight, Check, ChevronRight, LayoutGrid, Users, MapPin, Calculator, Clock, Crown", ""),
        # Also let's clean up empty import braces if created
        ("import {  } from 'lucide-react';", ""),
        ("import {  } from 'framer-motion';", "")
    ],
    "src/components/home/EventsShowcase.jsx": [
        ("import ScrollReveal from \"@/components/ui/ScrollReveal\";\n", "")
    ],
    "src/components/home/EvoxJourney.jsx": [
        (" useTransform,", "")
    ],
    "src/components/home/Hero.jsx": [
        (" Zap,", ""), (" Globe", ""), ("Globe,", ""),
        ("const frontXNeg = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);\n", ""),
        ("const frontYNeg = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);\n", "")
    ],
    "src/components/home/ServicesSection.jsx": [
        ("import ScrollReveal from \"@/components/ui/ScrollReveal\";\n", "")
    ],
    "src/components/home/StatsSection.jsx": [
        ("import ScrollReveal from \"@/components/ui/ScrollReveal\";\n", "")
    ],
    "src/components/home/TechHackathon.jsx": [
        (" Globe,", ""), (" Sparkles,", ""), (" Code2,", ""), (" TerminalIcon", ""),
        ("import { Card } from \"@/components/ui/Card\";\n", ""),
        ("import { WordReveal } from \"@/components/ui/LetterReveal\";\n", "")
    ],
    "src/components/home/TestimonialsCarousel.jsx": [
        (" Quote,", ""), (" User", "")
    ],
    "src/components/home/TrustedBy.jsx": [
        ("import ScrollReveal, { ScrollRevealStagger, itemReveal } from \"@/components/ui/ScrollReveal\";\n", "")
    ],
    "src/components/portfolio/EventGrid.jsx": [
        (", ScrollRevealStagger", "")
    ],
    "src/components/portfolio/HackathonShowcase.jsx": [
        (", useMemo", ""),
        ("const CODE_LINES = [\n  \"import { executeProject } from '@evox/core';\",\n  \"await executeProject({ load: 'massive' });\",\n  \"System.deploy(0-downtime, maximum-impact);\",\n  \"status: 'optimal'\"\n];\n", "")
    ],
    "src/components/portfolio/PortfolioHero.jsx": [
        ("import { ChevronDown } from \"lucide-react\";\n", "")
    ],
    "src/components/portfolio/ProjectStories.jsx": [
        ("useSpring, ", ""), ("useState, ", ""), ("import Link from \"next/link\";\n", "")
    ],
    "src/components/ui/Chatbot.jsx": [
        ("MessageCircle, ", ""), ("CheckCircle2, ", "")
    ],
    "src/components/ui/ContactForm.jsx": [
        ("import { Send } from \"lucide-react\";\n", "")
    ]
}

def clean_code():
    for rel_path, reps in replacements.items():
        filepath = os.path.join(os.getcwd(), rel_path)
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r") as f:
            content = f.read()
        
        for old, new in reps:
            content = content.replace(old, new)
            
        # Clean up double commas or empty objects
        content = content.replace("{ ,", "{")
        content = content.replace(", ,", ",")
        content = content.replace(", }", "}")
        content = content.replace("import { } from", "// import { } from")
        
        with open(filepath, "w") as f:
            f.write(content)

if __name__ == "__main__":
    clean_code()
    print("Code cleanup complete.")

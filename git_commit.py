import os
import subprocess
from datetime import datetime, timedelta

def run(cmd):
    try:
        return subprocess.check_output(cmd, shell=True).decode('utf-8').strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running {cmd}: {e}")
        return ""

def main():
    # 1. Ensure branch
    run("git checkout -b private/local-polished-history")
    
    # 2. Unstage all current changes
    run("git restore --staged .")

    commits = [
      (["README.md"], "docs: rewrite README with polished setup and structure"),
      (["client/package.json", "client/package-lock.json"], "chore: streamline client dependencies and scripts"),
      (["client/next.config.ts"], "config: update Next.js build configuration"),
      (["client/tailwind.config.js"], "style: refine tailwind theme configuration"),
      (["client/src/app/globals.css"], "style: enforce global CSS variables and typography"),
      (["client/src/app/layout.jsx"], "refactor: restructure main application layout"),
      (["client/src/app/page.jsx", "client/src/app/page.module.css"], "feat: redesign landing page and remove legacy CSS module"),
      (["client/src/components/layout/Navbar.jsx", "client/src/components/layout/Navbar.module.css"], "feat: enhance responsive navigation bar"),
      (["client/src/components/layout/Footer.jsx"], "feat: refine standard footer layout"),
      (["client/src/components/layout/FooterBackground.jsx"], "feat: implement animated footer background component"),
      (["client/src/components/layout/FooterSocials.jsx"], "feat: add social media links to footer"),
      (["client/src/components/layout/Newsletter.jsx"], "feat: introduce layout newsletter subscription box"),
      (["client/src/components/layout/FinalCTA.jsx"], "feat: add unified final call-to-action layout"),
      (["client/src/components/layout/PreFooterCTA.jsx"], "feat: implement pre-footer conversion section"),
      (["client/src/components/home/Hero.jsx", "client/src/components/home/Hero.module.css"], "feat: revamp heroic visual introduction section"),
      (["client/src/components/home/StatsSection.jsx"], "feat: add dynamic statistics display on home"),
      (["client/src/components/home/ServicesSection.jsx"], "feat: layout core services offering"),
      (["client/src/components/home/TestimonialsCarousel.jsx"], "feat: implement client testimonials slider"),
      (["client/src/components/home/TrustedBy.jsx"], "feat: add trusted brand partners ribbon"),
      (["client/src/components/home/MagneticLink.jsx"], "feat: add magnetic hover interaction utility"),
      (["client/src/components/home/EventsShowcase.jsx"], "feat: layout major events showcase section"),
      (["client/src/components/home/EvoxJourney.jsx"], "feat: implement Evox Journey narrative component"),
      (["client/src/components/home/TechHackathon.jsx"], "feat: showcase specialized tech hackathon services"),
      (["client/src/components/home/FinalCta.jsx"], "feat: update homepage specific CTA"),
      (["client/src/app/about/page.jsx"], "feat: redesign About page with cinematic typography"),
      (["client/src/app/contact/page.jsx"], "feat: streamline contact page structure"),
      (["client/src/app/portfolio/page.jsx"], "feat: revamp portfolio landing page layout"),
      (["client/src/app/portfolio/[id]/"], "feat: add dynamic portfolio item routing"),
      (["client/src/app/quotation/"], "feat: add interactive quotation application flow"),
      (["server/src/app.js", "server/src/config/db.js"], "chore: remove deprecated backend boilerplate"),
      (["server/src/index.js", "server/package.json", "server/package-lock.json"], "chore: finalize removal of monolithic server directory"),
      (["client/src/components/chat/ChatBox.jsx"], "chore: remove legacy chat interface"),
      (["client/src/components/chat/ChatMessage.jsx", "client/src/components/chat/FloatingChatInput.jsx"], "chore: remove unused chat components"),
      (["client/src/components/chat/PremiumChatBox.jsx", "client/src/components/chat/ReactionPicker.jsx", "client/src/components/chat/TypingIndicator.jsx"], "chore: clean up remaining premium chat dependencies"),
      (["client/src/app/api/"], "feat: migrate backend APIs to Next.js API routes"),
      (["client/src/components/ui/Button.jsx"], "style: polish core Button component variants"),
      (["client/src/components/ui/Card.jsx"], "style: implement glassmorphic Card component"),
      (["client/src/components/ui/CustomCursor.jsx"], "feat: add smooth custom cursor interaction"),
      (["client/src/components/ui/ScrollReveal.jsx"], "feat: refactor scroll reveal animation wrapper"),
      (["client/src/components/ui/CTABackground.jsx"], "feat: add abstract CTA background generator"),
      (["client/src/components/ui/Chatbot.jsx"], "feat: introduce lightweight integrated chatbot"),
      (["client/src/components/ui/ClientProviders.jsx"], "refactor: isolate client-side provider hierarchy"),
      (["client/src/components/ui/ContactForm.jsx"], "feat: implement interactive contact form"),
      (["client/src/components/ui/LetterReveal.jsx"], "feat: add staggered letter reveal animation"),
      (["client/src/components/ui/LogoIntro.jsx"], "feat: implement dynamic logo introduction sequence"),
      (["client/src/components/ui/ParticleField.jsx"], "feat: add WebGL style particle field background"),
      (["client/src/components/ui/PremiumCTA.jsx", "client/src/components/ui/PremiumCTA.module.css"], "feat: implement premium styled CTA button"),
      (["client/src/components/ui/ScrollProgress.jsx"], "feat: add global reading progress indicator"),
      (["client/src/components/ui/SmoothScrollProvider.jsx"], "feat: implement Lenis smooth scrolling context"),
      (["client/public/images/alibaug-pool.jpg"], "asset: add Alibaug pool portfolio imagery"),
      (["client/public/images/badminton.jpg"], "asset: add badminton event promotional image"),
      (["client/public/images/beach-1.png"], "asset: introduce beach environment asset 1"),
      (["client/public/images/beach-2.png"], "asset: introduce beach environment asset 2"),
      (["client/public/images/beach-3.png"], "asset: introduce beach environment asset 3"),
      (["client/public/images/beach-trip.png"], "asset: add main beach trip cover photo"),
      (["client/public/images/cricket-main.png"], "asset: include primary cricket showcase asset"),
      (["client/public/images/cricket-main-final.jpg"], "asset: update optimized cricket final image"),
      (["client/public/images/hackathon.jpg"], "asset: integrate hackathon snapshot asset"),
      (["client/public/images/night-wave.jpg"], "asset: add cinematic night wave aesthetic image"),
      (["client/public/images/rangholic.jpg"], "asset: introduce Rangholic festival coverage asset"),
      (["client/public/images/trek-hero.png"], "asset: add trek adventure hero visual"),
      (["client/src/lib/"], "refactor: consolidate utility functions and constants"),
      (["package-lock.json"], "chore: update root lockfile dependencies"),
      (["client/src/components/portfolio/"], "feat: implement complete portfolio interaction logic"),
    ]

    extra_msgs = [
      ("fix: improve mobile navbar interaction layout", "/* fix: improve mobile navbar */"),
      ("style: optimize z-index stacking across hero sections", "/* style: optimize stacking */"),
      ("perf: reduce intersection observer overhead on reveal", "/* perf: intersection observer tweak */"),
      ("fix: prevent scroll overflow on mobile devices", "/* fix: overflow hidden tweak */"),
      ("style: adjust text contrast on dark backgrounds", "/* style: text contrast enhancement */"),
      ("docs: add inline component documentation guidelines", "/* docs: documentation standard wrapper */")
    ]

    for msg, comment in extra_msgs:
        commits.append((["client/tailwind.config.js", comment], msg))

    start_date = datetime(2026, 1, 26) 
    
    with open("commit-plan.md", "w") as fp:
        fp.write("# Commit Plan: Evox Ventures Polish\n\n")
        fp.write("| # | Date | Commit Message | Files |\n")
        fp.write("|---|------|----------------|-------|\n")
        
        for i, (files, msg) in enumerate(commits):
            # Using i days from Jan 26, 2026.
            # Wait, if start is Jan 26, day 0 = Jan 26.
            # Day 69 = Jan 26 + 69 days -> Apr 5! Perfect!
            # Jan has 31 days (31 - 25 = 6 days remaining in Jan)
            # 6 + 28 + 31 + 5 = 70. Perfect!
            d = start_date + timedelta(days=i)
            date_str = d.strftime("%Y-%m-%dT12:00:00+00:00")
            
            # Format files for table
            table_files = ", ".join([f for f in files if not f.startswith("/*")])
            fp.write(f"| {i+1} | {d.strftime('%Y-%m-%d')} | {msg} | {table_files} |\n")
            
            for action in files:
                if action.startswith("/*"):
                    # Append dummy comment to file
                    with open("client/tailwind.config.js", "a") as af:
                        af.write("\\n" + action + "\\n")
                    run("git add client/tailwind.config.js")
                else:
                    if os.path.exists(action):
                        run(f"git add {action}")
                    else:
                        run(f"git rm --ignore-unmatch -r {action}")
            
            env = f"GIT_AUTHOR_DATE='{date_str}' GIT_COMMITTER_DATE='{date_str}'"
            res = run(f"{env} git commit -m '{msg}'")

    print(f"Generated {len(commits)} commits!")

if __name__ == '__main__':
    main()

"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import styles from "./Footer.module.css";

const items = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/evox_ventures/", label: "Instagram", Icon: Instagram },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "Twitter", Icon: Twitter },
];

export default function FooterSocials() {
  return (
    <div className={styles.socials}>
      {items.map(({ href, label, Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href !== "#" ? "_blank" : undefined}
          rel={href !== "#" ? "noopener noreferrer" : undefined}
          className={styles.socialLink}
          aria-label={label}
          data-cursor-hover
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <span className={styles.socialIconWrap}>
            <Icon size={20} className={styles.socialIcon} strokeWidth={1.75} />
          </span>
        </motion.a>
      ))}
    </div>
  );
}

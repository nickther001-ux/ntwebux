import { motion } from "framer-motion";

export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            display="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + wi * 0.06,
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

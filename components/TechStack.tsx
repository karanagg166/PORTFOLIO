"use client";
import { stack } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";

export function TechStack() {
  // Remove duplicates and organize tech stack
  const uniqueStack = Array.from(new Set(stack));

  return (
    <div className="flex flex-col justify-center items-center py-20 px-4" id="tech">
      <h1 className="heading text-center mb-10">
        My <span className="text-purple">Tech Stack</span>
      </h1>
      <p className="text-white-200 text-center mb-16 max-w-2xl px-4">
        A curated list of technologies and tools I use to build scalable and efficient applications.
      </p>

      {/* Small Squares Grid */}
      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 md:gap-4">
          {uniqueStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
              className="group relative aspect-square"
            >
              {/* Square Container */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-purple/20 to-blue-500/20 backdrop-blur-sm border-2 border-purple/30 group-hover:border-purple group-hover:shadow-xl group-hover:shadow-purple/50 transition-all duration-300">
                
                {/* Tech Logo - Full Fill */}
                <div className="absolute inset-0">
                  <Image
                    src={tech}
                    alt="tech"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


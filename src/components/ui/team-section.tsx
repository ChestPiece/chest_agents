"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandGithub,
} from "@tabler/icons-react";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "Former AI research lead with 15+ years in machine learning and AI agent development.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Jamie Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "AI systems architect specializing in large language models and autonomous agent frameworks.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Devon Taylor",
      role: "Head of AI Research",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      bio: "PhD in Computer Science with expertise in reinforcement learning and agent-based systems.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      name: "Riley Johnson",
      role: "UX Director",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      bio: "Specializes in creating intuitive interfaces for human-AI interaction and collaboration.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
  ];

  return (
    <div className="w-full py-16 bg-white dark:bg-black transition-colors">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
            Our team of AI specialists and engineers is dedicated to creating
            intelligent agents that transform how businesses interact with
            technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group relative"
            >
              <div className="h-64 relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <a
                      href={member.socials.twitter}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <IconBrandTwitter className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <IconBrandLinkedin className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={member.socials.github}
                      className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                    >
                      <IconBrandGithub className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-1 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-primary dark:text-primary mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  {member.bio}
                </p>
              </div>
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-[oklch(0.65_0.24_30)] transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Image from "next/image";

import demoChatScreen from "../../public/chat-screen.jpg";
import coinGecoBg from "../../public/coingeco.png";
import debridgeBg from "../../public/debridge.png";
import alloraBg from "../../public/allora.svg";
import Link from "next/link";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const backgroundVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const particleVariants = {
    initial: {
      opacity: 0,
      scale: 1,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    },
    animate: {
      opacity: [0.1, 0.3, 0.1],
      scale: 1.5,
      x: 0,
      y: 0,
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "No need for Centralized Exchanges",
      description: "Trade directly and securely without intermediaries",
      color: "text-cyan-400",
    },
    {
      icon: Shield,
      title: "AI-powered insights for smarter trades",
      description: "Leverage advanced AI analytics for better decision-making",
      color: "text-green-400",
    },
    {
      icon: Globe,
      title: "One-click execution from chat",
      description: "Simplify your trading with intuitive AI-powered interface",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      title: "Low fees & seamless cross-chain transactions",
      description:
        "Minimize costs and maximize efficiency across blockchain networks",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0A0F1E] via-[#263b42] to-[#0A0F1E] min-h-screen overflow-hidden relative">
      <motion.div
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden"
      >
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            className="absolute bg-cyan-400 rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 8}px`,
              height: `${Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        className="bg-cyan-500 w-full text-[#0A0F1E] text-center p-4 my-7 shadow-lg"
      >
        <motion.h3
          initial={{ scale: 0.8 }}
          animate={{
            scale: [0.8, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: 3,
            repeatType: "reverse",
          }}
          className="flex items-center justify-center gap-2"
        >
          <span className="animate-pulse">🚨</span>
          The app is still in testing and real funds should not be used
          <span className="animate-pulse">🚨</span>
        </motion.h3>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16 text-white">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
          }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ letterSpacing: -10, opacity: 0 }}
            animate={{
              letterSpacing: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                type: "spring",
              },
            }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            Swap, Bridge & Automate with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.5,
                type: "spring",
              },
            }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Bridge and swap seamlessly across chains, and automate DeFi actions
            — all powered by AI.
          </motion.p>

          <div className="flex justify-center space-x-4">
            {["Launch App"].map((buttonText, index) => (
              <Link href={index == 0 ? `/chat/${Date.now().toString()}` : "/"} key={buttonText}>
                <motion.button
                  key={buttonText}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.6 + index * 0.2,
                      type: "spring",
                      stiffness: 300,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                  ${
                    index === 0
                      ? "bg-cyan-500 text-black"
                      : "border-2 border-cyan-400 text-cyan-400"
                  }
                  font-bold py-3 px-6 hover:text-black rounded-lg hover:bg-cyan-400 
                  transition-colors flex items-center gap-2 group
                `}
                >
                  {buttonText}
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -30 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
              type: "spring",
              stiffness: 100,
            },
          }}
          className="mb-16 group perspective-1000"
        >
          <Image
            className="mx-auto max-w-4xl rounded-2xl w-4/5 shadow-2xl 
              group-hover:scale-[1.02] transition-transform 
              duration-300 ease-in-out"
            src={demoChatScreen}
            alt="chat screen demo"
            priority
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { type: "spring" },
            }}
            className="text-center mt-4 opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <p className="text-sm italic">AI-Powered Trading Interface</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
            },
          }}
          className="text-white text-center p-4 mb-16"
        >
          <h3 className="mb-6 text-xl font-semibold text-gray-300">
            Integrated with
          </h3>
          <div className="flex justify-center items-center gap-10">
            {[
              { logo: alloraBg, name: "ALLORA NETWORK" },
              { logo: debridgeBg, name: "DEBRIDGE" },
              { logo: coinGecoBg, name: "COINGECKO" },
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.2,
                    type: "spring",
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring" },
                }}
                className="flex gap-3 items-center group"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-12 group-hover:rotate-6 transition-transform"
                />
                <h3 className="font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { type: "spring" },
          }}
          className="text-3xl md:text-5xl text-center font-bold mt-4 mb-10 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent leading-tight"
        >
          Why Choose Us?
        </motion.h1>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    delay: index * 0.12,
                  },
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring" },
                }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
                className={`
                  bg-[#1C2535] border mt-4 border-cyan-400/30 rounded-xl 
                  p-6 flex items-center space-x-6 
                  hover:bg-[#273040] transition-all group relative
                  overflow-hidden cursor-pointer
                `}
              >
                {activeFeature === index && (
                  <motion.div
                    layoutId="feature-hover"
                    className="absolute inset-0 bg-cyan-500/10 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <div className="relative z-10 flex-shrink-0">
                  <IconComponent
                    className={`w-12 h-12 ${feature.color} 
                      group-hover:scale-110 transition-transform`}
                  />
                </div>
                <div className="relative z-10">
                  <h3
                    className={`
                    text-xl font-bold mb-2 
                    ${feature.color} group-hover:text-white 
                    transition-colors
                  `}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 100,
            },
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-12 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                "linear-gradient(to right, #06b6d4, #3b82f6)",
                "linear-gradient(to right, #3b82f6, #06b6d4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { type: "spring" },
              }}
              className="text-4xl font-bold mb-4"
            >
              Start Trading & Automating with AI Now!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  delay: 0.2,
                },
              }}
              className="text-xl mb-6 text-white/90"
            >
              Unlock the power of AI-driven DeFi actions
            </motion.p>
            <div className="flex justify-center space-x-4">
              <Link href={`/chat/${Date.now().toString()}`}>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2"
                >
                  Launch App
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              {/* <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                Connect Wallet
                <ChevronRight className="w-5 h-5" />
              </motion.button> */}
            </div>
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
}

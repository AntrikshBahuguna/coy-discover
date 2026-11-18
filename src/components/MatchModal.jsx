
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";

export default function MatchModal({ profile, onClose }) {

  return (

    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5"
      >

        <motion.div
          initial={{ scale: 0.7, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.7, y: 50 }}

          className="relative max-w-sm w-full bg-[#20202d] border border-purple-400/30 rounded-3xl p-8 text-center shadow-2xl"
        >

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>

          <Sparkles
            className="mx-auto text-purple-400 mb-4"
            size={38}
          />

          <h2 className="text-4xl font-extrabold text-purple-300">
            It's a Match!
          </h2>

          <p className="text-gray-400 mt-3">
            You both liked each other.
          </p>

          <div className="mt-7 flex justify-center">

            <img
              src={profile.photo}
              alt={profile.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-purple-500 shadow-xl"
            />

          </div>

          <h3 className="text-2xl font-bold mt-5">
            {profile.name}
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Looks like you have something in common!
          </p>

          <div className="mt-8">

            <button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >

              <Heart size={18} fill="white" />

              Continue Discovering

            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );
}

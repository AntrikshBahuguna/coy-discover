
"use client";

import { motion } from "framer-motion";
import { MapPin, Heart, X } from "lucide-react";

export default function ProfileCard({
  profile,
  onSwipe,
  disabled
}) {

  return (

    <motion.div
      key={profile.id}
      drag={disabled ? false : "x"}

      dragConstraints={{
        left: 0,
        right: 0
      }}

      dragElastic={0.8}

      onDragEnd={(event, info) => {

        if (info.offset.x > 120) {
          onSwipe("LIKE");
        }

        else if (info.offset.x < -120) {
          onSwipe("PASS");
        }

      }}

      whileDrag={{
        scale: 1.03,
        rotate: 4
      }}

      className="relative w-full h-[530px] rounded-3xl overflow-hidden bg-[#ffe2ee] border border-[#d9d2e1] shadow-xl cursor-grab active:cursor-grabbing select-none"

    >

      {/* Profile photo */}

      <img
        src={profile.photo}
        alt={profile.name}
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Profile information */}

      <div className="absolute bottom-0 p-6 w-full">

        <h2 className="text-3xl font-bold text-white">
         {profile.name}, {profile.age}
        </h2>

        <div className="flex items-center gap-2 text-gray-300 mt-2">

          <MapPin size={16} />

          <span className="text-sm">
            {profile.city}
          </span>

        </div>

        <p className="text-gray-200 mt-4 text-sm leading-relaxed">
          {profile.bio}
        </p>

        {/* Interests */}

        <div className="flex flex-wrap gap-2 mt-5">

          {profile.interests.map((interest, index) => (

            <span
              key={index}
              className="bg-[#ff3482]/90 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-xs text-white"
            >
              {interest}
            </span>

          ))}

        </div>

        <p className="text-gray-400 text-xs mt-5">
          Swipe right to like · Swipe left to pass
        </p>

      </div>

    </motion.div>

  );
}

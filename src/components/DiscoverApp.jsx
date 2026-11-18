
"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  X,
  Home,
  Compass,
  Users,
  Sparkles,
  Loader2
} from "lucide-react";

import ProfileCard from "./ProfileCard";
import MatchModal from "./MatchModal";

export default function DiscoverApp() {

  const [activeTab, setActiveTab] = useState("discover");

  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);

  const [error, setError] = useState("");

  const [newMatch, setNewMatch] = useState(null);

  // Fetch available profiles
  async function fetchFeed() {

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/feed", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Unable to load profiles");
      }

      const data = await response.json();

      setProfiles(data.profiles || []);

    } catch (error) {

      console.error(error);
      setError("Unable to load profiles. Please try again.");

    } finally {

      setLoading(false);

    }
  }

  // Fetch mutual matches
  async function fetchMatches() {

    try {

      const response = await fetch("/matches", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Unable to load matches");
      }

      const data = await response.json();

      setMatches(data.matches || []);

    } catch (error) {

      console.error(error);
      setError("Unable to load matches.");

    }
  }

  // Load feed when application opens
  useEffect(() => {
    fetchFeed();
  }, []);

  // Handle like and pass
  async function handleSwipe(direction) {

    const currentProfile = profiles[0];

    if (!currentProfile || swiping) return;

    setSwiping(true);
    setError("");

    try {

      const response = await fetch("/swipe", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          profileId: currentProfile.id,
          direction
        })

      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Swipe failed");
      }

      // Remove the swiped profile
      setProfiles(previous =>
        previous.filter(
          profile => profile.id !== currentProfile.id
        )
      );

      // Show match popup if mutual interest exists
      if (data.isMatch) {

        setNewMatch(data.match);

        fetchMatches();

      }

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setSwiping(false);

    }
  }

  function changeTab(tab) {

    setActiveTab(tab);
    setError("");

    if (tab === "matches") {
      fetchMatches();
    }
  }

  const currentProfile = profiles[0];

  return (

    <main className="min-hmin-h-screen bg-white text-[#17131f]">

      {/* Header */}

      <header className="flex items-center justify-between px-6 py-5 border-b border-[#d9d2e1] bg-white">

        <div className="flex items-center gap-2">

          <div className="bg-[#ff3482] p-2 rounded-xl">
            <Heart size={22} fill="white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              coy<span className="text-	text-[#ff3482]"></span>
            </h1>

            <p className="text-xs text-gray-400">
              Discover connections
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-sm text-[#ff3482]">
          <Sparkles size={16} />
          Discover
        </div>

      </header>

      {/* Main content */}

      <section className="max-w-md mx-auto px-5 pt-8 pb-36">

        {activeTab === "home" && (
          <div className="min-h-[65vh]" />
        )}

        {activeTab === "discover" && (

          <>

            <div className="mb-6">

              <p className="text-[#ff3482] medium">
                YOUR NEXT CONNECTION
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Discover
              </h2>

              <p className="text-text-[#77717f] mt-2">
                Find people who share your interests.
              </p>

            </div>

            {loading ? (

              <div className="flex justify-center py-24">
                <Loader2 className="animate-spin" size={35} />
              </div>

            ) : error ? (

              <div className="text-center py-20">

                <p className="text-red-400">{error}</p>

                <button
                  onClick={fetchFeed}
                  className="mt-4	bg-[#ff3482] text-white px-5 py-2 rounded-xl"
                >
                  Retry
                </button>

              </div>

            ) : currentProfile ? (

              <>

                <ProfileCard
                  profile={currentProfile}
                  onSwipe={handleSwipe}
                  disabled={swiping}
                />

                <div className="flex justify-center gap-8 mt-7">

                  <button
                    disabled={swiping}
                    onClick={() => handleSwipe("PASS")}
                    className="h-16 w-16 rounded-full bg-white border border-[#d9d2e1] flex items-center justify-center text-[#77717f] hover:bg-[#ffe2ee] disabled:opacity-50 shadow-sm"
                  >
                    <X size={30} />
                  </button>

                  <button
                    disabled={swiping}
                    onClick={() => handleSwipe("LIKE")}
                    className="h-16 w-16 rounded-full bg-[#ff3482] flex items-center justify-center text-white shadow-lg hover:bg-[#ec246f] disabled:opacity-50"
                  >
                    {swiping ? (
                      <Loader2 className="animate-spin" size={27} />
                    ) : (
                      <Heart size={27} fill="white" />
                    )}
                  </button>

                </div>

              </>

            ) : (

              <div className="text-center py-24">

                <div className="flex justify-center mb-5">
                  <Heart size={55} className="text-purple-400" />
                </div>

                <h3 className="text-2xl font-bold">
                  You're all caught up!
                </h3>

                <p className="text-gray-400 mt-3">
                  There are no more profiles to discover.
                </p>

              </div>

            )}

          </>

        )}

        {activeTab === "matches" && (

          <>

            <h2 className="text-3xl font-bold mb-2">
              Your Matches
            </h2>

            <p className="text-gray-400 text-sm mb-7">
              People who liked you back.
            </p>

            {matches.length === 0 ? (

              <div className="text-center py-24">
                <Heart
                  size={50}
                  className="mx-auto text-purple-400 mb-5"
                />

                <h3 className="text-xl font-semibold">
                  No matches yet
                </h3>

                <p className="text-gray-400 mt-2">
                  Keep discovering to find your connection.
                </p>
              </div>

            ) : (

              <div className="space-y-4">

                {matches.map(match => {

                  const profile = match.profile;

                  return (

                    <div
                      key={match.matchId}
                      className="flex items-center gap-4 bg-[#f7f5fa] border border-[#d9d2e1]rounded-2xl p-3"
                    >

                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {profile.name}, {profile.age}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {profile.city}
                        </p>
                      </div>

                      <div className="ml-auto text-purple-400">
                        <Heart fill="currentColor" size={21} />
                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </>

        )}

      </section>

      {/* Bottom Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#d9d2e1]">

        <div className="max-w-md mx-auto flex justify-around py-4">

          <button
            onClick={() => changeTab("home")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home"
                ? "text-purple-400"
                : "text-[#77717f]"
            }`}
          >
            <Home size={22} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => changeTab("discover")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "discover"
                ? "text-purple-400"
                : "text-gray-500"
            }`}
          >
            <Compass size={22} />
            <span className="text-xs">Discover</span>
          </button>

          <button
            onClick={() => changeTab("matches")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "matches"
                ? "text-purple-400"
                : "text-gray-500"
            }`}
          >
            <Users size={22} />
            <span className="text-xs">Matches</span>
          </button>

        </div>

      </nav>

      {/* Match celebration */}

      {newMatch && (

        <MatchModal
          profile={newMatch}
          onClose={() => setNewMatch(null)}
        />

      )}

    </main>

  );
}

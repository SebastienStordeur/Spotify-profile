"use client";
import Main from "@/components/Layout/Main/Main";
import SidePanel from "@/components/Layout/SidePanel/SidePanel";
import axios from "axios";
import { NextPage } from "next";
import React, { Suspense, useEffect, useState } from "react";

const TopTracksPage: NextPage = () => {
  const token = localStorage.getItem("token");
  const [tracks, setTracks] = useState<any>();

  useEffect(() => {
    axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      console.log(res.data);
      setTracks(res.data.items);
    });
  }, []);
  return (
    <Main>
      <SidePanel />
      <section className="md:ml-24 px-8 md:px-14 bg-background w-full min-h-full py-8 md:py-14">
        <h1 className="text-white text-2xl font-semibold">Find all your most listened tracks</h1>
        <div className="grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4 py-16">
          {tracks && (
            <Suspense fallback={<h2>Loading data</h2>}>
              {tracks.map((track: any) => {
                console.log(track);
                const { genres, artists, name, href, duration_ms } = track;
                return (
                  <div className="h-20 w-20">
                    {name}
                    {artists[0].name}
                    {/* <img src={images[0].url} alt="" /> */}
                  </div>
                );
              })}
            </Suspense>
          )}
        </div>
      </section>
    </Main>
  );
};

export default TopTracksPage;
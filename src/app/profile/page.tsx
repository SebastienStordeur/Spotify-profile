"use client";
import React, { useEffect, useState, Suspense, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { NextPage } from "next";
import { AuthContext } from "@/store/AuthContext";
import SidePanel from "@/components/Layout/SidePanel/SidePanel";
import ProfilePicture from "@/components/Profile/ProfilePicture";
import FavoritesSongs from "@/components/Profile/Favorites/FavoritesSongs";
import MostListenedGenre from "@/components/Profile/Favorites/MostListenedGenre";
import { FormatData } from "@/utils/FormatDataGenres/FormatData";

const ProfilePage: NextPage = () => {
  const [profile, setProfile] = useState<any>({});
  const [artists, setArtists] = useState<any>([]);
  const token = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);

  const getCurrentUser = async () => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    authCtx.checkTokenValidity();
    getCurrentUser();
    axios
      .get(`https://api.spotify.com/v1/me/top/artists?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setArtists(res.data.items))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    FormatData(artists);
  }, [artists]);

  return (
    <div className="flex">
      <SidePanel />
      <main className="px-10 bg-background w-full h-screen py-14">
        <Suspense fallback={<h1>Loading data</h1>}>
          {profile && (
            <div className="flex flex-col items-center">
              <ProfilePicture />
              <div>
                <h1>{profile.display_name}</h1>
                {profile.uri && <Link href={profile.uri}>Link to his Spotify profile</Link>}
              </div>
            </div>
          )}
          {artists && <FavoritesSongs data={artists} />}
          <MostListenedGenre />
        </Suspense>
      </main>
    </div>
  );
};

export default ProfilePage;

/*  */

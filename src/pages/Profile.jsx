import React, { useEffect } from "react";
import Button from "../components/Button";
// import MuxPlayer from "@mux/mux-player-react";
import { Award, Crown, History, Sparkle, Sprout, Star } from "lucide-react";
import { Config } from "../components/config";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Toast from "../components/Toast";
// import { useAuth } from "../hooks/useAuth";

function Profile() {
  const [edit, setEdit] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const imgRef = React.useRef(null);
  const [user, setUser] = React.useState({});
  const { getUserId } = useAuth();
  const [userId, setUserId] = React.useState(getUserId());
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [year, setYear] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  const [studyHours, setStudyHours] = React.useState(0);
  const [progress, setProgress] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);
  const [badges, setBadges] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [userImg, setUserImg] = React.useState({});
  const { logout } = useAuth();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const fetchUser = async (id) => {
    try {
      const result = await axios.get(Config.API_URL + "/user/" + id, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (result.status === 200) {
        setUser(result.data);
        setFirstName(result.data.firstname);
        setLastName(result.data.lastname);
        setEmail(result.data.email);
        setYear(result.data.year);
        setScore(result.data.score);
        setLevel(result.data.level);
        setStudyHours(result.data.study_hours);
        setAchievements(result.data.achievements);
        console.log(result.data.achievements);

        for (let i = 0; i < result.data.achievements.length; i++) {
          const badge = await axios.get(
            Config.API_URL +
              "/achievement/get_achievement/" +
              result.data.achievements[i],
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          if (badge.data) {
            // const arr = [...badges];
            // arr.push(badge.data);
            // setBadges(arr);
            setBadges((prev) => [...prev, badge.data]);
          }
        }
      }

      await fetchUserProgress(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserImg = async (id) => {
    try {
      const result = await axios.get(Config.API_URL + "/user/avatar/" + id, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (result.status === 200) {
        console.log(result.data);
        setImg(`data:image/jpeg;base64,${result.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveImage = async (id) => {
    try {
      const form = new FormData();
      form.append("avatar", imgRef.current.files[0]);
      const result = await axios.put(
        Config.API_URL + "/user/update_avatar/" + id,
        form,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (result.status === 200) {
        Toast("Image saved", "success");
        fetchUser(id);
      } else {
        Toast("Error saving image", "error");
      }
    } catch (error) {
      console.log(error);
      Toast("Error saving image", "error");
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const form = new FormData();
      form.append("firstname", firstName);
      form.append("lastname", lastName);
      form.append("email", email);
      form.append("year", parseInt(year));

      const result = await axios.put(
        Config.API_URL + "/user/update_user/" + id,
        form,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (result.status === 200) {
        fetchUser(id);
        Toast("Profile updated", "success");
      } else {
        Toast("Error updating profile", "error");
      }
    } catch (error) {
      console.log(error);
      Toast("Error updating profile", "error");
    }
  };

  const fetchUserProgress = async (id) => {
    try {
      const result = await axios.get(Config.API_URL + "/user/progress/" + id, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (result.status === 200) {
        setProgress(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserImages = async (users) => {
    const images = {};
    for (const user of users) {
      try {
        const response = await axios.get(
          `${Config.API_URL}/user/avatar/${user.id}`,
          {
            headers: {
              Authorization: Config.AUTH_TOKEN(),
            },
          },
        );
        images[user.id] = `data:image/jpeg;base64,${response.data}`; // Save base64 string
      } catch (error) {
        console.error("Error fetching image for user:", user.id, error);
      }
      // await delay(1000); // Delay to prevent rate limiting
    }
    setUserImg(images); // Set all image data once fetched
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + "/user/top/get_leaderboard",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setLeaderboard(response.data);
        await fetchUserImages(response.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(user);
    fetchUser(userId);
    fetchUserImg(userId);
    fetchLeaderboard();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="relative flex h-full w-full flex-col justify-center gap-2 px-4 py-8 md:flex-row md:py-12 md:pb-8 lg:pb-10">
      <div className="flex w-full max-w-fit flex-col rounded-md bg-secondary-color4/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-secondary-color4/60">
        <div className="flex rounded-md px-4 py-8">
          <div className="mr-4">
            <img
              src={img || "https://avatar.iran.liara.run/public/42"}
              alt="Avatar"
              className="h-24 w-24 transform rounded-full border-primary transition-transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-sm font-light text-accent-foreground md:text-base">
              Software Engineer
            </p>
            <span className="rounded-md bg-secondary-color4 p-2 text-xs text-accent-foreground">
              id: {user.id}
            </span>
            <Button
              label={"logout"}
              variant="gradient"
              onClick={() => logout()}
            />
          </div>
        </div>
        <div className="h-0 w-full border"></div>
        <form className="flex flex-col rounded-md px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
            PROFILE
          </h2>
          <div className="flex flex-col gap-2 space-y-2">
            <div className="flex flex-col">
              <span className="text-sm text-foreground">First name:</span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={firstName}
                // defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Last name: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Email: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Year: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <Button
                label="Update Profile"
                variant="gradient"
                onClick={() => handleUpdateUser(userId)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Avatar: </span>
              <input
                type="file"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                accept="image/*"
                ref={imgRef}
                onChange={(e) => setImg(e.target.files[0])}
              />
              <Button
                label="Save Image"
                variant="gradient"
                onClick={() => handleSaveImage(userId)}
              />
            </div>
          </div>
        </form>
        <div className="h-0 w-full border"></div>

        <div className="flex flex-col rounded-md px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
            RECENT ACTIVITIES
          </h2>
          <div
            id="display-activity"
            className="flex max-h-80 max-w-lg flex-col gap-2 space-y-2 overflow-y-scroll"
          >
            {progress.length > 0 ? (
              progress.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-2 rounded-md bg-secondary/60 p-2"
                >
                  <span className="text-sm text-foreground">
                    Course: {item.course_name}
                  </span>
                  <span className="text-sm text-foreground">
                    Topic: {item.video_name}
                  </span>
                  <span className="text-sm text-foreground">
                    Started at: {new Date(item.started_at).toLocaleString()}
                  </span>
                  <span className="text-sm text-foreground">
                    Ended at: {new Date(item.ended_at).toLocaleString()}
                  </span>
                  <span className="text-sm text-foreground">
                    Duration: {(item.duration / 3600).toFixed(2)} mins
                  </span>
                </div>
              ))
            ) : (
              <p>No recent activities</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md bg-secondary-color4/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-secondary-color4/60 sm:w-96">
        <div className="flex flex-col gap-2 rounded-md px-4 py-8">
          <div className="flex h-auto w-full flex-wrap gap-2 rounded-md bg-secondary/60 px-2 py-3">
            <div className="inline-flex items-center gap-2">
              <Star size={20} />
              <span>score:</span>
              <span className="flex items-center justify-center rounded-md bg-primary/20 px-2 py-1 text-primary">
                {score}
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Sprout size={20} />
              <span>level:</span>
              <span className="flex items-center justify-center rounded-md bg-secondary-color5/20 px-2 py-1 text-secondary-color5">
                {level}
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <History size={20} />
              <span className="">studytime: </span>
              <span className="flex items-center justify-center rounded-md bg-secondary-color3/20 px-2 py-1 text-secondary-color3">
                {studyHours.toFixed(2)}
              </span>
              <span>hrs</span>
            </div>
          </div>
          <div className="flex h-auto w-full flex-col rounded-md bg-secondary/60 px-2 py-3">
            <div className="mb-2 inline-flex items-center gap-2">
              <Award size={20} />
              <h2 className="text-xl text-foreground">Achievement</h2>
            </div>
            <ul className="flex list-inside list-disc flex-col">
              {badges &&
                badges.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <img
                      src={"data:image/jpeg;base64," + item.badge}
                      alt="Badge"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm text-foreground">
                      {item.title}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex h-auto w-full flex-col gap-2 rounded-md bg-secondary/60 px-2 py-3">
            <div className="mb-2 inline-flex items-center gap-2">
              <Crown size={20} />
              <h2 className="text-xl text-foreground">Leader Board</h2>
            </div>
            <div className="flex flex-col gap-2">
              {leaderboard.length > 0 ? (
                leaderboard.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md bg-secondary-color4/50 px-2 py-1"
                  >
                    <img
                      src={
                        userImg[item.id] ||
                        "https://avatar.iran.liara.run/public/42"
                      }
                      alt="Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm text-foreground">
                      {index + 1}. {item.firstname} {item.lastname}
                    </span>
                    <span className="flex items-center justify-center rounded-md bg-secondary-color4/40 px-2 py-1 text-secondary-color2">
                      {item.score}
                    </span>
                  </div>
                ))
              ) : (
                <p>No leaderboard</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;

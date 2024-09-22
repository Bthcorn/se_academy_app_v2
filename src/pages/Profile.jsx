import React from "react";
import Button from "../components/Button";
// import MuxPlayer from "@mux/mux-player-react";
import { Award, Crown, History, Sparkle, Sprout, Star } from "lucide-react";

function Profile() {
  const [edit, setEdit] = React.useState(false);
  const [img, setImg] = React.useState({});
  const imgRef = React.useRef(null);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSaveImage = async (params) => {
    const form = new FormData();
    form.append("email", "");
    const result = await fetch("https://api.iran.liara.run/login", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form,
    });

    if (result.status === 200) {
      const data = await result.json();
      localStorage.setItem("token", data.token);
    }
  };

  return (
    <section className="relative flex h-full w-full flex-col justify-center gap-2 px-4 py-8 md:flex-row md:py-12 md:pb-8 lg:pb-10">
      <div className="flex w-full max-w-fit flex-col rounded-md bg-secondary-color4/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-secondary-color4/60">
        <div className="flex rounded-md px-4 py-8">
          <div className="mr-4">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-24 w-24 transform rounded-full border-2 border-primary transition-transform hover:scale-110 hover:border-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
              John Doe
            </h2>
            <p className="text-sm font-light text-accent-foreground md:text-base">
              Software Engineer
            </p>
            <span className="rounded-md bg-secondary-color4 p-2 text-xs text-accent-foreground">
              id: 42
            </span>
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
                value={"John"}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Last name: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={"Doe"}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Email: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={"myemail@mail.com"}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Year: </span>
              <input
                type="text"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                value={"2021"}
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Avatar: </span>
              <input
                type="file"
                className="rounded-md bg-secondary-color4/50 p-2 text-sm text-foreground"
                accept="image/*"
              />
            </div>
            <div>
              <Button
                label="Update Profile"
                variant="gradient"
                onClick={handleEdit}
              />
            </div>
          </div>
        </form>
        <div className="h-0 w-full border"></div>

        <div className="flex flex-col rounded-md px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
            RECENT ACTIVITIES
          </h2>
          <div id="display-activity" className="flex flex-col gap-2 space-y-2">
            <div className="flex flex-wrap gap-2 rounded-md bg-secondary/60 p-2">
              <span className="text-sm text-foreground">Id: 1234</span>
              <span className="text-sm text-foreground">Course: React</span>
              <span className="text-sm text-foreground">Date: 2021-09-20</span>
              <span className="text-sm text-foreground">Time: 10:00</span>
              <span className="text-sm text-foreground">Duration: 1:00</span>
            </div>
            <div className="flex flex-wrap gap-2 rounded-md bg-secondary/60 p-2">
              <span className="text-sm text-foreground">Id: 1235</span>
              <span className="text-sm text-foreground">Course: React</span>
              <span className="text-sm text-foreground">Date: 2021-09-20</span>
              <span className="text-sm text-foreground">Time: 10:00</span>
              <span className="text-sm text-foreground">Duration: 1:00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md bg-secondary-color4/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-secondary-color4/60 sm:w-96">
        <div className="flex flex-col gap-2 rounded-md px-4 py-8">
          <div className="flex h-auto w-full flex-wrap gap-2 rounded-md bg-secondary/60 px-2 py-3">
            <div className="inline-flex items-center gap-2">
              <Star size={20} />
              <span>points:</span>
              <span className="flex items-center justify-center rounded-md px-2 py-1 bg-primary/20 text-primary">
                100
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Sprout size={20} />
              <span>level:</span>
              <span className="flex items-center justify-center rounded-md px-2 py-1 bg-secondary-color5/20 text-secondary-color5">
                3
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <History size={20} />
              <span className="">studytime: </span>
              <span className="flex items-center justify-center rounded-md px-2 py-1 bg-secondary-color3/20 text-secondary-color3">
                3
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
              <li className="flex items-center gap-2 py-2">
                <span className="text-sm text-foreground">
                  Completed React Course
                </span>
                <span className="flex items-center justify-center rounded-md px-2 py-1 bg-primary/20 text-primary">
                  +100
                </span>
              </li>
              <li className="flex items-center gap-2 py-2">
                <span className="text-sm text-foreground">
                  Completed React Course
                </span>
                <span className="flex items-center justify-center rounded-md px-2 py-1 bg-primary/20 text-primary">
                  +100
                </span>
              </li>
            </ul>
          </div>
          <div className="flex h-auto w-full flex-col gap-2 rounded-md bg-secondary/60 px-2 py-3">
            <div className="mb-2 inline-flex items-center gap-2">
              <Crown size={20} />
              <h2 className="text-xl text-foreground">Leader Board</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/42"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-foreground">1. John Doe</span>
                <span className="flex items-center justify-center rounded-md px-2 py-1 bg-secondary-color2/20 text-secondary-color2">
                  100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/42"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-foreground">2. John Doe</span>
                <span className="flex items-center justify-center rounded-md px-2 py-1 bg-secondary-color2/20 text-secondary-color2">
                  100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://avatar.iran.liara.run/public/42"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm text-foreground">3. John Doe</span>
                <span className="flex items-center justify-center rounded-md px-2 py-1 bg-secondary-color2/20 text-secondary-color2">
                  100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;

import { useEffect, useState } from "react"

function App() {
  const [discordData, setDiscordData] = useState<any>(null)
  const [steamData, setSteamData] = useState<any>(null)

  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/702057545925132371")
      .then((res) => res.json())
      .then((data) => setDiscordData(data.data))
  }, [])

  useEffect(() => {
    fetch("/api/steam")
      .then((res) => res.json())
      .then((data) => setSteamData(data))
      .catch((error) => console.log("Steam API Fehler:", error))
  }, [])

  const avatar = discordData
    ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
    : ""

  const discordBanner =
    discordData?.discord_user?.banner
      ? `https://cdn.discordapp.com/banners/${discordData.discord_user.id}/${discordData.discord_user.banner}.png?size=1024`
      : null

  const currentSteamGame =
    steamData?.profile?.gameextrainfo ||
    steamData?.recentGames?.[0]?.name ||
    steamData?.topGames?.[0]?.name

  const currentSteamAppId =
    steamData?.recentGames?.[0]?.appid || steamData?.topGames?.[0]?.appid


  const projects = [
    {
      title: "BeaconEffects Plugin",
      description:
        "Minecraft Plugin mit GUI, Beacon-Effekten, Speicherung und Party-System.",
      tags: ["Minecraft", "Java", "Paper"],
    },
    {
      title: "Pickaxe Plugin",
      description:
        "Custom Pickaxe mit 1x1, 2x2 und 3x3 Mining-System über GUI.",
      tags: ["Minecraft", "Java", "GUI"],
    },
    {
      title: "GTA RP Projekte",
      description:
        "Konzepte, Bewerbungen, Taxi-Systeme, Events und RP-Dokumente.",
      tags: ["GTA RP", "FiveM", "Roleplay"],
    },
  ]

  return (
    <div style={pageStyle}>
      <div className="animated-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav style={navbarStyle}>
        <a style={navLogoStyle} href="#">
          <span className="neon-logo" style={logoGlowStyle}>
            TFG
          </span>

          <span style={{ color: "#aaa", fontSize: "13px" }}>
            TheFutureGuy
          </span>
        </a>

        <div style={navLinksStyle}>
          {[
            { name: "Home", link: "#" },
            { name: "Projekte", link: "#projects" },
            {
              name: "Steam",
              link: "https://steamcommunity.com/profiles/76561199191385171/",
            },
            {
              name: "Discord",
              link: "https://discord.com/users/702057545925132371",
            },
            {
              name: "Twitch",
              link: "https://www.twitch.tv/thefutureguy2006/",
            },
          ].map((item) => (
            <a
              key={item.name}
              className="nav-link"
              style={navLinkStyle}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div style={navProfileStyle}>
          {discordData && (
            <>
              <div style={{ position: "relative" }}>
                <img src={avatar} alt="Avatar" style={navAvatarStyle} />

                <span
                  style={{
                    ...navStatusDotStyle,
                    background:
                      discordData.discord_status === "online"
                        ? "#43b581"
                        : discordData.discord_status === "idle"
                        ? "#faa61a"
                        : discordData.discord_status === "dnd"
                        ? "#f04747"
                        : "#777",
                  }}
                />
              </div>

              <span style={navStatusTextStyle}>
                {discordData.listening_to_spotify
                  ? `🎵 ${discordData.spotify.song}`
                  : discordData.discord_status === "online"
                  ? "🟢 Online"
                  : discordData.discord_status === "idle"
                  ? "🌙 Abwesend"
                  : discordData.discord_status === "dnd"
                  ? "⛔ DND"
                  : "⚫ Offline"}
              </span>
            </>
          )}
        </div>
      </nav>

      <section style={heroStyle}>
        <h1 style={titleStyle}>Elias "TheFutureGuy" Ivanov</h1>

        <p style={subtitleStyle}>
          Developer • Gamer • Minecraft Plugins • GTA RP
        </p>

        <p style={textStyle}>
          Willkommen auf meiner Portfolio-Webseite. Hier findest du meine
          Projekte, Gaming-Statistiken, Discord Presence, Spotify Aktivität und
          vieles mehr.
        </p>

        <div style={buttonRowStyle}>
          <a
            style={buttonStyle}
            href="https://steamcommunity.com/profiles/76561199191385171/"
            target="_blank"
          >
            Steam
          </a>

          <a
            style={buttonStyle}
            href="https://discord.com/users/702057545925132371"
            target="_blank"
          >
            Discord
          </a>

          <a
            style={buttonStyle}
            href="https://www.twitch.tv/thefutureguy2006/"
            target="_blank"
          >
            Twitch
          </a>

          <a style={buttonStyle} href="#projects">
            Projekte
          </a>
        </div>

        <div style={profileCardsRowStyle}>
          <div className="profile-card-hover" style={discordCardStyle}>
            {discordBanner && (
              <img
                src={discordBanner}
                alt="Discord Banner"
                style={discordBannerStyle}
              />
            )}

            {discordData ? (
              <>
                <img src={avatar} alt="Discord Avatar" style={avatarStyle} />

                <h2>{discordData.discord_user.username}</h2>

                <p
                  style={{
                    color:
                      discordData.discord_status === "online"
                        ? "#43b581"
                        : discordData.discord_status === "idle"
                        ? "#faa61a"
                        : discordData.discord_status === "dnd"
                        ? "#f04747"
                        : "#888",
                    fontWeight: "bold",
                  }}
                >
                  {discordData.discord_status === "online"
                    ? "ONLINE"
                    : discordData.discord_status === "idle"
                    ? "ABWESEND"
                    : discordData.discord_status === "dnd"
                    ? "BITTE NICHT STÖREN"
                    : "OFFLINE"}
                </p>

                {discordData.listening_to_spotify && (
                  <div style={{ marginTop: "15px" }}>
                    <p style={{ color: "#1DB954", fontWeight: "bold" }}>
                      Listening to Spotify 🎵
                    </p>

                    <p>{discordData.spotify.song}</p>

                    <p style={{ color: "#aaa", marginBottom: "15px" }}>
                      {discordData.spotify.artist}
                    </p>

                    <img
                      src={discordData.spotify.album_art_url}
                      alt="Album Cover"
                      style={albumCoverStyle}
                    />

                    <div className="spotify-visualizer">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <div style={progressBackgroundStyle}>
                      <div
                        style={{
                          width: `${
                            ((Date.now() -
                              discordData.spotify.timestamps.start) /
                              (discordData.spotify.timestamps.end -
                                discordData.spotify.timestamps.start)) *
                            100
                          }%`,
                          height: "100%",
                          background: "#1DB954",
                          borderRadius: "999px",
                          transition: "0.5s",
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>Lade Discord Daten...</p>
            )}
          </div>

          <div className="profile-card-hover" style={steamCardStyle}>

            <img
              src={steamData?.profile?.avatarfull || "/logo.png"}
              alt="Steam Avatar"
              style={avatarStyle}
            />

            <h2>{steamData?.profile?.personaname || "Steam Profil"}</h2>

            <p style={{ color: "#66c0f4", fontWeight: "bold" }}>
              {steamData?.profile?.gameextrainfo
                ? `Spielt gerade: ${steamData.profile.gameextrainfo}`
                : currentSteamGame
                ? `Game Highlight: ${currentSteamGame}`
                : "Momentan kein Spiel geöffnet"}
            </p>
<div
  style={{
    background: "linear-gradient(135deg, rgba(102,192,244,0.18), rgba(88,101,242,0.12))",
    border: "1px solid rgba(102,192,244,0.25)",
    borderRadius: "18px",
    padding: "16px",
    marginTop: "18px",
    marginBottom: "18px",
    boxShadow: "0 0 25px rgba(102,192,244,0.22)",
  }}
>
  <p
    style={{
      color: "#66c0f4",
      fontWeight: "bold",
      marginBottom: "8px",
      fontSize: "14px",
      letterSpacing: "1px",
    }}
  >
    GAME HIGHLIGHT
  </p>

  <h3
    style={{
      margin: 0,
      fontSize: "24px",
      color: "white",
    }}
  >
    🎮 {currentSteamGame || "Kein Spiel erkannt"}
  </h3>
</div>
            <p style={{ color: "#aaa", marginTop: "15px" }}>Spiele:</p>

            <div style={{ marginTop: "10px", marginBottom: "20px" }}>
              {steamData?.recentGames?.length > 0 ? (
                steamData.recentGames.slice(0, 3).map((game: any) => (
                  <p key={game.appid} style={{ color: "#ccc" }}>
                    🎮 {game.name}
                  </p>
                ))
              ) : steamData?.topGames?.length > 0 ? (
                steamData.topGames.slice(0, 3).map((game: any) => (
                  <p key={game.appid} style={{ color: "#ccc" }}>
                    ⭐ {game.name}
                  </p>
                ))
              ) : (
                <p style={{ color: "#777" }}>Keine Spiele gefunden</p>
              )}
            </div>

            <a
              href="https://steamcommunity.com/profiles/76561199191385171/"
              target="_blank"
              style={smallButtonStyle}
            >
              Steam öffnen
            </a>
          </div>
        </div>
      </section>

      <section id="projects" style={projectsSectionStyle}>
        <h2 style={sectionTitleStyle}>Meine Projekte</h2>

        <div style={projectGridStyle}>
          {projects.map((project) => (
            <div className="profile-card-hover" style={projectCardStyle} key={project.title}>
              <h3 style={projectTitleStyle}>{project.title}</h3>

              <p style={projectTextStyle}>{project.description}</p>

              <div style={tagRowStyle}>
                {project.tags.map((tag) => (
                  <span style={tagStyle} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={youtubeSectionStyle}>
        <h2 style={sectionTitleStyle}>YouTube / Musik</h2>

        <div style={youtubeStyle}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/jfKfPfyJRdk"
            title="YouTube video player"
            allowFullScreen
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 0 25px rgba(255,0,100,0.4)",
              maxWidth: "100%",
            }}
          ></iframe>
        </div>
      </section>
    </div>
  )
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #09090f, #12122a, #050505)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  position: "relative" as const,
  overflowX: "hidden" as const,
}

const navbarStyle = {
  position: "fixed" as const,
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "92%",
  maxWidth: "1180px",
  padding: "14px 22px",
  borderRadius: "999px",
  background: "rgba(17,17,34,0.72)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow: "0 0 35px rgba(88,101,242,0.28)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  zIndex: 999,
}

const navLogoStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
}

const logoGlowStyle = {
  color: "#ffffff",
  padding: "7px 14px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #00d9ff, #ff00ff, #ff8c00)",
  boxShadow:
    "0 0 10px #00d9ff, 0 0 20px #ff00ff, 0 0 35px rgba(255,140,0,0.8)",
  textShadow:
    "0 0 6px white, 0 0 12px #00d9ff, 0 0 20px #ff00ff",
  border: "1px solid rgba(255,255,255,0.4)",
  letterSpacing: "1px",
}

const navLinksStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap" as const,
}

const navLinkStyle = {
  color: "#d7d7ff",
  textDecoration: "none",
  fontWeight: "bold",
  position: "relative" as const,
  padding: "8px 2px",
}

const navProfileStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  maxWidth: "260px",
  overflow: "hidden",
}

const navAvatarStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "2px solid #5865F2",
}

const navStatusDotStyle = {
  position: "absolute" as const,
  right: "0px",
  bottom: "0px",
  width: "11px",
  height: "11px",
  borderRadius: "50%",
  border: "2px solid #111122",
}

const navStatusTextStyle = {
  color: "#cfcfff",
  fontSize: "13px",
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
}

const heroStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column" as const,
  textAlign: "center" as const,
  padding: "160px 20px 80px",
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  position: "relative" as const,
  zIndex: 1,
}

const titleStyle = {
  fontSize: "64px",
  marginBottom: "10px",
}

const subtitleStyle = {
  fontSize: "22px",
  color: "#b8b8ff",
  marginBottom: "30px",
}

const textStyle = {
  maxWidth: "650px",
  color: "#cccccc",
  marginBottom: "35px",
  lineHeight: "1.6",
}

const buttonRowStyle = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap" as const,
  marginBottom: "45px",
}

const buttonStyle = {
  color: "white",
  textDecoration: "none",
  padding: "14px 24px",
  borderRadius: "12px",
  backgroundColor: "#5865F2",
  boxShadow: "0 0 20px rgba(88, 101, 242, 0.5)",
  fontWeight: "bold",
}

const profileCardsRowStyle = {
  display: "flex",
  gap: "35px",
  justifyContent: "center",
  alignItems: "stretch",
  flexWrap: "wrap" as const,
  marginTop: "40px",
  marginBottom: "60px",
  width: "100%",
}

const discordCardStyle = {
  background: "rgba(17,17,34,0.9)",
  padding: "28px",
  borderRadius: "20px",
  width: "420px",
  maxWidth: "90vw",
  boxShadow: "0 0 30px rgba(88, 101, 242, 0.4)",
  border: "1px solid rgba(255,255,255,0.1)",
  overflow: "hidden",
}

const steamCardStyle = {
  background: "rgba(17,17,34,0.9)",
  padding: "28px",
  borderRadius: "20px",
  width: "420px",
  maxWidth: "90vw",
  boxShadow: "0 0 30px rgba(102, 192, 244, 0.35)",
  border: "1px solid rgba(102,192,244,0.25)",
  overflow: "hidden",
}

const discordBannerStyle = {
  width: "calc(100% + 56px)",
  height: "120px",
  objectFit: "cover" as const,
  margin: "-28px -28px 20px",
  borderRadius: "20px 20px 0 0",
  boxShadow: "0 0 25px rgba(88,101,242,0.35)",
}

const avatarStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover" as const,
  borderRadius: "50%",
  marginBottom: "15px",
  border: "3px solid #5865F2",
}

const albumCoverStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "16px",
  marginTop: "15px",
  marginBottom: "15px",
  boxShadow: "0 0 20px rgba(29, 185, 84, 0.5)",
}

const progressBackgroundStyle = {
  width: "100%",
  height: "10px",
  background: "#222",
  borderRadius: "999px",
  overflow: "hidden",
}

const smallButtonStyle = {
  display: "inline-block",
  marginTop: "20px",
  color: "white",
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "12px",
  backgroundColor: "#1b2838",
  boxShadow: "0 0 18px rgba(102,192,244,0.45)",
  fontWeight: "bold",
}

const projectsSectionStyle = {
  padding: "80px 20px",
  textAlign: "center" as const,
  position: "relative" as const,
  zIndex: 1,
}

const sectionTitleStyle = {
  fontSize: "42px",
  marginBottom: "40px",
}

const projectGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "25px",
  maxWidth: "1100px",
  margin: "0 auto",
}

const projectCardStyle = {
  background: "rgba(17,17,34,0.9)",
  padding: "28px",
  borderRadius: "20px",
  textAlign: "left" as const,
  boxShadow: "0 0 25px rgba(88, 101, 242, 0.25)",
  border: "1px solid rgba(255,255,255,0.1)",
}

const projectTitleStyle = {
  fontSize: "24px",
  marginBottom: "12px",
}

const projectTextStyle = {
  color: "#cccccc",
  lineHeight: "1.5",
  marginBottom: "20px",
}

const tagRowStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap" as const,
}

const tagStyle = {
  background: "rgba(88, 101, 242, 0.2)",
  color: "#b8b8ff",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "13px",
}

const youtubeSectionStyle = {
  padding: "80px 20px 120px",
  textAlign: "center" as const,
  position: "relative" as const,
  zIndex: 1,
}

const youtubeStyle = {
  display: "flex",
  justifyContent: "center",
}

export default App
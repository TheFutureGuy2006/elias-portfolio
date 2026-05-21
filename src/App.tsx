import { useEffect, useState } from "react"

type DiscordData = {
  discord_status: "online" | "idle" | "dnd" | "offline"
  listening_to_spotify?: boolean
  spotify?: {
    song: string
    artist: string
    album: string
    album_art_url: string
    timestamps: {
      start: number
      end: number
    }
  }
  discord_user: {
    id: string
    username: string
    avatar: string
    banner?: string
  }
}

type SteamData = {
  profile?: {
    avatarfull?: string
    personaname?: string
    gameextrainfo?: string
  }
}

type Project = {
  title: string
  status: string
  description: string
  tags: string[]
  detail: string
}

const steamProfileUrl = "https://steamcommunity.com/profiles/76561199191385171/"
const discordProfileUrl = "https://discord.com/users/702057545925132371"
const twitchProfileUrl = "https://www.twitch.tv/thefutureguy2006/"

const projects: Project[] = [
  {
    title: "BeaconEffects Plugin",
    status: "In Arbeit",
    description:
      "Minecraft Plugin mit GUI, Beacon-Effekten, Speicherung und Party-System.",
    tags: ["Minecraft", "Java", "Paper"],
    detail: "Fokus auf saubere Menüs, klare Spielerführung und stabile Serverlogik.",
  },
  {
    title: "Pickaxe Plugin",
    status: "Konzept + Tests",
    description: "Custom Pickaxe mit 1x1, 2x2 und 3x3 Mining-System über GUI.",
    tags: ["Minecraft", "Java", "GUI"],
    detail: "Gedacht für Survival- und Farm-Server mit kontrollierbaren Upgrades.",
  },
  {
    title: "GTA RP Projekte",
    status: "Live-Ideen",
    description: "Konzepte, Bewerbungen, Taxi-Systeme, Events und RP-Dokumente.",
    tags: ["GTA RP", "FiveM", "Roleplay"],
    detail: "Strukturierte RP-Abläufe, bessere Jobs und kleine Events mit Story.",
  },
]

const skills = [
  "Java",
  "Minecraft Paper",
  "React",
  "TypeScript",
  "FiveM",
  "Discord Presence",
  "Vercel",
  "UI Design",
]

const customSteamGames = [
  { name: "FiveM", detail: "GTA RP", icon: "🚓" },
  { name: "Apex Legends", detail: "Battle Royale", icon: "🎯" },
  { name: "Bloons TD", detail: "Tower Defense", icon: "🎈" },
  { name: "NFS Heat", detail: "Racing", icon: "🏁" },
]

const statusLabels = {
  online: "Online",
  idle: "Abwesend",
  dnd: "Bitte nicht stören",
  offline: "Offline",
}

function App() {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [steamData, setSteamData] = useState<SteamData | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    fetch("https://api.lanyard.rest/v1/users/702057545925132371")
      .then((res) => res.json())
      .then((data) => setDiscordData(data.data))
      .catch(() => setDiscordData(null))
  }, [])

  useEffect(() => {
    fetch("/api/steam")
      .then((res) => res.json())
      .then((data) => setSteamData(data))
      .catch((error) => console.log("Steam API Fehler:", error))
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const avatar = discordData
    ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
    : "/logo.png"

  const discordBanner = discordData?.discord_user?.banner
    ? `https://cdn.discordapp.com/banners/${discordData.discord_user.id}/${discordData.discord_user.banner}.png?size=1024`
    : null

  const currentSteamGame =
    steamData?.profile?.gameextrainfo ||
    customSteamGames[0].name

  const spotifyProgress = discordData?.spotify
    ? Math.min(
        100,
        Math.max(
          0,
          ((now - discordData.spotify.timestamps.start) /
            (discordData.spotify.timestamps.end - discordData.spotify.timestamps.start)) *
            100,
        ),
      )
    : 0

  return (
    <div className="page-shell">
      <div className="animated-bg" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className="navbar">
        <a className="nav-brand" href="#">
          <span className="neon-logo">TFG</span>
          <span>TheFutureGuy</span>
        </a>

        <div className="nav-links">
          <a className="nav-link" href="#about">Über mich</a>
          <a className="nav-link" href="#projects">Projekte</a>
          <a className="nav-link" href="#contact">Kontakt</a>
          <a className="nav-link" href={steamProfileUrl} target="_blank">Steam</a>
        </div>

        <div className="nav-profile">
          {discordData && (
            <>
              <span className={`status-dot status-${discordData.discord_status}`}></span>
              <span>
                {discordData.listening_to_spotify && discordData.spotify
                  ? `Spotify: ${discordData.spotify.song}`
                  : statusLabels[discordData.discord_status]}
              </span>
            </>
          )}
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <p className="eyebrow">Developer • Gamer • Plugin Builder</p>
          <h1>Elias "TheFutureGuy" Ivanov</h1>
          <p className="hero-copy">
            Ich baue Minecraft-Plugins, RP-Konzepte und kleine Webprojekte mit
            Fokus auf klare Features, gute Optik und stabile Systeme.
          </p>

          <div className="button-row">
            <a className="primary-button" href="#projects">Projekte ansehen</a>
            <a className="secondary-button" href={discordProfileUrl} target="_blank">Discord</a>
            <a className="secondary-button" href={twitchProfileUrl} target="_blank">Twitch</a>
          </div>

          <div className="profile-grid">
            <section className="profile-card discord-card">
              {discordBanner && (
                <img className="discord-banner" src={discordBanner} alt="Discord Banner" />
              )}

              <img className="profile-avatar" src={avatar} alt="Discord Avatar" />
              <div className="card-heading-row">
                <div>
                  <p className="card-kicker">Discord</p>
                  <h2>{discordData?.discord_user.username || "TheFutureGuy"}</h2>
                </div>
                <span className={`status-pill status-${discordData?.discord_status || "offline"}`}>
                  {discordData ? statusLabels[discordData.discord_status] : "Lädt"}
                </span>
              </div>

              {discordData?.listening_to_spotify && discordData.spotify ? (
                <div className="spotify-panel">
                  <img src={discordData.spotify.album_art_url} alt="Album Cover" />
                  <div>
                    <p className="card-kicker spotify-text">Spotify läuft</p>
                    <strong>{discordData.spotify.song}</strong>
                    <span>{discordData.spotify.artist}</span>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${spotifyProgress}%` }}></span>
                  </div>
                </div>
              ) : (
                <p className="muted-text">
                  Wenn Spotify aktiv ist, erscheinen hier Song, Artist und Cover.
                </p>
              )}
            </section>

            <section className="profile-card steam-card">
              <img
                className="profile-avatar steam-avatar"
                src={steamData?.profile?.avatarfull || "/logo.png"}
                alt="Steam Avatar"
              />

              <div className="card-heading-row">
                <div>
                  <p className="card-kicker">Steam</p>
                  <h2>{steamData?.profile?.personaname || "Steam Profil"}</h2>
                </div>
                <span className="steam-pill">
                  {steamData?.profile?.gameextrainfo ? "Spielt gerade" : "Highlight"}
                </span>
              </div>

              <div className="game-highlight">
                <span className="game-icon">{customSteamGames[0].icon}</span>
                <div>
                  <p>{steamData?.profile?.gameextrainfo ? "Aktuell online" : "Game Highlight"}</p>
                  <strong>{currentSteamGame}</strong>
                  <span>{customSteamGames[0].detail}</span>
                </div>
              </div>

              <div className="game-list">
                <p className="card-kicker">Custom Games</p>
                {customSteamGames.map((game) => (
                  <div className="game-row" key={game.name}>
                    <span>
                      <b>{game.icon}</b>
                      {game.name}
                    </span>
                    <small>{game.detail}</small>
                  </div>
                ))}
              </div>

              <a className="small-button" href={steamProfileUrl} target="_blank">Steam öffnen</a>
            </section>
          </div>
        </section>

        <section className="content-section about-section" id="about">
          <div>
            <p className="eyebrow">Über mich</p>
            <h2>Ich mag Projekte, die man wirklich benutzen kann.</h2>
          </div>
          <p>
            Meine Seite verbindet Coding, Gaming und Roleplay. Besonders spannend
            finde ich Minecraft-Plugins mit klaren GUIs, kleine Web-Tools und
            RP-Systeme, die Spielern mehr Möglichkeiten geben.
          </p>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Stack & Interessen</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Showcase</p>
            <h2>Meine Projekte</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.detail}</small>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section media-section">
          <div className="section-heading">
            <p className="eyebrow">YouTube / Musik</p>
            <h2>Stream zum Coden oder Zocken</h2>
          </div>
          <iframe
            src="https://www.youtube.com/embed/jfKfPfyJRdk"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </section>

        <section className="content-section contact-section" id="contact">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2>Socials</h2>
          </div>
          <div className="contact-links">
            <a href={discordProfileUrl} target="_blank">Discord</a>
            <a href={steamProfileUrl} target="_blank">Steam</a>
            <a href={twitchProfileUrl} target="_blank">Twitch</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

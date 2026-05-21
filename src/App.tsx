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
    gameid?: string
  }
  recentGames?: SteamGame[]
  topGames?: SteamGame[]
  currentGame?: SteamGame
}

type SteamGame = {
  appid: number
  name: string
  playtime_forever?: number
  playtime_2weeks?: number
}

type Project = {
  title: string
  status: string
  description: string
  tags: string[]
  detail: string
  badges: string[]
  commands: string[]
  features: string[]
  result: string
  showcase?: string
  ctaLabel: string
}

type ShowcasePlugin = {
  title: string
  status: string
  description: string
  highlights: string[]
  screenshots: {
    title: string
    src: string
    alt: string
  }[]
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
    badges: ["Paper", "GUI", "Config", "Permissions"],
    commands: ["/beacon", "/beacon reload", "/beacon give <spieler>"],
    features: [
      "Eigene GUI zur Effektauswahl",
      "Upgrade-Stufen per Links- und Rechtsklick",
      "Custom Beacon Item mit Lore und Command",
      "Speicherung für Spielerfortschritt",
    ],
    result:
      "Ein Plugin, das Spielern schnell verständliche Beacon-Features gibt und trotzdem wie ein echtes Server-System wirkt.",
    showcase: "BeaconEffects Plugin",
    ctaLabel: "Beacon Plugin anfragen",
  },
  {
    title: "Pickaxe Plugin",
    status: "Konzept + Tests",
    description: "Custom Pickaxe mit 1x1, 2x2 und 3x3 Mining-System über GUI.",
    tags: ["Minecraft", "Java", "GUI"],
    detail: "Gedacht für Survival- und Farm-Server mit kontrollierbaren Upgrades.",
    badges: ["Paper", "Mining", "GUI", "Upgrades"],
    commands: ["/pickaxe", "/pickaxe give <spieler>", "/pickaxe mode"],
    features: [
      "Multiblock-Spitzhacke mit eigenen Modi",
      "Abbaugröße direkt im GUI auswählen",
      "Item-Lore mit Stats und Haltbarkeit",
      "Klare Bedienung für normale Spieler",
    ],
    result:
      "Ein Mining-Tool, das sich stärker anfühlt als Vanilla, aber für Server gut kontrollierbar bleibt.",
    showcase: "Pickaxe Plugin",
    ctaLabel: "Pickaxe Demo anfragen",
  },
  {
    title: "GTA RP Projekte",
    status: "Live-Ideen",
    description: "Konzepte, Bewerbungen, Taxi-Systeme, Events und RP-Dokumente.",
    tags: ["GTA RP", "FiveM", "Roleplay"],
    detail: "Strukturierte RP-Abläufe, bessere Jobs und kleine Events mit Story.",
    badges: ["FiveM", "Konzept", "Roleplay", "Events"],
    commands: ["Taxi-Konzept", "Eventplan", "Bewerbungsvorlage"],
    features: [
      "Job- und Event-Konzepte",
      "RP-Bewerbungen und strukturierte Dokumente",
      "Ideen für Taxi-Systeme und Fraktionen",
      "Fokus auf klare Regeln und gute Spielerführung",
    ],
    result:
      "Mehr Struktur für RP-Situationen, damit Spieler schneller verstehen, was sie tun können.",
    ctaLabel: "RP-Konzept besprechen",
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

const pluginShowcases: ShowcasePlugin[] = [
  {
    title: "BeaconEffects Plugin",
    status: "Screenshots vorbereitet",
    description:
      "Ein Minecraft Beacon-Plugin mit Effekt-Auswahl, Upgrade-Stufen und einem eigenen Item-Look.",
    highlights: [
      "GUI zur Effektauswahl",
      "Linksklick/Rechtsklick-Stufen",
      "Custom Item mit Lore und Commands",
    ],
    screenshots: [
      {
        title: "Upgrade-Hinweis",
        src: "/showcase/beacon-tooltip.png",
        alt: "BeaconEffects Tooltip mit Linksklick und Rechtsklick Stufen",
      },
      {
        title: "Effekt-Auswahl",
        src: "/showcase/beacon-gui.png",
        alt: "BeaconEffects GUI zur Auswahl eines Effekts",
      },
      {
        title: "Custom Item",
        src: "/showcase/beacon-item.png",
        alt: "Effect Beacon Item mit Lore und Command Info",
      },
    ],
  },
  {
    title: "Pickaxe Plugin",
    status: "Screenshots vorbereitet",
    description:
      "Multiblock-Spitzhacke mit Item-Lore, Stack-Anzeige und GUI zur Auswahl der Abbaugröße.",
    highlights: [
      "1x1, 2x2 und 3x3 Mining",
      "Abbaugröße über GUI auswählbar",
      "Custom Diamond Pickaxe mit Stats und Haltbarkeit",
    ],
    screenshots: [
      {
        title: "Multiblock-Spitzhacke",
        src: "/showcase/pickaxe-item.png",
        alt: "Multiblock-Spitzhacke Item mit Stats und Haltbarkeit",
      },
      {
        title: "Stack-Anzeige",
        src: "/showcase/pickaxe-stack.png",
        alt: "Multiblock-Spitzhacke Stack Anzeige im Inventar",
      },
      {
        title: "Abbaugröße wählen",
        src: "/showcase/pickaxe-gui.png",
        alt: "GUI zum Auswählen der Abbaugröße",
      },
    ],
  },
]

const faqItems = [
  {
    question: "Sind die Plugins öffentlich downloadbar?",
    answer:
      "Aktuell sind sie eher Showcase- und Projektarbeiten. Wenn jemand Interesse hat, kann ich sie gezielt vorstellen oder weiter ausbauen.",
  },
  {
    question: "Für welche Minecraft-Versionen sind die Plugins gedacht?",
    answer:
      "Der Fokus liegt auf Paper-Servern. Die genaue Version hängt vom Projektstand ab und kann später pro Plugin ergänzt werden.",
  },
  {
    question: "Kann man die Plugins testen?",
    answer:
      "Ja, als Demo oder über Screenshots/kurze Vorstellungen. Dafür ist der Anfrage-Button bei den Projekt-Details gedacht.",
  },
  {
    question: "Warum gibt es GTA RP neben Minecraft Plugins?",
    answer:
      "Die Seite zeigt nicht nur Code, sondern auch Konzepte und Systeme, die Spieler in Games wirklich benutzen können.",
  },
]

const customSteamGames = [
  { name: "FiveM", detail: "GTA RP", hours: "1.250 h", icon: "🚓" },
  { name: "Apex Legends", detail: "Battle Royale", hours: "420 h", icon: "🎯" },
  { name: "Bloons TD", detail: "Tower Defense", hours: "85 h", icon: "🎈" },
  { name: "NFS Heat", detail: "Racing", hours: "65 h", icon: "🏁" },
]

const statusLabels = {
  online: "Online",
  idle: "Abwesend",
  dnd: "Bitte nicht stören",
  offline: "Offline",
}

const formatHours = (minutes?: number) => {
  if (!minutes) return null
  return `${Math.round(minutes / 60)} h`
}

function ShowcaseShot({
  title,
  src,
  alt,
}: ShowcasePlugin["screenshots"][number]) {
  return (
    <figure className="showcase-shot" data-placeholder={`${title} Bild folgt`}>
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          event.currentTarget.style.display = "none"
          event.currentTarget.parentElement?.classList.add("shot-missing")
        }}
      />
      <figcaption>{title}</figcaption>
    </figure>
  )
}

function App() {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null)
  const [steamData, setSteamData] = useState<SteamData | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [theme, setTheme] = useState<"neon" | "clean" | "minecraft">("neon")

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

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject])

  const avatar = discordData
    ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
    : "/logo.png"

  const discordBanner = discordData?.discord_user?.banner
    ? `https://cdn.discordapp.com/banners/${discordData.discord_user.id}/${discordData.discord_user.banner}.png?size=1024`
    : null

  const currentSteamGame =
    steamData?.profile?.gameextrainfo ||
    customSteamGames[0].name
  const matchedCurrentGame =
    steamData?.currentGame ||
    steamData?.recentGames?.find((game) => game.name === currentSteamGame) ||
    steamData?.topGames?.find((game) => game.name === currentSteamGame)
  const currentGameTotal = formatHours(matchedCurrentGame?.playtime_forever)
  const currentGameRecent = formatHours(matchedCurrentGame?.playtime_2weeks)
  const selectedShowcase = selectedProject?.showcase
    ? pluginShowcases.find((plugin) => plugin.title === selectedProject.showcase)
    : undefined

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
    <div className="page-shell" data-theme={theme}>
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

        <div className="theme-toggle" aria-label="Theme wählen">
          {(["neon", "clean", "minecraft"] as const).map((themeName) => (
            <button
              className={theme === themeName ? "theme-option active" : "theme-option"}
              key={themeName}
              onClick={() => setTheme(themeName)}
              type="button"
            >
              {themeName === "neon" ? "Neon" : themeName === "clean" ? "Clean" : "MC"}
            </button>
          ))}
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
                  {steamData?.profile?.gameextrainfo ? (
                    <span>
                      {currentGameTotal ? `Gesamtzeit: ${currentGameTotal}` : "Gesamtzeit nicht verfügbar"}
                      {currentGameRecent ? ` • Letzte 2 Wochen: ${currentGameRecent}` : ""}
                    </span>
                  ) : (
                    <span>{customSteamGames[0].detail} • {customSteamGames[0].hours}</span>
                  )}
                </div>
              </div>

              <div className="game-list">
                <p className="card-kicker">Custom Games</p>
                {customSteamGames.map((game) => (
                  <div className="game-row" key={game.name}>
                    <span className="game-copy">
                      <b>{game.icon}</b>
                      <span>
                        {game.name}
                        <em>{game.detail}</em>
                      </span>
                    </span>
                    <small>{game.hours}</small>
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
                <div className="badge-row">
                  {project.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button
                  className="project-detail-button"
                  onClick={() => setSelectedProject(project)}
                  type="button"
                >
                  Details öffnen
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section faq-section">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Kurze Antworten</h2>
          </div>

          <div className="faq-grid">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
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

      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            aria-modal="true"
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Projekt-Details schließen"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              type="button"
            >
              ×
            </button>

            <p className="eyebrow">{selectedProject.status}</p>
            <h2>{selectedProject.title}</h2>
            <p className="modal-lead">{selectedProject.description}</p>

            <div className="modal-grid">
              <div>
                <h3>Features</h3>
                <ul>
                  {selectedProject.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Commands / Inhalte</h3>
                <ul className="command-list">
                  {selectedProject.commands.map((command) => (
                    <li key={command}>
                      <code>{command}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-result">
              <div>
                <h3>Ergebnis</h3>
                <p>{selectedProject.result}</p>
              </div>
              <a className="modal-cta" href={discordProfileUrl} target="_blank">
                {selectedProject.ctaLabel}
              </a>
            </div>

            {selectedShowcase && (
              <div className="modal-showcase">
                <div>
                  <p className="eyebrow">Plugin Screenshots</p>
                  <h3>{selectedShowcase.title}</h3>
                  <p>{selectedShowcase.description}</p>
                </div>

                <div className="showcase-shot-grid">
                  {selectedShowcase.screenshots.map((screenshot) => (
                    <ShowcaseShot
                      key={screenshot.src}
                      title={screenshot.title}
                      src={screenshot.src}
                      alt={screenshot.alt}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="tag-row">
              {selectedProject.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
              {selectedProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

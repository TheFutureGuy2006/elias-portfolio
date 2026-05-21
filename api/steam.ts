import "dotenv/config"

type VercelResponse = {
  status: (code: number) => {
    json: (body: unknown) => void
  }
}

type SteamGame = {
  appid: number
  name: string
  playtime_forever: number
  playtime_2weeks?: number
}

type SteamProfile = {
  avatarfull?: string
  personaname?: string
  gameextrainfo?: string
  gameid?: string
}

type ProfileResponse = {
  response: {
    players: SteamProfile[]
  }
}

type RecentGamesResponse = {
  response: {
    games?: SteamGame[]
  }
}

type OwnedGamesResponse = {
  response: {
    games?: SteamGame[]
  }
}

export default async function handler(_req: unknown, res: VercelResponse) {
  const apiKey = process.env.STEAM_API_KEY
  const steamId = "76561199191385171"

  if (!apiKey) {
    return res.status(500).json({ error: "Steam API Key fehlt" })
  }

  try {
    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`

    const recentUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}&count=5`

    const ownedUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true`

    const [profileResponse, recentResponse, ownedResponse] = await Promise.all([
      fetch(profileUrl),
      fetch(recentUrl),
      fetch(ownedUrl),
    ])

    const profileData = (await profileResponse.json()) as ProfileResponse
    const recentData = (await recentResponse.json()) as RecentGamesResponse
    const ownedData = (await ownedResponse.json()) as OwnedGamesResponse

    const ownedGames = ownedData.response.games || []
    const profile = profileData.response.players[0]
    const currentGame = profile?.gameid
      ? ownedGames.find((game) => String(game.appid) === profile.gameid)
      : undefined

    const topGames = [...ownedGames]
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 5)

    res.status(200).json({
      profile,
      recentGames: recentData.response.games || [],
      topGames,
      currentGame,
    })
  } catch {
    res.status(500).json({ error: "Steam API Fehler" })
  }
}

import "dotenv/config"

export default async function handler(req: any, res: any) {
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

    const profileData = await profileResponse.json()
    const recentData = await recentResponse.json()
    const ownedData = await ownedResponse.json()

    const ownedGames = ownedData.response.games || []

    const topGames = ownedGames
      .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
      .slice(0, 5)

    res.status(200).json({
      profile: profileData.response.players[0],
      recentGames: recentData.response.games || [],
      topGames,
    })
  } catch (error) {
    res.status(500).json({ error: "Steam API Fehler" })
  }
}
import 'dotenv/config'
export default async function handler(req: any, res: any) {
  const apiKey = process.env.STEAM_API_KEY
  const steamId = "76561199191385171"

  if (!apiKey) {
    return res.status(500).json({ error: "Steam API Key fehlt" })
  }

  try {
    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    const gamesUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}`

    const [profileResponse, gamesResponse] = await Promise.all([
      fetch(profileUrl),
      fetch(gamesUrl),
    ])

    const profileData = await profileResponse.json()
    const gamesData = await gamesResponse.json()

    res.status(200).json({
      profile: profileData.response.players[0],
      recentGames: gamesData.response.games || [],
    })
  } catch (error) {
    res.status(500).json({ error: "Steam API Fehler" })
  }
}
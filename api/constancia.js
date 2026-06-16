export default async function handler(req, res) {
  const { cui } = req.query

  try {
    const response = await fetch(
      `https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=${cui}`
    )

    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener la constancia'
    })
  }
}
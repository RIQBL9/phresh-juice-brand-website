export default async function handler(req, res) {
  const { email } = req.body;

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`
    },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  res.status(200).json(data);
}

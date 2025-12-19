export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;

  try {
    const kintoneRes = await fetch("https://chiryu.cybozu.com/k/v1/record.json", {
      method: "POST",
      headers: {
        "X-Cybozu-API-Token": process.env.KINTONE_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await kintoneRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "kintone API call failed" });
  }
}

import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/metar/:icao", async (req, res) => {
  const icao = req.params.icao.toUpperCase();

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("http://sare.naabol.gob.bo/ifis-appv3/public/sabo?page=1", {
      waitUntil: "networkidle2"
    });

    // Esperar a que Livewire cargue el contenido
    await page.waitForSelector("body", { timeout: 15000 });

    const contenido = await page.evaluate(() => document.body.innerText);

    await browser.close();

    // Buscar METAR y SPECI
    const reMetar = new RegExp(`METAR ${icao}[\\s\\S]*?(?=METAR|SPECI|$)`, "i");
    const reSpe   = new RegExp(`SPECI ${icao}[\\s\\S]*?(?=METAR|SPECI|$)`, "i");

    const metar = contenido.match(reMetar)?.[0]?.trim() || null;
    const speci = contenido.match(reSpe)?.[0]?.trim() || null;

    res.json({
      icao,
      metar,
      speci,
      fuente: "NAABOL tiempo real"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo METAR" });
  }
});

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

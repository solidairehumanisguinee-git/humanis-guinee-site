import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Humanis Guinée Solidarité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f2c59",
          padding: 60,
        }}
      >
        <img
          src={logoSrc}
          width={440}
          height={293}
          style={{ borderRadius: 20, background: "white", padding: 16 }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 54,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
          }}
        >
          {"La solidarité n’a pas de frontières."}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#f9a826",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Humanis Guinée Solidarité — Bordeaux · Guinée
        </div>
      </div>
    ),
    { ...size }
  );
}

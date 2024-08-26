import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(
    process.cwd(),
    "srv",
    "sftp",
    "pirelli",
    "file.xml"
  );

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/xml");
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).json({ error: "File not found" });
  }
}

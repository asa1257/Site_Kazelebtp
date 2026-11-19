/**
 * Contrôle des pièces jointes. Le type est vérifié sur les premiers octets du fichier (signature),
 * jamais sur l'extension ni sur le type annoncé par le navigateur, qui se falsifient facilement.
 */

import "server-only";
import { FILE_LIMITS } from "./limits";

type Kind = { ext: string; mime: string; magic: number[] };
const KINDS: Kind[] = [
  { ext: "pdf", mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { ext: "png", mime: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
  { ext: "jpg", mime: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
  { ext: "dwg", mime: "application/acad", magic: [0x41, 0x43, 0x31, 0x30] }, // "AC10" (versions AutoCAD)
];

export type CheckedFile = { filename: string; mime: string; content: Buffer };

export async function checkFiles(files: File[]): Promise<{ ok: true; files: CheckedFile[] } | { ok: false; message: string }> {
  const real = files.filter((f) => f.size > 0);
  if (real.length > FILE_LIMITS.maxFiles) return { ok: false, message: `${FILE_LIMITS.maxFiles} fichiers maximum.` };
  const total = real.reduce((s, f) => s + f.size, 0);
  if (total > FILE_LIMITS.maxTotalBytes) return { ok: false, message: "Les pièces jointes dépassent 10 Mo au total." };

  const checked: CheckedFile[] = [];
  for (const file of real) {
    const content = Buffer.from(await file.arrayBuffer());
    const kind = KINDS.find((k) => k.magic.every((byte, i) => content[i] === byte));
    if (!kind) return { ok: false, message: `« ${file.name.slice(0, 60)} » n'est pas un PDF, DWG, JPG ou PNG valide.` };
    // Nom réécrit : aucun caractère dangereux ni chemin ne passe dans l'e-mail.
    const base = file.name.replace(/\.[^.]*$/, "").normalize("NFKD").replace(/[^\w-]+/g, "_").slice(0, 50) || "fichier";
    checked.push({ filename: `${base}.${kind.ext}`, mime: kind.mime, content });
  }
  return { ok: true, files: checked };
}

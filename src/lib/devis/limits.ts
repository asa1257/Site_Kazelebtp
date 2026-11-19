/** Limites des pièces jointes, partagées entre le navigateur (contrôle immédiat) et le serveur (contrôle qui fait foi). */
export const FILE_LIMITS = {
  maxFiles: 3,
  maxTotalBytes: 10 * 1024 * 1024, // 10 Mo au total
  accept: ".pdf,.dwg,.jpg,.jpeg,.png",
};

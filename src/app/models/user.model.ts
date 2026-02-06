//Interface pour les utilisateurs, similaire à celle du backend mais avec des champs optionnels pour les données qui peuvent être absentes ou nulles. Cela permet de mieux gérer les cas où certaines informations ne sont pas disponibles.

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return '-Le champs e-mail ne peut pas être vide.\n';
  if (!re.test(email)) return '-Le format de votre adresse e-mail n\'est pas valide.\n';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return '-Le champs mot de passe ne peut être vide.\n';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return '-Le champs Nom ne peut être vide.\n';

  return '';
};

export const confValidator = (mdp1: string, mdp2: string) => {
  if (mdp1 != mdp2) return '-La confirmation du mot de passe ne correspond pas.\n';

  return '';
};

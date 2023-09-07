import Joi from "joi";

export const isEmpty = (string: string) =>
  !string || (string && string.trim() === "");

export const isEmail = (email: string) =>
  email?.match(/.+@.+\..+/) ? true : false;

export const validateUserCreation = (body: any) => {
  const userSchema = Joi.object({
    email: Joi.string().required().messages({
      "string.base": "L'email doit être une chaîne de caractères",
      "string.empty": "L'email est obligatoire",
      "any.required": "L'email est requis",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères",
      "string.empty": "Le mot de passe est obligatoire",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères",
      "any.required": "Le mot de passe est requis",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Les mots de passe ne correspondent pas",
        "string.base": "Le mot de passe doit être une chaîne de caractères",
        "string.empty": "Le mot de passe est obligatoire",
        "any.required": "Le mot de passe est requis",
      }),
    username: Joi.string().required().messages({
      "string.base": "Le nom d'utilisateur doit être une chaîne de caractères",
      "string.empty": "Le nom d'utilisateur est obligatoire",
      "any.required": "Le nom d'utilisateur est requis",
    }),
    birthDate: Joi.date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18))) // Validate that the user is at least 18 years old
      .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
      .required()
      .messages({
        "date.base": "Veuillez choisir une date de naissance correcte",
        "date.empty": "La date de naissance est obligatoire",
        "date.max": "Vous devez avoir au moins 18 ans pour vous inscrire",
        "any.required": "La date de naissance est requise",
      }),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  });
  const { error } = userSchema.validate(body);
  if (error) {
    return { valid: false, error: error.details[0].message };
  }
  if (!isEmail(body.email)) {
    return { valid: false, error: "Adresse mail invalide" };
  }
  return { valid: true };
};

export const validateLoginData = (body: any) => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      "string.base": "L'email doit être une chaîne de caractères",
      "string.empty": "L'email est obligatoire",
      "any.required": "L'email est requis",
    }),
    password: Joi.string().required().messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères",
      "string.empty": "Le mot de passe est obligatoire",
      "any.required": "Le mot de passe est requis",
    }),
  });

  const { error } = schema.validate(body, { allowUnknown: true });
  if (error) {
    return { valid: false, error: error.details[0].message };
  }
  if (!isEmail(body.email)) {
    return { valid: false, error: "Adresse mail invalide" };
  }
  return { valid: true };
};

export const validateRewardData = (body: any) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.base": "Le titre doit être une chaîne de caractères",
      "string.empty": "Le titre est obligatoire",
      "any.required": "Le titre est requis",
    }),
    rank: Joi.string().required().messages({
      "string.base": "Le classement doit être une chaîne de caractères",
      "string.empty": "Le classement est obligatoire",
      "any.required": "Le classement est requis",
    }),
    image: Joi.string().required().messages({
      "string.base": "L'image doit être une chaîne de caractères",
      "string.empty": "L'image est obligatoire",
      "any.required": "L'image est requis",
    }),
  });

  const { error } = schema.validate(body, { allowUnknown: true });
  if (error) {
    return { valid: false, error: error.details[0].message };
  }
  return { valid: true };
};

export const validateTeamData = (body: any) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Le nom doit être une chaîne de caractères",
      "string.empty": "Le nom est obligatoire",
      "any.required": "Le nom est requis",
    }),
    flag: Joi.string().required().messages({
      "string.base": "L'image doit être une chaîne de caractères",
      "string.empty": "L'image est obligatoire",
      "any.required": "L'image est requis",
    }),
  });

  const { error } = schema.validate(body, { allowUnknown: true });
  if (error) {
    return { valid: false, error: error.details[0].message };
  }
  return { valid: true };
};

export const validateGameData = (body: any) => {
  const schema = Joi.object({
    date: Joi.string().isoDate().required().messages({
      "string.base": "La date doit être une chaîne de caractères au format ISO",
      "string.empty": "La date est obligatoire",
      "any.required": "La date est requise",
    }),
    nullPoints: Joi.number().required().messages({
      "number.base": "Les points nuls doivent être un nombre",
      "number.empty": "Les points nuls sont obligatoires",
      "any.required": "Les points nuls sont requis",
    }),
    bonusQuiz: Joi.string().required().messages({
      "string.base": "Le quiz de bonus doit être une chaîne de caractères",
      "string.empty": "Le quiz de bonus est obligatoire",
      "any.required": "Le quiz de bonus est requis",
    }),
    bonusChoiceA: Joi.string().required().messages({
      "string.base": "Le choix de bonus A doit être une chaîne de caractères",
      "string.empty": "Le choix de bonus A est obligatoire",
      "any.required": "Le choix de bonus A est requis",
    }),
    bonusChoiceB: Joi.string().required().messages({
      "string.base": "Le choix de bonus B doit être une chaîne de caractères",
      "string.empty": "Le choix de bonus B est obligatoire",
      "any.required": "Le choix de bonus B est requis",
    }),
    teamAId: Joi.string().uuid().required().messages({
      "string.base": "L'équipe A doit être une chaîne de caractères UUID",
      "string.empty": "L'équipe A est obligatoire",
      "any.required": "L'équipe A est requis",
    }),
    teamAPoints: Joi.number().required().messages({
      "number.base": "Les points de l'équipe A doivent être un nombre",
      "number.empty": "Les points de l'équipe A sont obligatoires",
      "any.required": "Les points de l'équipe A sont requis",
    }),
    teamBId: Joi.string().uuid().required().messages({
      "string.base": "L'équipe B doit être une chaîne de caractères UUID",
      "string.empty": "L'équipe B est obligatoire",
      "any.required": "L'équipe B est requis",
    }),
    teamBPoints: Joi.number().required().messages({
      "number.base": "Les points de l'équipe B doivent être un nombre",
      "number.empty": "Les points de l'équipe B sont obligatoires",
      "any.required": "Les points de l'équipe B sont requis",
    }),
  });

  const { error } = schema.validate(body, { allowUnknown: true });
  if (error) {
    return { valid: false, error: error.details[0].message };
  }
  return { valid: true };
};


export const validateMatchResultData = (body: any) => {
  const schema = Joi.object({
    matchId: Joi.string().required().messages({
      "string.base": "L'id du match doit être une chaîne de caractères",
      "string.empty": "L'id du match est obligatoire",
      "any.required": "L'id du match est requis",
    }),
    correctBonusChoice: Joi.number().required().messages({
      "string.base": "Le choix du bonus doit être un nombre",
      "string.empty": "Le choix du bonus est obligatoire",
      "any.required": "Le choix du bonus est requis",
    }),
  });
  const { error } = schema.validate(body, { allowUnknown: true });
  if (error) {
    return { valid: false, error: error.details[0].message };
  }

  if (body.correctBonusChoice !== 1 && body.correctBonusChoice !== 2) {
    return { valid: false, error: "correctBonusChoice should be 1 or 2" };
  }
  return { valid: true };
};
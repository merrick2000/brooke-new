"use client";
import { createUser, loginUser } from "@/api/users";
import AppLayout from "@/components/Layout/Index";
import { validateLoginData, validateUserCreation } from "@/helpers/validators";
import useAuth, { setAuthHeaders } from "@/state/auth";
import { UserRole } from "@/types/IUser";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";

const AuthPage = () => {
  const [submitData, setSubmitData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    birthDate: "",
  });
  const SCREEN = {
    LOGIN: "login",
    SIGNUP: "signup",
  };

  const [screen, setScreen] = useState(SCREEN.SIGNUP);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const isSignupScreen = screen === SCREEN.SIGNUP;

  const { fetchUserData } = useAuth();
  const { push } = useRouter();

  const onKeyChange = (key: string, value: string) => {
    setSubmitData((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        /*  const { error: err, valid } = isSignupScreen
        ? validateUserCreation(submitData)
        : validateLoginData(submitData);

      //console.log({ err, valid });
      if (err) {
        setValidationError(err);
        return;
      } */
        e.preventDefault();
        setIsSubmitting(true);
        const request = isSignupScreen ? createUser : loginUser;
        const { data } = await request(submitData);
        if (data.success) {
          setAuthHeaders(data.data);
          const u = await fetchUserData();
          if (u) {
            push(
              [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(u.userRole)
                ? `/dashboard`
                : "/profile"
            );
          }
        }
      } catch (error: any) {
        if (error?.response?.data?.message) {
          setValidationError(error.response.data.message);
        } else {
          setValidationError("Une erreur est survenue");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [submitData, isSignupScreen]
  );

  const { valid, error } = isSignupScreen
    ? validateUserCreation(submitData)
    : validateLoginData(submitData);

  console.log({ error });

  const isSubmitDisabled = !valid || isSubmitting;

  return (
    <AppLayout>
      <div className="bg-gray-100 p-4 text-primary">
        <div className="max-w-3xl mx-auto my-5 py-6 px-4 md:px-10 md:pt-10 md:pb-20 bg-white rounded-xl">
          <div className="max-w-[500px] mx-auto">
            <div className="flex justify-around items-center">
              <h5
                className={`font-serif font-semibold text-xl cursor-pointer ${
                  !isSignupScreen ? "text-primary" : "text-gray-400"
                }`}
                onClick={() => {
                  setScreen(SCREEN.LOGIN);
                }}
              >
                Se connecter
              </h5>
              <div className="h-8 w-[1px] bg-primary" />
              <h5
                className={`font-serif font-semibold text-xl cursor-pointer ${
                  isSignupScreen ? "text-primary" : "text-gray-400"
                }`}
                onClick={() => {
                  setScreen(SCREEN.SIGNUP);
                }}
              >
                S'inscrire
              </h5>
            </div>
          </div>
          <div className="mt-6 max-w-[480px] mx-auto">
            <h6 className="md:max-w-[90%] md:mx-auto font-serif font-semibold text-lg text-center mt-3 mb-5">
              L’inscription à Brooke prono est réservée aux{" "}
              <span className="text-yellow-500"> personnes majeures</span>.
            </h6>
            {validationError && (
              <div className="bg-red-100 text-red-700 text-sm font-serif px-5 py-2 rounded-lg my-4">
                <p>{validationError}</p>
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="ADRESSE EMAIL"
                  className="bg-gray-50 border border-primary focus:border-primary text-gray-900 rounded-full block w-full px-5 py-4 text-sm font-serif"
                  value={submitData.email}
                  onChange={(e) => onKeyChange("email", e.target.value)}
                  required
                />
              </div>

              {isSignupScreen && (
                <div className="mt-6">
                  <input
                    type="text"
                    id="username"
                    placeholder="NOM D'UTILISATEUR"
                    className="bg-gray-50 border border-primary focus:border-primary text-gray-900 rounded-full block w-full px-5 py-4 text-sm font-serif"
                    value={submitData.username}
                    onChange={(e) => onKeyChange("username", e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="mt-6">
                <input
                  type="password"
                  id="password"
                  placeholder="MOT DE PASSE"
                  className="bg-gray-50 border border-primary focus:border-primary text-gray-900 rounded-full block w-full px-5 py-4 text-sm font-serif"
                  value={submitData.password}
                  onChange={(e) => onKeyChange("password", e.target.value)}
                  required
                />
              </div>

              {isSignupScreen && (
                <div className="mt-6">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="CONFIRMEZ LE MOT DE PASSE"
                    className="bg-gray-50 border border-primary focus:border-primary text-gray-900 rounded-full block w-full px-5 py-4 text-sm font-serif"
                    value={submitData.confirmPassword}
                    onChange={(e) =>
                      onKeyChange("confirmPassword", e.target.value)
                    }
                    required
                  />
                </div>
              )}

              {!isSignupScreen ? (
                <div className="flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="bg-primary"
                    />
                    <label
                      htmlFor="remember_me"
                      className="font-serif text-primary text-sm ml-1"
                    >
                      Se souvenir de moi
                    </label>
                  </div>

                  <p className="text-sm text-primary font-serif underline">
                    Mot de passe oublié?
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-end mt-6">
                    <label
                      htmlFor="birthDate"
                      className="text-primary font-serif text-[14px] mr-3"
                    >
                      DATE DE NAISSANCE
                    </label>
                    <>
                      <input
                        type="date"
                        id="birthDate"
                        placeholder="JJ/MM/AAAA"
                        className="bg-gray-50 border border-primary focus:border-primary text-gray-900 rounded-full block px-5 py-4 text-sm font-serif"
                        value={submitData.birthDate}
                        onChange={(e) =>
                          onKeyChange("birthDate", e.target.value)
                        }
                        required
                      />
                    </>
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center">
                      <input
                        id="acceptedRules"
                        type="checkbox"
                        className="bg-primary"
                      />
                      <label
                        htmlFor="acceptedRules"
                        className="font-serif text-primary text-sm ml-1"
                      >
                        J’accepte les règles de Brooke Prono.
                      </label>
                    </div>

                    <div className="flex items-center mt-2">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="bg-primary"
                      />
                      <label
                        htmlFor="newsletter"
                        className="font-serif text-primary text-sm ml-1"
                      >
                        Je souhaite être informé par mail des nouveautés de la
                        plateforme.
                      </label>
                    </div>
                  </div>
                </div>
              )}
              <button
                className={`w-full mt-10 font-serif text-sm rounded-3xl ${
                  valid
                    ? isSignupScreen
                      ? "text-yellow-500"
                      : "text-white"
                    : "text-primary"
                } px-12 py-4 ${
                  !isSubmitDisabled
                    ? "bg-primary cursor-pointer"
                    : "bg-disabled cursor-not-allowed"
                }`}
                onClick={onSubmit}
                disabled={isSubmitDisabled}
              >
                {isSignupScreen ? "VALIDER" : "SE CONNECTER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AuthPage;
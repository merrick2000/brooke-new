import { IGameSettingsData } from "@/types/IUser";
import React, { Fragment, useState, useEffect, useCallback } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { createMatch, saveMatchResult, updateMatch } from "@/api/admin";
import {
  validateGameData,
  validateMatchResultData,
} from "@/helpers/validators";
import { toast } from "react-toastify";
import TeamSelector from "../Teams/Selector";
import { IGamePopulated } from "@/types/IGame";

interface GameResultFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IGamePopulated) => void;
  initialData: IGameSettingsData;
}

const GameResultForm: React.FC<GameResultFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const initialValue = {
    date: "",
    nullPoints: 25,
    bonusQuiz: "",
    bonusChoiceA: "",
    bonusChoiceB: "",
    teamAId: "",
    teamAPoints: 25,
    teamBId: "",
    teamBPoints: 25,
  };

  const [formValue, setGame] = useState<IGameSettingsData>(initialValue);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validationError, setValidationError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const winnerSet = Boolean(initialData.winnerId);

  useEffect(() => {
    if (isOpen && initialData) {
      setGame({ ...initialData });
    } else {
      setGame((prevState) => ({ ...prevState, ...initialValue }));
    }
  }, [isOpen && initialData]);

  const onDataChange = (key: string, value: string | number) => {
    setGame((d) => ({ ...d!, [key]: value }));
  };

  const onReset = useCallback(() => {
    setGame(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { error: _err } = validateMatchResultData({
        ...formValue,
        matchId: formValue.id,
      });
      if (_err) {
        setValidationError(_err);
        return;
      }

      if (winnerSet) {
        setValidationError("Résultat déjà défini");
        return;
      }

      setShowConfirm(true);
    },
    [formValue, winnerSet]
  );

  const validateData = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const { data } = await saveMatchResult({
        ...formValue,
        matchId: formValue.id,
      });
      if (data.success) {
        onSave(data.data);
        onClose();
        onReset();
        toast.success("Résultat défini", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setValidationError(error.response.data.message);
      } else {
        setValidationError("Une erreur est survenue");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formValue, winnerSet]);

  const onWinnerDataChange = useCallback(
    (winnerId?: string) => {
      if (!winnerSet) {
        setGame((g) => ({
          ...g,
          winnerId,
        }));
      }
    },
    [winnerSet]
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center font-serif">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Résultats du match
                </Dialog.Title>
                {validationError && (
                  <div className="bg-red-100 text-red-700 text-sm font-serif px-5 py-2 rounded-lg my-4">
                    <p>{validationError}</p>
                  </div>
                )}
                <div className="w-full mt-4">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <div>
                        <h6 className="text-primary font-xl font-semibold mb-3">
                          <span className="underline">Gagnant:</span>
                          <span className="ml-3">
                            {formValue.winnerId === formValue.teamAId
                              ? formValue.teamAName
                              : formValue.winnerId === formValue.teamBId
                              ? formValue.teamBName
                              : "Match Null"}
                          </span>
                        </h6>
                        <div
                          className={`flex items-center justify-between mb-4`}
                        >
                          <div
                            onClick={() => {
                              onWinnerDataChange(formValue.teamAId);
                            }}
                            className={`cursor-pointer border p-2 rounded-md ${
                              formValue.winnerId === formValue.teamAId
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            <img
                              src={formValue.teamAFlag}
                              alt=""
                              className="object-cover w-[80px] h-auto rounded-md"
                            />
                            <p className="text-center mt-1">
                              {formValue.teamAName}
                            </p>
                          </div>
                          <div
                            onClick={() => {
                              onWinnerDataChange(undefined);
                            }}
                            className={`w-[90px] h-[90px] cursor-pointer rounded-md flex items-center justify-center p-2 border ${
                              formValue.winnerId === undefined
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            <p className="text-center">Match Null</p>
                          </div>
                          <div
                            onClick={() => {
                              onWinnerDataChange(formValue.teamBId);
                            }}
                            className={`cursor-pointer border p-2 rounded-md ${
                              formValue.winnerId === formValue.teamBId
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            <img
                              src={formValue.teamBFlag}
                              alt=""
                              className="object-cover w-[80px] h-auto rounded-md"
                            />
                            <p className="text-center mt-1">
                              {formValue.teamBName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h6 className="text-primary font-xl font-semibold mb-3">
                          Bonus: {formValue.bonusQuiz}
                        </h6>

                        <div>
                          <div
                            onClick={() => {
                              if (!winnerSet) {
                                onDataChange("correctBonusChoice", 1);
                              }
                            }}
                            className={`cursor-pointer ml-2 rounded p-2 mb-3 ${
                              formValue.correctBonusChoice === 1
                                ? "border-2 border-primary"
                                : "border"
                            }`}
                          >
                            {formValue.bonusChoiceA}
                          </div>

                          <div
                            onClick={() => {
                              if (!winnerSet) {
                                onDataChange("correctBonusChoice", 2);
                              }
                            }}
                            className={`cursor-pointer ml-2 rounded p-2 mb-3 ${
                              formValue.correctBonusChoice === 2
                                ? "border-2 border-primary"
                                : "border"
                            }`}
                          >
                            {formValue.bonusChoiceB}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        className="bg-primary hover:opacity-90 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {"Valider"}
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onClose}
                      >
                        Annuler
                      </button>
                    </div>

                    {showConfirm && (
                      <div className="p-4 bg-gray-100 my-4 border rounded-md">
                        Cette action est irréversible. Une fois les résultas
                        confirmer, vous ne pourrez plus les modifiez. Les
                        utilisateurs ayant pronostiquer recevrons leurs points
                        selon ce résultat!
                        <div className="mt-3">
                          <button
                            className="bg-primary hover:opacity-90 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                            onClick={validateData}
                            disabled={isSubmitting}
                          >
                            {isSubmitting
                              ? "Confirmation..."
                              : "Confirmer les résultats"}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GameResultForm;

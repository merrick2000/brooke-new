import { IGameSettingsData } from "@/types/IUser";
import React, { Fragment, useState, useEffect, useCallback } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { createMatch, updateMatch } from "@/api/admin";
import { validateGameData } from "@/helpers/validators";
import { toast } from "react-toastify";
import TeamSelector from "../Teams/Selector";
import { IGamePopulated } from "@/types/IGame";
import { convertToInputDate, getDateTime } from "@/helpers";
import moment from "moment";

interface GameFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IGamePopulated) => void;
  initialData?: IGameSettingsData | null;
}

const GameForm: React.FC<GameFormProps> = ({
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

  console.log({ d1: initialData?.date, d2: formValue.date });

  useEffect(() => {
    if (isOpen && initialData) {
      setGame({ ...initialData });
    } else {
      setGame((prevState) => ({ ...prevState, ...initialValue }));
    }
  }, [isOpen && initialData]);

  const onDataChange = (key: string, value: string) => {
    setGame((d) => ({ ...d!, [key]: value }));
  };

  const onReset = useCallback(() => {
    setGame(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        const { error: _err } = validateGameData(formValue);
        if (_err) {
          setValidationError(_err);
          return;
        }
        setIsSubmitting(true);

        const matchDate = moment(formValue.date);

        const submitData = {
          ...formValue,
          date: `${matchDate.format("YYYY-MM-DDTHH:mm:ss")}.000Z`,
        };

        const submitRequest = formValue.id ? updateMatch : createMatch;
        const { data } = await submitRequest(submitData);
        if (data.success) {
          onSave(data.data);
          onClose();
          onReset();
          toast.success(
            formValue.id ? "Modification enrégistrée" : "Match ajoutée!",
            {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValue]
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
                  {initialData ? "Modifier le match" : "Ajouter un match"}
                </Dialog.Title>
                {validationError && (
                  <div className="bg-red-100 text-red-700 text-sm font-serif px-5 py-2 rounded-lg my-4">
                    <p>{validationError}</p>
                  </div>
                )}
                <div className="w-full mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <TeamSelector
                            label="Equipe A"
                            value={formValue.teamAId}
                            onChange={(v: string) => {
                              console.log({ v });
                              onDataChange("teamAId", v);
                            }}
                            disabled={Boolean(initialData)}
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="teamAPoints"
                          >
                            Nombre de points
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            id="teamAPoints"
                            name="teamAPoints"
                            value={formValue.teamAPoints}
                            onChange={(e) => {
                              onDataChange("teamAPoints", e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <TeamSelector
                            label="Equipe B"
                            value={formValue.teamBId}
                            onChange={(v: string) => {
                              console.log({ v });
                              onDataChange("teamBId", v);
                            }}
                            disabled={Boolean(initialData)}
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="teamBPoints"
                          >
                            Nombre de points
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            id="teamBPoints"
                            name="teamBPoints"
                            value={formValue.teamBPoints}
                            onChange={(e) => {
                              onDataChange("teamBPoints", e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gray-300 my-3" />

                    <div className="w-full mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nullPoints"
                      >
                        Nombre de points en cas de match null
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="nullPoints"
                        name="nullPoints"
                        value={formValue.nullPoints}
                        onChange={(e) => {
                          onDataChange("nullPoints", e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="date"
                        >
                          Date du match
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="date"
                          id="date"
                          name="date"
                          value={convertToInputDate(formValue.date)}
                          onChange={(e) => {
                            onDataChange("date", e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="time"
                        >
                          Heure du match
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="time"
                          id="time"
                          name="date"
                          value={getDateTime(formValue.date)}
                          onChange={(e) => {
                            const newDate = new Date(formValue.date);
                            const value = e.target.value;
                            const [hours, minutes] = value.split(":");

                            newDate.setHours(Number(hours));
                            newDate.setMinutes(Number(minutes));

                            console.log({ newDate, value: e.target.value });
                            onDataChange(
                              "date",
                              new Date(newDate).toISOString()
                            );
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gray-300 my-3" />

                    <div>
                      <div className="w-full mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bonusQuiz"
                        >
                          Question Bonus
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          id="bonusQuiz"
                          name="bonusQuiz"
                          value={formValue.bonusQuiz}
                          onChange={(e) => {
                            onDataChange("bonusQuiz", e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="bonusChoiceA"
                          >
                            Choix A
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="bonusChoiceA"
                            name="bonusChoiceA"
                            value={formValue.bonusChoiceA}
                            onChange={(e) => {
                              onDataChange("bonusChoiceA", e.target.value);
                            }}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="bonusChoiceB"
                          >
                            Choix B
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="bonusChoiceB"
                            name="bonusChoiceB"
                            value={formValue.bonusChoiceB}
                            onChange={(e) => {
                              onDataChange("bonusChoiceB", e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        className="bg-primary hover:opacity-90 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        {isSubmitting
                          ? "Soumission..."
                          : initialData
                          ? "Modifier"
                          : "Ajouter"}
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onClose}
                      >
                        Annuler
                      </button>
                    </div>
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

export default GameForm;

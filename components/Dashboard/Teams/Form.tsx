import { ITeam, ITeamData } from "@/types/IUser";
import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { Dialog, Transition } from "@headlessui/react";
import { createTeam, updateTeam } from "@/api/admin";
import { validateTeamData } from "@/helpers/validators";
import { toast } from "react-toastify";
import { getRandomFileName } from "@/helpers";
import { simpleUpload } from "@/helpers/aws";

interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: ITeam) => void;
  initialTeam?: ITeamData | null;
}

const TeamForm: React.FC<TeamFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTeam,
}) => {
  const initialValue = {
    name: "",
    flag: "",
  };

  const [team, setTeam] = useState<ITeamData>(initialValue);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [validationError, setValidationError] = useState("");

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && initialTeam) {
      setTeam({ ...initialTeam });
    } else {
      setTeam((prevState) => ({ ...prevState, ...initialValue }));
    }
  }, [isOpen && initialTeam]);

  const onDataChange = (key: string, value: string) => {
    setTeam({ ...team!, [key]: value });
  };

  const onReset = useCallback(() => {
    setTeam(initialValue);
  }, [initialValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const fileName = getRandomFileName(file.name);
      const uploadResult = await simpleUpload(
        file,
        fileName
        //setProgress
      );
      onDataChange("flag", uploadResult.Location);
      setIsUploading(false);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        const { error: _err } = validateTeamData(team);
        if (_err) {
          setValidationError(_err);
          return;
        }
        setIsSubmitting(true);
        const submitRequest = team.id ? updateTeam : createTeam;
        const { data } = await submitRequest(team);
        if (data.success) {
          onSave(data.data);
          onClose();
          onReset();
          toast.success(
            team.id ? "Modification enrégistrée" : "Equipe ajoutée!",
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
    [team]
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
                  {initialTeam ? "Modifier l'équipe" : "Créer une équipe"}
                </Dialog.Title>
                {validationError && (
                  <div className="bg-red-100 text-red-700 text-sm font-serif px-5 py-2 rounded-lg my-4">
                    <p>{validationError}</p>
                  </div>
                )}
                <div className="w-full mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Nom de l'équipe
                      </label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        name="name"
                        value={team.name}
                        onChange={(e) => {
                          onDataChange("name", e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                      >
                        Drapeau{" "}
                        {isUploading && (
                          <span className="text-gray-600">(chargement...)</span>
                        )}
                      </label>
                      <div
                        className="cursor-pointer"
                        title="Cliquer pour choisir l'image"
                        onClick={() => {
                          imageInputRef.current?.click();
                        }}
                      >
                        <img
                          src={team.flag}
                          alt=""
                          className={`rounded-md w-full ${
                            team.flag ? "h-auto" : "h-48"
                          } object-cover bg-gray-100`}
                        />
                      </div>
                      {/* <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="image"
                        name="image"
                        value={team.image}
                        onChange={(e) => {
                          onDataChange("image", e.target.value);
                        }}
                        required
                      /> */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        hidden
                      />
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        className="bg-primary hover:opacity-90 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        {isSubmitting
                          ? "Soumission..."
                          : initialTeam
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

export default TeamForm;

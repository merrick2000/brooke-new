import { Dialog, Transition } from "@headlessui/react";
import { AxiosResponse } from "axios";
import { Fragment, useState, useCallback } from "react";
import { toast } from "react-toastify";

export default function Delete({
  id,
  isOpen,
  onClose,
  onDelete,
  deleteRequest,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteRequest: (id: string) => Promise<AxiosResponse>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      const { data } = await deleteRequest(id);
      if (data.success) {
        onClose();
        onDelete();
        toast.success("Suppresion effectuée!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }, [id]);

  return (
    <>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Suppression de donnée
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Etes-vous sûr de vouloir supprimer cette donnée?
                    </p>
                  </div>
                  <div className="bg-gray-100 h-[1px] my-5" />
                  <div className="flex mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-6 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-6"
                      onClick={onClose}
                    >
                      Non
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-6 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Suppression..." : "Oui"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

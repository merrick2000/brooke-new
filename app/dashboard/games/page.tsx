"use client";
import { deleteMatch, getMatches } from "@/api/admin";
import GameForm from "@/components/Dashboard/Games/Form";
import GameResultForm from "@/components/Dashboard/Games/ResultForm";
import Delete from "@/components/Dashboard/Rewards/Delete";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LoadingData from "@/components/Utils/LoadingData";
import { formateDate } from "@/helpers";
import { STATUS } from "@/helpers/data";
import { convertMatchToGameSettings } from "@/helpers/games";
import useDisclosure from "@/hooks/useDisclosure";
import { IGamePopulated } from "@/types/IGame";
import React, { useState, useEffect, useCallback } from "react";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

export default function DashboardGames() {
  const [lists, setLists] = useState<{ items: IGamePopulated[] }>({
    items: [],
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const [selectedItem, setSelectedItem] = useState<IGamePopulated | null>(null);

  const {
    isOpen: isFormOpen,
    onClose: onFormClose,
    onOpen: onFormOpen,
  } = useDisclosure();

  const {
    isOpen: isResultFormOpen,
    onClose: onResultFormClose,
    onOpen: onResultFormOpen,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const params = {
          page,
          limit: 50,
        } as any;
        setStatus(STATUS.LOADING);
        const { data } = await getMatches(params);
        if (data.success) {
          setLists(data.data);
          setStatus(STATUS.LOADED);
        }
      } catch (error) {
        console.error(error);
        setStatus("FAILED");
      }
    };
    fetchLists();
  }, [page]);

  const onEditClick = (item: IGamePopulated) => {
    setSelectedItem(item);
    onFormOpen();
  };

  const onResultClick = (item: IGamePopulated) => {
    setSelectedItem(item);
    onResultFormOpen();
  };

  const onDeleteClick = (item: IGamePopulated) => {
    setSelectedItem(item);
    onDeleteOpen();
  };

  const onSaved = useCallback(
    (item: IGamePopulated) => {
      const itemExist = lists.items.find((r) => r.id === item.id);
      //if item id is present, update the item  else create a new item
      if (itemExist) {
        setLists((r) => ({
          ...r,
          items: r.items.map((r) => (r.id === item.id ? item : r)),
        }));
        setSelectedItem(null);
      } else {
        setLists((r) => ({
          ...r,
          items: [item, ...r.items],
        }));
      }
    },
    [lists]
  );

  const onDeleted = useCallback(() => {
    if (selectedItem) {
      setLists((d) => ({
        ...d,
        items: d.items.filter((r) => r.id !== selectedItem.id),
      }));
    }
  }, [selectedItem]);

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-semibold mb-8">
            Liste des matches
          </h1>
          <button
            onClick={onFormOpen}
            className="bg-primary hover:opacity-90 text-white font-bold font-serif py-1.5 px-8 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ajouter
          </button>
        </div>
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-serif">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Equipe 1
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Equipe 2
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Match Null
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bonus
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nbre de paris
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {lists.items.map((item: IGamePopulated) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Ajouté le: {formateDate(item.createdAt)}
                      <div>
                        Date du match:{" "}
                        <strong>
                          {formateDate(item.date, "DD/MM/YYYY hh:mm")}
                        </strong>
                      </div>
                    </th>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.teams[0]?.team?.flag}
                          alt=""
                          className="object-cover w-[60px] h-auto rounded-md"
                        />
                        <div className="ml-3">
                          <p>{item.teams[0]?.team?.name}</p>
                          <p className="text-gray-700">
                            {item.teams[0]?.points} pts
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.teams[1]?.team?.flag}
                          alt=""
                          className="object-cover w-[60px] h-auto rounded-md"
                        />
                        <div className="ml-3">
                          <p>{item.teams[1]?.team?.name}</p>
                          <p className="text-gray-700">
                            {item.teams[1]?.points} pts
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{item.nullPoints} pts</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-700">{item.bonusQuiz}</p>
                        <p className="text-gray-700">
                          Choix A: {item.bonusChoiceA}
                        </p>
                        <p className="text-gray-700">
                          Choix B: {item.bonusChoiceB}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700">{item._count.bets}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FiEdit2
                          onClick={() => onEditClick(item)}
                          className="w-4 h-4 text-gray-500 cursor-pointer mr-4"
                          title="Modifier"
                        />
                        <AiFillCheckCircle
                          onClick={() => onResultClick(item)}
                          className="w-5 h-5 text-gray-500 cursor-pointer mr-4"
                          title="Résultat"
                        />
                        <AiFillDelete
                          onClick={() => onDeleteClick(item)}
                          className="w-5 h-5 text-red-500 cursor-pointer"
                          title="Supprimer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {status === STATUS.LOADING ? (
              <>
                <LoadingData />
              </>
            ) : lists.items.length === 0 ? (
              <div className="text-base font-serif text-center my-5">
                Aucune match trouvé
              </div>
            ) : null}
          </div>
          <GameForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setSelectedItem(null);
            }}
            onSave={onSaved}
            initialData={
              selectedItem
                ? convertMatchToGameSettings(selectedItem)
                : undefined
            }
          />
          {selectedItem && (
            <GameResultForm
              isOpen={isResultFormOpen}
              onClose={() => {
                onResultFormClose();
                setSelectedItem(null);
              }}
              onSave={onSaved}
              initialData={convertMatchToGameSettings(selectedItem)}
            />
          )}
          {selectedItem && (
            <Delete
              id={selectedItem.id}
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              onDelete={onDeleted}
              deleteRequest={deleteMatch}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

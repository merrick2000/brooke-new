"use client";
import { deleteTeam, getTeams } from "@/api/admin";
import Delete from "@/components/Dashboard/Rewards/Delete";
import TeamForm from "@/components/Dashboard/Teams/Form";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LoadingData from "@/components/Utils/LoadingData";
import { formateDate } from "@/helpers";
import { STATUS } from "@/helpers/data";
import useDisclosure from "@/hooks/useDisclosure";
import { ITeam, IUser } from "@/types/IUser";
import React, { useState, useEffect, useCallback } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

export default function DashboardTeams() {
  const [teams, setTeams] = useState<{ items: ITeam[] }>({
    items: [],
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const [selectedItem, setSelectedItem] = useState<ITeam | null>(null);

  const {
    isOpen: isFormOpen,
    onClose: onFormClose,
    onOpen: onFormOpen,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const params = {
          page,
          limit: 50,
        } as any;
        setStatus(STATUS.LOADING);
        const { data } = await getTeams(params);
        if (data.success) {
          setTeams(data.data);
          setStatus(STATUS.LOADED);
        }
      } catch (error) {
        console.error(error);
        setStatus("FAILED");
      }
    };
    fetchTeams();
  }, [page]);

  const onEditClick = (item: ITeam) => {
    setSelectedItem(item);
    onFormOpen();
  };

  const onDeleteClick = (item: ITeam) => {
    setSelectedItem(item);
    onDeleteOpen();
  };

  const onSaved = useCallback(
    (item: ITeam) => {
      const itemExist = teams.items.find((r) => r.id === item.id);
      //if item id is present, update the item  else create a new item
      if (itemExist) {
        setTeams((r) => ({
          ...r,
          items: r.items.map((r) => (r.id === item.id ? item : r)),
        }));
        setSelectedItem(null);
      } else {
        setTeams((r) => ({
          ...r,
          items: [item, ...r.items],
        }));
      }
    },
    [teams]
  );
  const onDeleted = useCallback(() => {
    if (selectedItem) {
      setTeams((d) => ({
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
            Liste des équipes
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
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Drapeau
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.items.map((item: ITeam) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {formateDate(item.createdAt)}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.flag}
                        alt=""
                        className="object-cover w-[60px] h-auto rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FiEdit2
                          onClick={() => onEditClick(item)}
                          className="w-4 h-4 text-gray-500 cursor-pointer mr-4"
                          title="Modifier"
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
            ) : teams.items.length === 0 ? (
              <div className="text-base font-serif text-center my-5">
                Aucune équipe trouvée
              </div>
            ) : null}
          </div>
          <TeamForm
            isOpen={isFormOpen}
            onClose={() => {
              onFormClose();
              setSelectedItem(null);
            }}
            onSave={onSaved}
            initialTeam={selectedItem}
          />
          {selectedItem && (
            <Delete
              id={selectedItem.id}
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              onDelete={onDeleted}
              deleteRequest={deleteTeam}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

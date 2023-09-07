"use client";
import { deleteReward, getRewards } from "@/api/rewards";
import Delete from "@/components/Dashboard/Rewards/Delete";
import RewardForm from "@/components/Dashboard/Rewards/Form";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LoadingData from "@/components/Utils/LoadingData";
import { formateDate } from "@/helpers";
import { STATUS } from "@/helpers/data";
import useDisclosure from "@/hooks/useDisclosure";
import { IReward } from "@/types/IUser";
import React, { useState, useEffect, useCallback } from "react";
//icons
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

export default function DashboardRewards() {
  const [rewards, setRewards] = useState<{ items: IReward[] }>({
    items: [],
  });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState<IReward | null>(null);

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
    const fetchRewards = async () => {
      try {
        const params = {
          page,
          orderBy: "desc",
        } as any;
        setStatus(STATUS.LOADING);
        const { data } = await getRewards(params);
        if (data.success) {
          setRewards(data.data);
          setStatus(STATUS.LOADED);
        }
      } catch (error) {
        console.error(error);
        setStatus("FAILED");
      }
    };
    fetchRewards();
  }, [page]);

  /* const handlePageChange = (event, value) => {
    setPage(value);
  }; */

  const onEditClick = (item: IReward) => {
    setSelectedItem(item);
    onFormOpen();
  };

  const onDeleteClick = (item: IReward) => {
    setSelectedItem(item);
    onDeleteOpen();
  };

  const onRewardSaved = useCallback(
    (item: IReward) => {
      const itemExist = rewards.items.find((r) => r.id === item.id);
      //if item id is present, update the item  else create a new item
      if (itemExist) {
        setRewards((r) => ({
          ...r,
          items: r.items.map((r) => (r.id === item.id ? item : r)),
        }));
        setSelectedItem(null);
      } else {
        setRewards((r) => ({
          ...r,
          items: [item, ...r.items],
        }));
      }
    },
    [rewards]
  );
  const onDeleted = useCallback(() => {
    if (selectedItem) {
      setRewards((d) => ({
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
            Liste des récompenses
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
                    Classement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rewards.items.map((reward: IReward) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {formateDate(reward.createdAt)}
                    </th>
                    <td className="px-6 py-4">{reward.rank}</td>
                    <td className="px-6 py-4">{reward.title}</td>
                    <td className="px-6 py-4">
                      <img
                        src={reward.image}
                        alt=""
                        className="object-cover h-[60px] w-32 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FiEdit2
                          onClick={() => onEditClick(reward)}
                          className="w-4 h-4 text-gray-500 cursor-pointer mr-4"
                          title="Modifier"
                        />
                        <AiFillDelete
                          onClick={() => onDeleteClick(reward)}
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
            ) : rewards.items.length === 0 ? (
              <div className="text-base font-serif text-center my-5">
                Aucune récompense trouvée
              </div>
            ) : null}
          </div>
          {selectedItem && (
            <Delete
              id={selectedItem.id}
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              onDelete={onDeleted}
              deleteRequest={deleteReward}
            />
          )}
          <RewardForm
            isOpen={isFormOpen}
            onClose={onFormClose}
            onSave={onRewardSaved}
            initialReward={selectedItem}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

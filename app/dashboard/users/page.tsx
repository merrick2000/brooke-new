"use client";
import { getUsers } from "@/api/admin";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LoadingData from "@/components/Utils/LoadingData";
import { formateDate } from "@/helpers";
import { STATUS } from "@/helpers/data";
import { IUser } from "@/types/IUser";
import React, { useState, useEffect } from "react";

export default function DashboardUsers() {
  const [users, setUsers] = useState({
    items: [],
  });
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = {
          page,
          role: "user",
        } as any;
        if (searchText.length > 0) {
          params.query = searchText;
        }
        setStatus(STATUS.LOADING);
        const { data } = await getUsers(params);
        if (data.success) {
          setUsers(data.data);
          setStatus(STATUS.LOADED);
        }
      } catch (error) {
        console.error(error);
        setStatus("FAILED");
      }
    };
    fetchUsers();
  }, [page, searchText]);

  /* const handlePageChange = (event, value) => {
    setPage(value);
  }; */

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-semibold mb-8">
            Liste des utilisateurs
          </h1>
        </div>
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-serif">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Inscrit le
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nom d'utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date de naissance
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.items.map((u: IUser) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {formateDate(u.createdAt)}
                    </th>
                    <td className="px-6 py-4">{u.username}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      {u.birthDate ? formateDate(u.birthDate) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {status === STATUS.LOADING ? (
              <>
                <LoadingData />
              </>
            ) : users.items.length === 0 ? (
              <div className="text-base font-serif text-center my-5">
                Aucun utilisateur
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

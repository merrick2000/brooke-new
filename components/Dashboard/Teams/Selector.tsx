import { getTeams } from "@/api/admin";
import { STATUS } from "@/helpers/data";
import { ITeam } from "@/types/IUser";
import React, { useEffect, useState } from "react";

interface TeamSelectorProps {
  value: string;
  onChange: (v: any) => void;
  label: string;
  disabled: boolean;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => {
  const [teams, setTeams] = useState<{ items: ITeam[] }>({
    items: [],
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const params = {
          page: 1,
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
  }, []);

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="countries"
      >
        {label}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabled}
      >
        <option selected>Equipe</option>
        {teams.items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;

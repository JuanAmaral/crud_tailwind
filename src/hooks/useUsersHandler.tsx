import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUsers } from "@/api/list";
import { useUserContext } from "@/context/userContext";

const useUsersHandler = () => {
  const [loadingList, setLoadingList] = useState(true);
  const { users, setUsers } = useUserContext();

  const handleUsers = async () => {
    //uma promise diferente com o toatify
    const promise = getUsers();
    toast.promise(promise, {
      pending: {
        render: () => "Carregando...",
      },
      success: {
        render: ({ data }) => {
          setUsers((prevUsers) => {
            return [...prevUsers, ...data.data];
          });
          setLoadingList(false);
          return "Lista de nomes carregada com sucesso!";
        },
      },
      error: {
        render: ({ data }) => {
          setLoadingList(false);
          return "Erro ao carregar lista";
        },
      },
    });
  };

  return { loadingList, users, setUsers, handleUsers };
};

export default useUsersHandler;

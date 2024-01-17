import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUsers } from "@/api/list";

const useUsersHandler = () => {
  const [loadingList, setLoadingList] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]); // Adicione o tipo IUser[]

  const handleUsers = async () => {
    const promise = getUsers();
    toast.promise(promise, {
      pending: {
        render: () => "Carregando...",
      },
      success: {
        render: ({ data }) => {
          setUsers(data.data);
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

  useEffect(() => {
    handleUsers();
  }, []);

  return { loadingList, users, setUsers, handleUsers };
};

export default useUsersHandler;

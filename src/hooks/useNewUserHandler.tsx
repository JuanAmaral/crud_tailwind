// useNewUserHandler.ts
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "@/api/list";
import useUsersHandler from "./useUsersHandler";
import { useUserContext } from "@/context/userContext";

const useNewUserHandler = () => {
  //geralmente faço assim na minha empresa, mas retornando o erro do servidor para usuário, não retornei pq o erro dessa api tem muito lixo descenessário
  const { users, setUsers } = useUserContext();

  const [loadingButton, setLoadingButton] = useState(false);
  const [name, setName] = useState("");

  const newUser = async () => {
    if (!name) return toast.error("Digite um nome válido");
    setLoadingButton(true);

    try {
      const { data } = await addUser(name);

      // Utiliza o callback no setUsers para garantir a atualização correta
      setUsers((prevUsers) => [...prevUsers, data]);

      setName("");
      toast.success("Nome adicionado");
    } catch (error) {
      toast.error("Erro ao adicionar nome");
    } finally {
      setLoadingButton(false);
    }
  };

  return { loadingButton, name, setName, newUser };
};

export default useNewUserHandler;

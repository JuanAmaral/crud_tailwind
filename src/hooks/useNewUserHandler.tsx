import { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "@/api/list";
import useUsersHandler from "./useUsersHandler";

const useNewUserHandler = () => {
  const { setUsers } = useUsersHandler();
  const [loadingButton, setLoadingButton] = useState(false);
  const [name, setName] = useState("");

  const newUser = async () => {
    if (!name) return toast.error("Digite um nome válido");
    setLoadingButton(true);
    toast.clearWaitingQueue();

    try {
      const { data } = await addUser(name);
      setUsers((prevUsers) => (data ? [...prevUsers, data] : prevUsers));
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

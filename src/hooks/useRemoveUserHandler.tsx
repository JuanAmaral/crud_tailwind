import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../api/list";

const useRemoveUserHandler = () => {
  //geralmente faço assim na minha empresa, mas retornando o erro do servidor para usuário, não retornei pq o erro dessa api tem muito lixo descenessário

  const { setUsers } = useUserContext();
  const [deletingId, setDeletingId] = useState<number | null>();

  const removeUser = async (id: number) => {
    if (!id) return toast.error("Id não encontrado");
    toast.clearWaitingQueue();

    const { data, error } = await deleteUser(id);
    if (data) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeletingId(null);
      toast.success("Nome deletado");
    }
    if (error) {
      toast.error("Erro ao deletar nome");
    }
  };

  return { deletingId, setDeletingId, removeUser };
};

export default useRemoveUserHandler;

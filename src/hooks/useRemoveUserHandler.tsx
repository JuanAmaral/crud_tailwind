import { toast } from "react-toastify";
import { deleteUser } from "../api/list";
import useUsersHandler from "./useUsersHandler";

const useRemoveUserHandler = () => {
  const { setUsers, handleUsers } = useUsersHandler();

  const removeUser = async (id: number) => {
    if (!id) return toast.error("Id não encontrado");
    toast.clearWaitingQueue();

    try {
      const { data } = await deleteUser(id);
      if (data) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("Nome deletado");
      }
    } catch (error) {
      handleUsers();
      toast.error("Erro ao deletar nome");
    }
  };

  return { removeUser };
};

export default useRemoveUserHandler;

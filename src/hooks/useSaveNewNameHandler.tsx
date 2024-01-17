import { toast } from "react-toastify";
import { editUser } from "../api/list";
import useUsersHandler from "./useUsersHandler";

const useSaveNewNameHandler = () => {
  const { setUsers, handleUsers } = useUsersHandler();

  const saveNewName = async (id: number, newName: string) => {
    if (newName === "") return;
    toast.clearWaitingQueue();

    try {
      const { data, error } = await editUser(id, newName);

      if (data) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, name: newName } : user
          )
        );
        toast.success("Nome editado com sucesso");
      }

      if (error) {
        handleUsers();
        toast.error("Erro ao editar nome");
      }
    } catch (error) {
      console.error("Erro ao processar a edição de nome:", error);
      toast.error("Erro interno ao editar nome");
    } finally {
      toast.clearWaitingQueue();
    }
  };

  return { saveNewName };
};

export default useSaveNewNameHandler;

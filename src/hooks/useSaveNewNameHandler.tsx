import { useUserContext } from "@/context/userContext";
import { toast } from "react-toastify";
import { editUser } from "../api/list";

const useSaveNewNameHandler = () => {
  //geralmente faço assim na minha empresa, mas retornando o erro do servidor para usuário, não retornei pq o erro dessa api tem muito lixo descenessário

  const { setUsers } = useUserContext();

  const saveNewName = async (id: number, newName: string) => {
    if (newName === "") return;
    toast.clearWaitingQueue();

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
      toast.error("Erro ao editar nome");
    }
  };

  return { saveNewName };
};

export default useSaveNewNameHandler;

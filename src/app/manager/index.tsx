"use client";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import pencil from "../../../public/pencil.svg";
import trash from "../../../public/trash.svg";

import { useUserContext } from "@/context/userContext";
import useNewUserHandler from "@/hooks/useNewUserHandler";
import useRemoveUserHandler from "@/hooks/useRemoveUserHandler";
import useSaveNewNameHandler from "@/hooks/useSaveNewNameHandler";
import useUsersHandler from "@/hooks/useUsersHandler";
interface EditingNames {
  [key: number]: {
    name: string;
  };
}
export default function Manager() {
  const [editingNames, setEditingNames] = useState<EditingNames>({});

  const { users } = useUserContext();

  const { loadingList, handleUsers } = useUsersHandler();
  const { loadingButton, name, setName, newUser } = useNewUserHandler();
  const { removeUser, deletingId, setDeletingId } = useRemoveUserHandler();
  const { saveNewName } = useSaveNewNameHandler();

  useEffectOnce(() => {
    handleUsers();
  });

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
      <h1 className="text-3xl">Lista de nomes</h1>
      <div className="flex mt-10 flex-col align-center bg-white w-full rounded p-5 max-w-sm text-black ">
        <div className="flex gap-2">
          <input
            className="border border-solid border-black rounded pl-2 w-[50%]"
            placeholder={"Digite um nome"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {!loadingButton ? (
            <button
              className="bg-blue-500 rounded w-[50%] p-2 text-white"
              onClick={() => newUser()}
            >
              Adicionar
            </button>
          ) : (
            <button className="bg-blue-500 rounded w-[50%] p-2 text-white">
              Adicionando...
            </button>
          )}
        </div>
      </div>

      <div className="flex mt-10 flex-col align-center bg-white w-full rounded p-5 max-w-sm gap-2">
        {!loadingList && users ? (
          <>
            {users
              ?.slice()
              .reverse()
              .map((value, index) => (
                <div
                  className={`flex justify-between border border-solid border-black rounded pl-2 ${
                    value.id === deletingId
                      ? "bg-red-500 text-white"
                      : "bg-white-500 text-black"
                  }`}
                  key={value.id}
                >
                  <>
                    <div className="p-2">
                      <input
                        className="bg-transparent border-b border-solid border-gray-400 pl-1"
                        value={
                          value.id === deletingId
                            ? "Deletando... "
                            : editingNames[value.id]?.name !== undefined
                            ? editingNames[value.id]?.name
                            : value.name
                        }
                        onChange={(e) =>
                          setEditingNames((prevEditingNames) => ({
                            ...prevEditingNames,
                            [value.id]: { name: e.target.value },
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveNewName(value.id, editingNames[value.id]?.name);
                          }
                        }}
                        onBlur={() =>
                          saveNewName(value.id, editingNames[value.id]?.name)
                        }
                      ></input>
                    </div>
                    <div className="flex">
                      {value.id in editingNames &&
                        editingNames[value.id].name !== undefined && (
                          <button
                            className="pr-2"
                            onClick={() => {
                              saveNewName(
                                value.id,
                                editingNames[value.id].name
                              );
                            }}
                          >
                            <Image
                              src={pencil}
                              width={20}
                              height={20}
                              alt="ícone de de lápis"
                            />
                          </button>
                        )}
                      <button
                        className="pr-2"
                        onClick={() => {
                          removeUser(value.id);
                          setDeletingId(value.id);
                        }}
                      >
                        <Image
                          src={trash}
                          width={20}
                          height={20}
                          alt="ícone de uma lixeira"
                        />
                      </button>
                    </div>
                  </>
                </div>
              ))}
          </>
        ) : (
          <div className="flex mt-10 flex-col align-center bg-white w-full rounded p-5 max-w-sm ">
            <LoadingSkeleton />
          </div>
        )}
      </div>
    </section>
  );
}

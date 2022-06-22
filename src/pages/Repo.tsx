import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repos, Repository } from "./Repos";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    //chamada api para atualizar a description do repo

    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...Repos, description: "Testando..." };
        } else {
          return repo;
        }
      });
      queryClient.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}></button>
    </div>
  );
}

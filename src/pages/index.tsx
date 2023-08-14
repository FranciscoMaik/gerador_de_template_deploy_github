import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useForm, TypeItem } from '../functions/useForm';

const Home: React.FC = function () {
  const {
    addItem,
    addPullRequest,
    generateMarkdown,
    itemsAdd,
    pullRequestAdd,
    setItemsAdd,
    setPullRequestAdd,
  } = useForm();

  return (
    <div>
      <h4>Items</h4>
      <form onSubmit={addItem}>
        <p>Descrição</p>
        <input
          type="text"
          value={itemsAdd?.description}
          onChange={value =>
            setItemsAdd({ ...itemsAdd, description: value.target.value })
          }
        />
        <p>Tipo</p>
        <select
          id="frutas"
          name="frutas"
          value={itemsAdd.type}
          onChange={value =>
            setItemsAdd({ ...itemsAdd, type: value.target.value as TypeItem })
          }
        >
          <option value="feat">Feat</option>
          <option value="fix">Fix</option>
          <option value="style">Style</option>
          <option value="refactor">Refactor</option>
          <option value="test">Test</option>
          <option value="chore">Chore</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      <h4>PRs</h4>
      <form onSubmit={addPullRequest}>
        <p>Número da PR</p>
        <input
          type="text"
          value={pullRequestAdd?.description}
          onChange={value =>
            setPullRequestAdd({
              ...pullRequestAdd,
              description: value.target.value,
            })
          }
        />

        <button type="submit">Adicionar</button>
      </form>

      <h4>Resultado</h4>

      <ReactMarkdown>{generateMarkdown}</ReactMarkdown>
    </div>
  );
};

export default Home;

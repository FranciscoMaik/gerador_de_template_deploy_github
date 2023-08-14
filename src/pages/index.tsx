import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useForm, TypeItem } from '../functions/useForm';

import * as S from '../styles/page';

const Home: React.FC = function () {
  const {
    addItem,
    addPullRequest,
    generateMarkdown,
    itemsAdd,
    pullRequestAdd,
    setItemsAdd,
    setPullRequestAdd,
    handleCopyClick,
  } = useForm();

  return (
    <S.Container>
      <h4>Items</h4>
      <S.Form onSubmit={addItem}>
        <div>
          <p>Descrição</p>
          <input
            type="text"
            value={itemsAdd?.description}
            onChange={value =>
              setItemsAdd({ ...itemsAdd, description: value.target.value })
            }
          />
        </div>

        <div>
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
        </div>

        <button type="submit">Adicionar</button>
      </S.Form>

      <h4>PRs</h4>
      <S.Form onSubmit={addPullRequest}>
        <div>
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
        </div>

        <button type="submit">Adicionar</button>
      </S.Form>

      <h4>Resultado</h4>
      <ReactMarkdown>{generateMarkdown}</ReactMarkdown>

      <button type="button" onClick={handleCopyClick}>
        Copiar
      </button>
    </S.Container>
  );
};

export default Home;

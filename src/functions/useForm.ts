import { FormEvent, useMemo, useState } from 'react';
import uuid from 'react-uuid';

export type TypeItem = 'feat' | 'fix' | 'style' | 'refactor' | 'test' | 'chore';

interface ItemsProps {
  id: string;
  description: string;
  type: TypeItem;
}

interface PRProps {
  id: string;
  description: string;
}

export const useForm = () => {
  const [items, setItems] = useState<Array<ItemsProps>>([]);
  const [itemsAdd, setItemsAdd] = useState<ItemsProps>({
    id: '',
    description: '',
    type: 'feat',
  } as ItemsProps);
  const [pullRequest, setPullRequest] = useState<Array<PRProps>>([]);
  const [pullRequestAdd, setPullRequestAdd] = useState<PRProps>({
    description: '',
    id: '',
  } as PRProps);

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems(prevState => [...prevState, { ...itemsAdd, id: uuid() }]);
    setItemsAdd({ description: '', type: 'feat', id: '' });
  };

  const addPullRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPullRequest(prevState => [
      ...prevState,
      { ...pullRequestAdd, id: uuid() },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(prevState => prevState.filter(item => item.id !== id));
  };

  const removePullRequest = (id: string) => {
    setPullRequest(prevState => prevState.filter(item => item.id !== id));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(generateMarkdown).then(() => {
      // eslint-disable-next-line no-alert
      alert('Markdown copiado com sucesso');
    });
  };

  const filterItemsForType = (type: TypeItem) =>
    items
      .filter(item => item.type === type)
      .map((item, index) => `${index + 1}. ${item.description}`)
      .join('; ');

  const generateMarkdown = useMemo(() => {
    const markdownPR = pullRequest
      .map((item, index) => `${index + 1}. #${item.description}`)
      .join('; ');

    const markdown = `
      ## Descrição
      Nesta _branch_ contém as seguintes alterações:

      ### Novas funcionalidades
      ${filterItemsForType('feat')}

      ### Correções
      ${filterItemsForType('fix')}

      ### Estilos
      ${filterItemsForType('style')}

      ### Refatorações
      ${filterItemsForType('refactor')}

      ### Testes
      ${filterItemsForType('test')}

      ### Mudanças em arquivos
      ${filterItemsForType('chore')}

      ## Pull Requests
      ${markdownPR}`;

    return markdown;
  }, [items, pullRequest]);

  return {
    addItem,
    addPullRequest,
    generateMarkdown,
    itemsAdd,
    setItemsAdd,
    pullRequestAdd,
    setPullRequestAdd,
    handleCopyClick,
    removeItem,
    removePullRequest,
    items,
    pullRequest,
  };
};

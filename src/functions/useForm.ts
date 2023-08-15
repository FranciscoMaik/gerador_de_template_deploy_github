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
    setPullRequestAdd({ description: '', id: '' });
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

  const toCapitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const filterItemsForType = (type: TypeItem) =>
    items
      .filter(item => item.type === type)
      .map((item, index) => `${index + 1}. ${toCapitalize(item.description)}`)
      .join(';\n');

  const generateMarkdown = useMemo(() => {
    const markdownPR = pullRequest
      .map((item, index) => `${index + 1}. #${toCapitalize(item.description)}`)
      .join(';\n');

    const markdown = `## Descrição\nNesta _branch_ contém as seguintes alterações:\n\n### Novas funcionalidades\n${filterItemsForType(
      'feat'
    )}\n\n### Correções\n${filterItemsForType(
      'fix'
    )}\n\n### Estilos\n${filterItemsForType(
      'style'
    )}\n\n### Refatorações\n${filterItemsForType(
      'refactor'
    )}\n\n### Testes\n${filterItemsForType(
      'test'
    )}\n\n### Mudanças em arquivos\n${filterItemsForType(
      'chore'
    )}\n\n## Pull Requests\n${markdownPR}`;

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

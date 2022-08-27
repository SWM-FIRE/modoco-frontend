import blockInterface from '../../interface/block.interface';

export const filterData = (data: blockInterface[], searchInput: string) => {
  const newData = searchInput
    ? data.filter((block: blockInterface) =>
        // eslint-disable-next-line no-nested-ternary
        block.tags.some((blockTag) =>
          blockTag.toLowerCase().includes(searchInput.toLowerCase()),
        )
          ? block
          : block.title.toLowerCase().includes(searchInput.toLowerCase())
          ? block
          : null,
      )
    : data;

  return newData;
};

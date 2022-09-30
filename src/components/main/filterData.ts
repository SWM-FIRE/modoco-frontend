import blockInterface from '../../interface/block.interface';

export const filterData = (data, searchInput: string) => {
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

  newData?.sort((a, b) => {
    if (a.current > b.current) {
      return -1;
    }
    if (a.current < b.current) {
      return 1;
    }
    return 0;
  });
  return newData;
};

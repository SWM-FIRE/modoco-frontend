import blockInterface from '../../interface/block.interface';

export const filterData = (data: blockInterface[], tag: string) => {
  const newData = data.filter((block: blockInterface) =>
    block.tags.some((blockTag) =>
      blockTag.toLowerCase().includes(tag.toLowerCase()),
    ) || block.tags.length === 0
      ? block
      : null,
  );

  return newData;
};

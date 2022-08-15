import blockInterface from '../../interface/block.interface';

export const filterData = (data: blockInterface[], tag: string) => {
  const newData = tag
    ? data.filter((block: blockInterface) =>
        block.tags.some((blockTag) =>
          blockTag.toLowerCase().includes(tag.toLowerCase()),
        )
          ? block
          : null,
      )
    : data;

  return newData;
};

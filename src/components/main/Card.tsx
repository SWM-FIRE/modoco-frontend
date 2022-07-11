import React from 'react';
import styled from 'styled-components';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export function Card({ title, itemId }: { title: string; itemId: string }) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(title);

  return (
    <CardContainer>
      <div>
        <div style={{ backgroundColor: 'white' }}>block{itemId}</div>
        <div style={{ backgroundColor: visible ? 'transparent' : 'gray' }}>
          visible: {JSON.stringify(visible)}
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'bisque',
          height: '200px',
        }}
      />
    </CardContainer>
  );
}

const CardContainer = styled.div`
  border: 1px solid;
  display: inline-block;
  margin: 0 10px;
  width: 160px;
`;

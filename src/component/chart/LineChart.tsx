import React from 'react';
import { VictoryGroup, VictoryLine } from 'victory-native';

import { max, min, sum } from '../../transformation/collection';
import theme, { deepOrange600, teal700 } from './theme';

export interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  data: DataPoint[];
}

export default function LineChart(props: Props) {
  const { data } = props;
  const minx = min<DataPoint>((d) => d.x, data);
  const maxx = max<DataPoint>((d) => d.x, data);
  const miny = min<DataPoint>((d) => d.y, data);
  const maxy = max<DataPoint>((d) => d.y, data);
  const average = sum<DataPoint>((d) => d.y, data) / data.length;

  return (
    <VictoryGroup
      height={60}
      width={150}
      padding={0}
      theme={theme}
      animate={{
        duration: 2000,
      }}
      domain={{
        x: [minx, maxx],
        y: [miny, maxy],
      }}
    >
      <VictoryLine
        data={data}
        style={{
          data: {
            stroke: deepOrange600,
          },
        }}
        x="x"
        y="y"
      />
      <VictoryLine
        data={[
          { x: minx, y: average },
          { x: maxx, y: average },
        ]}
        style={{
          data: {
            stroke: teal700,
            strokeDasharray: '2',
          },
        }}
        x="x"
        y="y"
      />
    </VictoryGroup>
  );
}

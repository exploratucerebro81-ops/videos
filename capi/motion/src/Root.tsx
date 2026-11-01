import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';

export const Root: React.FC = () => (
  <Composition
    id="Capi"
    component={Video}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{escenas: [], proyecto: ''} as any}
    calculateMetadata={({props}: any) => ({
      durationInFrames: Math.max(30, props.escenas.reduce((a: number, e: any) => a + e.frames, 0)),
    })}
  />
);

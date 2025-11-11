/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'wordcloud' {
  type WordCloudOptions = {
    list: Array<[string, number]>;
    gridSize?: number;
    weightFactor?: number | ((size: number) => number);
    fontFamily?: string;
    color?:
      | string
      | ((
          word: string,
          weight: number,
          fontSize?: number,
          distance?: number
        ) => string);
    backgroundColor?: string;
    rotateRatio?: number;
    rotationSteps?: number;
    shape?: string;
    minSize?: number;
    drawOutOfBound?: boolean;
    shrinkToFit?: boolean;
  };

  function WordCloud(
    canvas: HTMLCanvasElement,
    options: WordCloudOptions
  ): void;
  export default WordCloud;
}

interface ImportMetaEnv {
  readonly VITE_API_BOOKMARK_PREFIX: string;
}

type ImageInfo = {
    size: { height: number; width: number };
    position: { top: number; left: number };
    rotation: number;
  };
  
type Lookup = {
    [key: string]: ImageInfo;
  };
  
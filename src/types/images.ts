
export interface Image {
    _type: "image";
    _key: string;
    asset: ImageAsset;
  }
  export interface ImageAsset {
    _ref: string;
    _type: "reference";
  }
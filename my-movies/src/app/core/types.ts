import { CardModel } from '../catalog/card/card-model.interface';

export type CardFilter = (card: CardModel) => boolean;

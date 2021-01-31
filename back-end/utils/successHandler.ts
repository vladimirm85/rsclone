import { Response } from 'express';
import {
  UserDocumentInterface,
  SaveDocumentInterface,
  LevelStatInterface,
  TotalScoreDocumentInterface,
} from 'home/vladimir/WebstormProjects/rsclone/back-end/models';

type DocumentTime =
  | UserDocumentInterface
  | SaveDocumentInterface
  | SaveDocumentInterface[]
  | LevelStatInterface
  | LevelStatInterface[]
  | TotalScoreDocumentInterface
  | TotalScoreDocumentInterface[]
  | string;

export const successHandler = (res: Response, code: number, document: DocumentTime): Response =>
  res.status(code).json({
    success: true,
    payload: document,
  });

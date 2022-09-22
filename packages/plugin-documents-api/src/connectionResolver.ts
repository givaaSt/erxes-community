import * as mongoose from 'mongoose';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import { IDocumentModel, loadDocumentClass } from './models/document';
import { IDocumentDocument } from './models/definitions/template';

export interface IModels {
  Documents: IDocumentModel;
}

export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export let models: IModels | null = null;

export const loadClasses = (db: mongoose.Connection): IModels => {
  models = {} as IModels;

  models.Documents = db.model<IDocumentDocument, IDocumentModel>(
    'document',
    loadDocumentClass(models)
  );

  return models;
};

export const generateModels = createGenerateModels<IModels>(
  models,
  loadClasses
);

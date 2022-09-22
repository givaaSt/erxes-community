import { Model } from 'mongoose';
import * as _ from 'underscore';
import { IModels } from '../connectionResolver';
import {
  IDocument,
  IDocumentDocument,
  documentSchema
} from './definitions/template';

export interface IDocumentModel extends Model<IDocumentDocument> {
  updateDocument(_id: any, doc: IDocument);
  getDocument(_id: any);
  createDocument(doc: IDocument): Promise<IDocumentDocument>;
  removeDocument(documentIds: string[]): Promise<IDocumentDocument>;
  editDocument(_id: string, doc: IDocument): Promise<IDocumentDocument>;
  getDocument(_id: string): Promise<IDocumentDocument>;
}

export const loadDocumentClass = (models: IModels) => {
  class Document {
    public static async createDocument(doc: IDocument) {
      const document = await models.Documents.create({
        ...doc,
        createdAt: new Date(),
        modifiedAt: new Date()
      });

      return document;
    }

    public static async editDocument(_id: string, doc) {
      await models.Documents.updateOne(
        { _id },
        { $set: { ...doc, modifiedAt: new Date() } }
      );
      return models.Documents.findOne({ _id });
    }

    public static async removeDocument(documentIds) {
      console.log(documentIds, 'hdhdhdhdhhdhdhdhdhdhdhdhhd');

      return models.Documents.deleteMany({ _id: { $in: documentIds } });
    }

    public static async getDocument(_id: string) {
      const document = await models.Documents.findOne({ _id });

      if (!document) {
        throw new Error('Document not found');
      }

      return document;
    }
  }

  documentSchema.loadClass(Document);

  return documentSchema;
};

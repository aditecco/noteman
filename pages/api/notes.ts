/* ---------------------------------
notes
--------------------------------- */

import { connectToDatabase } from "../../util/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { UserGeneratedNoteContent } from "../../types";
import { Db, ObjectId } from "mongodb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { db }: { db: Db } = await connectToDatabase();

  switch (req.method) {
    /**
     * NOTES.INSERT
     * @param content
     * @returns {string}
     */
    case "POST": {
      const {
        content,
        userId,
      }: { content: UserGeneratedNoteContent; userId: string } = req.body;

      if (!content?.title || !content?.body) {
        throw new Error("Missing or invalid members 'title' or 'body'.");
      }

      // TODO
      // if (!userId) {
      //   throw new Error("Not authorized.");
      // }

      if (
        typeof content.title !== "string" ||
        typeof content.body !== "string"
      ) {
        throw new Error("Illegal format.");
      }

      // this will return the ID of the newly created note
      const { ops } = await db.collection("notes").insertOne({
        ...content,
        userId,
        timestamp: Date.now(),
      });

      return res.json(ops);
    }

    /**
     * NOTES.UPDATE
     * @param args
     * @returns {number}
     */
    case "PUT": {
      const {
        args: [id, content],
      }: { args: [string, UserGeneratedNoteContent] } = req.body;

      if (!id || !content?.title || !content?.body) {
        throw new Error("Missing or invalid param 'id' or 'content'.");
      }

      // TODO
      // if (!this.userId) {
      //   throw new Error("Not authorized.");
      // }

      // const canWrite = NotesCollection.findOne({ _id: id, userId: this.userId });

      // if (!canWrite) {
      //   throw new Error("Access denied.");
      // }

      if (
        typeof id !== "string" ||
        typeof content.title !== "string" ||
        typeof content.body !== "string"
      ) {
        throw new Error("Illegal format.");
      }

      const updated = await db
        .collection("notes")
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...content } });

      return res.json(updated);
    }

    /**
     * NOTES.REMOVE
     * @param id
     * @returns {number}
     */
    case "DELETE": {
      const { id }: { id: string } = req.body;

      if (!id) {
        throw new Error("Missing or invalid param 'id'.");
      }

      // TODO
      // if (!userId) {
      //   throw new Error("Not authorized.");
      // }

      // const canWrite = NotesCollection.findOne({
      //   _id: id,
      //   userId: this.userId,
      // });
      //
      // if (!canWrite) {
      //   throw new Meteor.Error("Access denied.");
      // }

      if (typeof id !== "string") {
        throw new Error("Illegal format.");
      }

      const deleted = await db
        .collection("notes")
        .deleteOne({ _id: new ObjectId(id) });

      return res.json(deleted);
    }

    case "GET":
    default: {
      const notes = await db
        .collection("notes")
        // .find({ userId: user?._id },)
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray();

      return res.json(notes);
    }
  }
}

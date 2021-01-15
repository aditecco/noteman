/* ---------------------------------
Types
--------------------------------- */

import { Meteor } from "meteor/meteor";
import React from "react";
import User = Meteor.User;

export interface UserGeneratedNoteContent {
  title: string;
  body: string;
  tags?: string[];
}

export interface INote extends UserGeneratedNoteContent {
  _id: string;
  userId: User["_id"];
  timestamp: number;
}

export type ActionDef = {
  name: string;
  icon?: string;
  callback: (e: React.MouseEvent) => void;
};

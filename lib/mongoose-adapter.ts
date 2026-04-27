import mongoose from "mongoose";
import type {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  VerificationToken,
} from "@auth/core/adapters";
import dbConnect from "./mongoose-db";
import {
  accountSchema,
  sessionSchema,
  userSchema,
  verificationTokenSchema,
} from "@/models/user";
import { formatPhoneNumber, toTitleCase } from "./utils";

export const format = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {};
    for (const key in object) {
      const value = object[key];
      if (key === "_id") {
        newObject.id = value.toHexString();
      } else if (key === "userId") {
        newObject[key] = value.toHexString();
      } else {
        newObject[key] = value;
      }
    }
    return newObject as T;
  },
};

export function MongooseAdapter(): Adapter {
  const { from } = format;

  // Import mongoose directly for model registration

  const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
  const AccountModel =
    mongoose.models.Account || mongoose.model("Account", accountSchema);
  const SessionModel =
    mongoose.models.Session || mongoose.model("Session", sessionSchema);
  const VerificationTokenModel =
    mongoose.models.VerificationToken ||
    mongoose.model("VerificationToken", verificationTokenSchema);

  return {
    async createUser(data) {
      await dbConnect();
      data.name = toTitleCase(data.name || "");
      data.companyName = toTitleCase(data.companyName || "");
      data.phone = formatPhoneNumber(data.phone || "");
      data.role = "USER";
      const user = await UserModel.create(data);
      return from<AdapterUser>(user);
    },
    async getUser(id) {
      try {
        await dbConnect();
        const user = await UserModel.findById(id).lean();
        if (!user) return null;
        return from<AdapterUser>(user);
      } catch {
        return null;
      }
    },
    async getUserByEmail(email) {
      await dbConnect();
      const user = await UserModel.findOne({ email: email }).lean();
      if (!user) return null;
      return from<AdapterUser>(user);
    },
    async getUserByAccount(provider_providerAccountId) {
      await dbConnect();
      const account = await AccountModel.findOne(
        provider_providerAccountId,
      ).lean();
      if (!account) return null;
      const user = await UserModel.findById(account.userId).lean();
      if (!user) return null;
      return from<AdapterUser>(user);
    },
    async updateUser(data) {
      await dbConnect();
      const user = await UserModel.findByIdAndUpdate(data.id, data, {
        new: true,
      }).lean();
      return from<AdapterUser>(user!);
    },
    async deleteUser(id) {
      await dbConnect();
      await Promise.all([
        AccountModel.deleteMany({ userId: id }),
        SessionModel.deleteMany({ userId: id }),
        UserModel.findByIdAndDelete(id),
      ]);
    },
    linkAccount: async (data) => {
      await dbConnect();
      const account = await AccountModel.create(data);
      return from<AdapterAccount>(account);
    },
    async unlinkAccount(provider_providerAccountId) {
      await dbConnect();
      await AccountModel.findOneAndDelete(provider_providerAccountId);
    },
    async getSessionAndUser(sessionToken) {
      await dbConnect();
      const session = await SessionModel.findOne({
        sessionToken,
      }).lean();
      if (!session) return null;
      const user = await UserModel.findById(session.userId).lean();
      if (!user) return null;
      return {
        user: from<AdapterUser>(user),
        session: from<AdapterSession>(session),
      };
    },
    async createSession(data) {
      await dbConnect();
      const session = await SessionModel.create(data);
      return from<AdapterSession>(session);
    },
    async updateSession(data) {
      await dbConnect();
      const session = await SessionModel.findOneAndUpdate(
        {
          sessionToken: data.sessionToken,
        },
        data,
        { new: true },
      ).lean();
      return from<AdapterSession>(session!);
    },
    async deleteSession(sessionToken) {
      await dbConnect();
      await SessionModel.findOneAndDelete({
        sessionToken,
      });
    },
    async createVerificationToken(data) {
      await dbConnect();
      const verificationToken = await VerificationTokenModel.create(data);
      return from<VerificationToken>(verificationToken);
    },
    async useVerificationToken(identifier_token) {
      await dbConnect();
      const verificationToken =
        await VerificationTokenModel.findOneAndDelete(identifier_token).lean();
      if (!verificationToken) return null;
      const { _id, __v, ...rest } = verificationToken;
      return rest;
    },
  };
}

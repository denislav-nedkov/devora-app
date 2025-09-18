import { NoOp } from "convex-helpers/server/customFunctions";
import {
    zCustomAction,
    zCustomMutation,
    zCustomQuery,
} from "convex-helpers/server/zod";
import {
    mutation as baseMutation,
    action as baseAction,
    query as baseQuery,
} from "@/convex/_generated/server";

export const mutation = zCustomMutation(baseMutation, NoOp);
export const action = zCustomAction(baseAction, NoOp);
export const query = zCustomQuery(baseQuery, NoOp);

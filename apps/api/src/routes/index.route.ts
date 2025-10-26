import { createRouter } from "@api/lib/create-app";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

const index = createRouter().openapi(
  {
    method: "get",
    path: "/",
    tags: ["index"],
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.object({
          message: z.string(),
        }),
        "test"
      ),
    },
  },
  (ctx) => ctx.json({ message: "Hello World" }, HttpStatusCodes.OK)
);

export default index;

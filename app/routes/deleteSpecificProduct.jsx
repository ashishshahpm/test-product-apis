import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    await authenticate.admin(request);
    return null;
  };

export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const response = await admin.graphql(
        `mutation productDelete($input: ProductDeleteInput!) {
          productDelete(input: $input) {
            deletedProductId
            userErrors {
              field
              message
            }
          }  
        }`,
        {
          variables: {
            "input": {
            //  "id": ProductGIDToDelete
              "id": "gid://shopify/Product/7856851583128"
          }
          },
        }
      );

    return json({ message: "Product deleted successfully!" });
}
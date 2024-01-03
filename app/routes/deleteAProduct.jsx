import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    await authenticate.admin(request);
    return null;
  };

export default async function action({request}) {
    const { admin } = await authenticate.admin(request);

   // const formData = await request.formData();
   // prodID = formData.get('prodID')
   // ProductGIDToDelete = "gid://shopify/Product/" + prodID
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
    return json({ message: "Product deleted successfully" });

}

/*export default function deleteAProduct() {
    console.log ("I am in the delete function")
    // const loaderData = useLoaderData();
     const actionData = useActionData();
    // console.log (actionData)
    // const productToDeleteID = actionData?.prodID || '';
    // console.log (productToDeleteID)
     return {"message": "What is this?"}
 }
 */
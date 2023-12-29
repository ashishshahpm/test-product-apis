import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    await authenticate.admin(request);
    return null;
  };

export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);

    const formData = await request.formData();
    prodID = formData.get('prodID')
    ProductGIDToDelete = "gid://shopify/Product/" + prodID
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
              "id": ProductGIDToDelete
            }
          },
        }
      );
    return Object.fromEntries(formData.entries())
}

export default function deleteProduct() {
   // const loaderData = useLoaderData();
    const actionData = useActionData();
    console.log (actionData)
    const productToDeleteID = actionData?.prodID || '';
    console.log (productToDeleteID)
    return (
        <div>
            <Form method = "POST">
                <input name = "prodID" />
                <button>Submit</button>
            </Form>
            <div>
                Name: {" "}
                {productToDeleteID}
            </div>
        </div>
    );
}
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
    ProductGIDToSplit = "gid://shopify/Product/" + prodID
    ProductGIDToSplit2 = `"`+ ProductGIDToSplit + `"`
    console.log(ProductGIDToSplit2)
    //Code to find out how many option values the product has
    const responseQuery = await admin.graphql(
      `query getOptions {
        product (id:"gid://shopify/Product/7860868087960") {
         options {
           name
          optionValues {
            name
          }
         } 
        }
      }`
    ) 
    const responseQueryJson = await responseQuery.json();
  // Return the product variants data in JSON format
    const originalArray = responseQueryJson.data.product.options[0].optionValues
    const firstOptionValues = originalArray.map(item => item.name);
    console.log(firstOptionValues)
    //Code to create as many duplicates as option values
    for (let j=0; j< firstOptionValues.length; j++) {  
    productTitle = "Duplicated Product" + j
      const response = await admin.graphql(
          `mutation productDuplicate ($newTitle: String!, $productId: ID!) {
            productDuplicate(newTitle: $newTitle, productId: $productId) {
              newProduct {
                id
                title
              }
              userErrors {
                field
                message
              }
            }  
          }`,
          {
            variables: {
              "newTitle": productTitle,
              "productId": ProductGIDToSplit
              //"productId": "gid://shopify/Product/7860708835480"
            }
          }
        );
      }
    return Object.fromEntries(formData.entries())
}

export default function splitProduct() {
   // const loaderData = useLoaderData();
    const actionData = useActionData();
    //console.log ("I am here in Split");
    //console.log (actionData)
    const productToSplitID = actionData?.prodID || '';
    //console.log (productToSplitID)
    return (
        <div>
            <Form method = "POST">
                <input name = "prodID" />
                <button>Submit</button>
            </Form>
            <div>
                Name: {" "}
                {productToSplitID}
            </div>
        </div>
    );
}
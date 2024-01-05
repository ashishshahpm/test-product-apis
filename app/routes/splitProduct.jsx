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
    
    //Code to find out how many option values the product has
    const responseQuery = await admin.graphql(
      `query getOptions($productId: ID!) {
        product(id: $productId) {
          title
          options {
            name
            optionValues {
              name
            }
          }
        }
      }`,
      {
        variables: {
          productId: ProductGIDToSplit
        }
      }
    );

    const responseQueryJson = await responseQuery.json();

  // Return the product variants data in JSON format
    const prodName = responseQueryJson.data.product.title
    const originalArray = responseQueryJson.data.product.options[0].optionValues
    const firstOptionValues = originalArray.map(item => item.name);
   // console.log(firstOptionValues)
    console.log (prodName)
    //variables to hold the value of the new IDs for duplicated products and their first option
    const splitProductID = [];
    const splitProductOptionID = [];

    //Code to create as many duplicates as option values
    for (let j=0; j< firstOptionValues.length; j++) {  
    productTitle = prodName + j
      const response = await admin.graphql(
          `mutation productDuplicate ($newTitle: String!, $productId: ID!) {
            productDuplicate(newTitle: $newTitle, productId: $productId) {
              newProduct {
                id
                title
                options {
                  id
                  name
                }
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

        const responseJSON = await response.json();
     // console.log (responseJSON);

        splitProductID[j] = responseJSON.data.productDuplicate.newProduct.id
        splitProductOptionID[j] = responseJSON.data.productDuplicate.newProduct.options[0].id
      }
     // console.log(splitProductID)
     // console.log(splitProductOptionID)

      for (let j=0; j< firstOptionValues.length; j++) {  
          const responseDelete = await admin.graphql(
              `mutation splitOptionDelete($options: [ID!]!, $productId: ID!, $strategy: ProductOptionDeleteStrategy!) {
                productOptionsDelete(options: $options, productId: $productId, strategy: $strategy) {
                  deletedOptionsIds
                  product {
                     id
                    options {
                      id
                      name
                    }
                  }
                  userErrors {
                    field
                    message
                  }
                }
              } `,
              {
                variables: {
                  "options": [
                    splitProductOptionID[j]
                  ],
                  "productId": splitProductID[j],
                  "strategy": "POSITION"
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
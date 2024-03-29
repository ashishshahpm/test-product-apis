import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";
import productdata from "../data/productdata.js"

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Code that executes when Generate Product is clicked
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
 // assigning values for the options and their values 
 const colorPromise = productdata("color");
 const sizePromise = productdata("size");
 const lengthPromise = productdata("length");
 
 const color = await colorPromise;
 const size = await sizePromise;
 const length = await lengthPromise;

// setting up the inputs for the productCreate mutation
 const imagesPromise = productdata("images");
 const inputPromise = productdata("input");

 const images = await imagesPromise;
 const productInput = await inputPromise


//creating a variable that holds the inputs for the productVariantsBulkCreate mutation
  //const numVariants = Math.floor(Math.random() * 27 + 1);
  const numVariants = Math.floor(Math.random() * 10);
  const numOptionValues = Math.ceil(Math.pow(numVariants, (1/3)));
  console.log('Number of options values per option is:' , numOptionValues)

  const variantsToCreate = [];
  let i = 0;
  while (i < numVariants) {
    colorPointer = Math.floor (i/(numOptionValues*numOptionValues));
    sizePointer = Math.floor (i/numOptionValues)%numOptionValues;
    lengthPointer = i%numOptionValues;
    variantObject =  {
      "price": i+1,
      "optionValues": [
        {"name": color[colorPointer], "optionName": "Color"},
        {"name": size[sizePointer], "optionName": "Size"},
        {"name": length[lengthPointer], "optionName": "Length"}
      ]
    }
    variantsToCreate.push(variantObject);
    i++;
  }

  // calls the productCreate mutation
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!, $mediaInput: [CreateMediaInput!]!) {
        productCreate(input: $input, media: $mediaInput) {
          product {
            id
            title
            handle
            status
            options {
              id
              name
              position
              optionValues {
                id
                name
                hasVariants
              } 
          }
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: productInput,
        mediaInput: images
      },
//      version: '2023-10', // Specify the desired API version here
    }
  );


  const responseJson = await response.json();
  const createdProductID = responseJson.data.productCreate.product.id; // Read the product ID

  const mutationLoops =  Math.floor(numVariants/250);
  let k;
  // Add variants to the product
  let responseWithVariants
  for (let j=0; j< mutationLoops+1; j++) {
    if (numVariants - j*250 < 250) {
      k = numVariants - j*250
    }
    else k = 250
    console.log (j)
    console.log (k)
    responseWithVariants = await admin.graphql (
      `#graphql
      mutation addVariants($productID: ID!, $strategy: ProductVariantsBulkCreateStrategy, $variantsInput: [ProductVariantsBulkInput!]!){
        productVariantsBulkCreate(productId: $productID, strategy: $strategy, variants: $variantsInput) {
          product {
            id
            title
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
  
      {
        variables: {
          productID: createdProductID,
          strategy: "REMOVE_STANDALONE_VARIANT",
          variantsInput: variantsToCreate.slice(j*250,j*250+k),
         },
      }
  
    );
  }

  //console.log (i)
  console.log ('Number of variants to be created is:', numVariants)
  console.log(createdProductID)
  const responseWithVariantsJson = await responseWithVariants.json();
  // Return the product variants data in JSON format
  return json({ productVariants: responseWithVariantsJson.data.productVariantsBulkCreate.product });

//  return null;

};    


export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const productId = actionData?.productVariants?.id.replace(
    "gid://shopify/Product/",
    ""
  );

  useEffect(() => {
    if (actionData?.productVariants) {
      shopify.toast.show("Product created");
    }
  }, [actionData?.productVariants]);
  
  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Generate a product
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This embedded app template uses{" "}
                    <Link
                      url="https://shopify.dev/docs/apps/tools/app-bridge"
                      target="_blank"
                      removeUnderline
                    >
                      App Bridge
                    </Link>{" "}
                    interface examples like an{" "}
                    <Link url="/app/additional" removeUnderline>
                      additional page in the app nav
                    </Link>
                    , as well as an{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql"
                      target="_blank"
                      removeUnderline
                    >
                      Admin GraphQL
                    </Link>{" "}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Get started with products
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Generate a product with GraphQL and get the JSON output for
                    that product. Learn more about the{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                      target="_blank"
                      removeUnderline
                    >
                      productCreate
                    </Link>{" "}
                    mutation in our API references.
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}>
                    Generate a product
                  </Button>

                  <Button 
                    url = {`https://ashishtest-extendedvariants.myshopify.com/admin/apps/test-product-apis/deleteProduct`}
                    >
                      Delete product form
                    </Button>
                  
                  {actionData?.productVariants && (
                    <Button
                      url={`shopify:admin/products/${productId}`}
                      target="_blank"
                      variant="plain"
                    >
                      View product
                    </Button>
                  )}
                </InlineStack>
                {actionData?.productVariants && (
                  <Box
                    padding="400"
                    background="bg-surface-active"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.productVariants, null, 2)}</code>
                    </pre>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                        removeUnderline
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
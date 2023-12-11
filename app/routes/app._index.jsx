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
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Code that executes when Generate Product is clicked
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
 
// Assingning material of the product that will be used in its title
  const material = ["Wood", "Steel", "Acrylic", "Fiber"][
    Math.floor(Math.random() * 4)
  ];
  
 // assigning values for the options and their values 
  const color = ["Red", "Green", "Blue"];
  const size = ["S", "M", "L"];

  const numOptionValues = Math.floor(Math.random()*3);

// creating the optionValues variable that will be used in the productCreate mutation
  const optionValuesDynamic = [
    {
      "name": "Color",
      "values": [
        { "name": color[0] },
        { "name": color[1] },
        { "name": color[2] }
      ]
    },
    {
      "name": "Size",
      "values": [
        { "name": size[0] },
        { "name": size[1] },
        { "name": size[2] }
      ]
    }
  ]    

//creating a variable that holds the inputs for the productVariantsBulkCreate mutation
  const temp2 = [
    {
      "price": 1,
      "optionValues": [
        {"name": color[0], "optionName": "Color"},
        {"name": size[1], "optionName": "Size"}
      ]
    },
    {
      "price": 2,
      "optionValues": [
        {"name": color[0], "optionName": "Color"},
        {"name": size[2], "optionName": "Size"}
      ]
    },
    {
      "price": 3,
      "optionValues": [
        {"name": color[1], "optionName": "Color"},
        {"name": size[0], "optionName": "Size"}
      ]
    }
  ];

 // creating a variable that holds the inputs for the productCreate mutation 
  const inputData = {
    title: `${material} Snowboard`,
    "optionValues": optionValuesDynamic,
  };
  
  // calls the productCreate mutation
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
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
        input: {
          title: `${material} Snowboard`,
          //variants: [{ price: Math.random() * 100 }],
          "optionValues": optionValuesDynamic
        },
      },
//      version: '2023-10', // Specify the desired API version here
    }
  );


  const responseJson = await response.json();
  const temp = responseJson.data.productCreate.product.id; // Read the product ID

  // Add variants to the product
  const responseWithVariants = await admin.graphql (
    `#graphql
    mutation addVariants($productID: ID!, $variantsInput: [ProductVariantsBulkInput!]!){
      productVariantsBulkCreate(productId: $productID, variants: $variantsInput) {
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
        productID: temp,
        variantsInput: temp2,
       },
    }

  );
  
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

                  <Button loading={isLoading} onClick={generateProduct}>
                    Modify a product
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
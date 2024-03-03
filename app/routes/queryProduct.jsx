import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import fs from 'fs';


export const loader = async ({ request }) => {
    await authenticate.admin(request);
    return null;
  };

export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();
    prodID = formData.get('prodID')
    ProductGIDToQuery = "gid://shopify/Product/" + prodID
    let cursorValue = null
    let allVariants = [];

    //Code to find out how many option values the product has
    while (true) {
        const responseQuery = await admin.graphql(
        `fragment ProductFields on Product {
            id
            title
            createdAt
            compareAtPriceRange {
            maxVariantCompareAtPrice {
                amount
                currencyCode
            }
            minVariantCompareAtPrice {
                amount
                currencyCode
            }
            }
            description
            descriptionHtml
            featuredImage {
            id
            width
            height
            url
            }
            handle
            id
            isGiftCard
            images(first: 10) {
            edges {
                node {
                url
                altText
                }
            }
            }
            onlineStoreUrl
            productType
            publishedAt
            requiresSellingPlan
            seo {
            description
            title
            }
            priceRangeV2 {
            minVariantPrice {
                amount
                currencyCode
            }
            maxVariantPrice {
                amount
                currencyCode
            }
            }
            tags
            tracksInventory
            totalInventory
            totalVariants
            status
            updatedAt
            vendor
            productType
            publishedAt
            options {
            id
            name
            optionValues {
                id
                name
                hasVariants
            }
            }
            metafields(first: 10) {
                edges {
                node {
                    key
                    value
                    namespace
                }
                }
            }
            media (first: 10) {
                edges {
                node {
                    id
                }
                }
            }
            collections(first: 10) {
                edges {
                node {
                    id
                    title
                }
                }
            }
        }
        
        fragment VariantFields on ProductVariant {
            id
            title
            availableForSale
            sku
            price
            inventoryQuantity
            availableForSale
            barcode
            compareAtPrice 
            image {
            altText
            height
            id
            thumbhash
            url
            width
            }
            metafields (first: 10) {
            edges {
                node {
                id
                key
                namespace
                }
            }
            } 
        }
        
        query GetProductAndFirst250Variants ($productId: ID!, $cursor: String) {
            product(id: $productId) {
            ...ProductFields
            variants(first: 20 after: $cursor) {
                pageInfo {
                hasNextPage
                endCursor
                }
                edges {
                cursor
                node {
                    ...VariantFields
                }
                }
            }
            }
        }`,
        {
            variables: {
            productId: ProductGIDToQuery,
            cursor: cursorValue
            }
        }
        );

        const responseQueryJson = await responseQuery.json();

    // Return the product variants data in JSON format
    const prodName = responseQueryJson.data.product.title;
    const hasNextPage = responseQueryJson.data.product.variants.pageInfo.hasNextPage;
    const nextCursor = responseQueryJson.data.product.variants.pageInfo.endCursor;
    const variants = responseQueryJson.data.product.variants.edges.map(edge => edge.node);

    allVariants = allVariants.concat(variants);

    if (hasNextPage) {
        cursorValue = nextCursor;
    } else {
        break;
    }
}

console.log(allVariants);
fs.writeFileSync('variants.txt', JSON.stringify(allVariants));

return Object.fromEntries(formData.entries());
}

export default function queryProduct() {
   // const loaderData = useLoaderData();
    const actionData = useActionData();
    const productToQueryID = actionData?.prodID || '';
    return (
        <div>
            <Form method = "POST">
                <input name = "prodID" />
                <button>Submit</button>
            </Form>
            <div>
                Name: {" "}
                {productToQueryID}
            </div>
        </div>
    );
}
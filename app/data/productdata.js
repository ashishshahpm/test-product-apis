
import fs from "fs";

export default function mediatdata(dataType) {
    const dataRequested = dataType
    const randomSeed = Math.random();
    const material = ["Cotton","Denim","Polyester","Wool","Linen","Silk","Rayon","Nylon","Spandex","Leather","Velvet","Corduroy","Twill","Chiffon","Satin","Canvas","Suede","Polyurethane","Acrylic","Cashmere"][Math.floor(randomSeed * 20)];
    const title = `${material} Pants`
    const images = [
        {
          "originalSource": "https://sgtautotransport.com/storage/81w0OTIXliOAn7GcOqkFYrQBNTsoMRztDde3jRrC.jpg",
          "alt": "Bike scenic",
          "mediaContentType": "IMAGE"
        },
        {
          "originalSource": "https://super73.com/cdn/shop/files/SUPER73_In-Stock-Bikes_DesktopHero_06_1920x1080_88b91b74-161f-4217-ac58-30f6f38c282a.jpg?v=1704237874&width=3000",
          "alt": "Bike driving",
          "mediaContentType": "IMAGE"
        },
        {
          "originalSource": "https://www.motorcyclistonline.com/resizer/wJwyoxEWfQHl6Im39g_Y4OpGbHI=/1440x0/filters:focal(712x394:722x404)/cloudfront-us-east-1.images.arcpublishing.com/octane/Y2NSC7AJEBBRZNOPUZZ3W25BPE.jpg",
          "alt": "Bike stock",
          "mediaContentType": "IMAGE"
        },
        {
          "originalSource": "https://www.motorcyclistonline.com/resizer/bP-PiZaMqiHlzECKumDeNrqpDF4=/1440x0/filters:focal(709x485:719x495)/cloudfront-us-east-1.images.arcpublishing.com/octane/IDUJXT35CVDRHKRW4RHZV5KTGI.jpg",
          "alt": "Bike stock again",
          "mediaContentType": "IMAGE"
        },
        {
          "originalSource": "https://sgtautotransport.com/storage/81w0OTIXliOAn7GcOqkFYrQBNTsoMRztDde3jRrC.jpg",
          "alt": "Bike scenic",
          "mediaContentType": "IMAGE"
        },
        {
            "originalSource": "https://goodmorningwisher.com/wp-content/uploads/2023/08/Good-Morning-Thursday-Images-131.jpg",
            "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://wishes1234.com/wp-content/uploads/2022/04/Purple-dahlia-flowers-in-vase.jpg",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI0HyjfhaN3sMv3-cS4eAm0RA4g1zSdCHTGg&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCglrRPfrwe1vMmYXorNLf5Sv9NNX8caJ9g&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWEarvSNIEwPAf5tEDAeSuDT7fYrgN21mrHg&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuIqy1cMW0u6hwILBQc37c-x3y7RSYWTMFwQ&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjA0bwltixxQqqYAHkSWMxHiPMUMI_xGmZJw&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnudS-NYabBAhEdFXEYkG8Ndcds16LfbtQ8A&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnudS-NYabBAhEdFXEYkG8Ndcds16LfbtQ8A&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvokiZDB0XPdQNrlOqScF2dFaMYL3o49nLSA&usqp=CAU",
        "mediaContentType": "IMAGE"
        },
        {
        "originalSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKqM__N6SzXVWlBAEqRh092jGGrkjEoS00lA&usqp=CAU",
        "mediaContentType": "IMAGE"
        }
      ].slice(0, Math.floor(randomSeed*16)) 

    const color = ["Red", "Green", "Blue", "Black", "Brown", "White", "Pink", "Purple", "Magenta", "Orange", "Yellow", "Violet", "Rainbow"];
    const size = ["24", "26", "28", "30", "32", "34", "36","38", "40", "42", "44", "46", "48"];
    const length = ["25", "26", "27", "28", "29", "30", "31","32", "33", "34", "35", "36", "37"];
    
    const colorOption = {
      "name": "Color",
      "values": [
        { "name" : color[0] }, {"name": color[1] }, { "name": color[2] }, { "name": color[3] }, { "name": color[4] }, { "name": color[5] }, { "name": color[6] }, 
        { "name": color[7] }, { "name": color[8] }, { "name": color[9] }, { "name": color[10] }, { "name": color[11] }, { "name": color[12] }
      ]
    }
  
    const sizeOption = {
      "name": "Size",
        "values": [
          { "name" : size[0] }, {"name": size[1] }, { "name": size[2] }, { "name": size[3] }, { "name": size[4] }, { "name": size[5] }, { "name": size[6] }, 
          { "name": size[7] }, { "name": size[8] }, { "name": size[9] }, { "name": size[10] }, { "name": size[11] }, { "name": size[12] }
        ]
    }
  
    const lengthOption = {
      "name": "Length",
        "values": [
          { "name" : length[0] }, {"name": length[1] }, { "name": length[2] }, { "name": length[3] }, { "name": length[4] }, { "name": length[5] }, { "name": length[6] }, 
          { "name": length[7] }, { "name": length[8] }, { "name": length[9] }, { "name": length[10] }, { "name": length[11] }, { "name": length[12] }
        ]
    }

// creating the optionValues variable that will be used in the productCreate mutation
  const optionArray = [colorOption, sizeOption, lengthOption]; 

/* Using openAI APIs to generate a description
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Can you generate a short description for a Pant product?"},
        {"role": "assistant", "content": "Pants you dont want to get out of"}],
    model: "gpt-3.5-turbo",
    max_tokens: 64,
  });        
  const description = completion.choices[0].message.content; 
  */

  //static descriptions
  const description = ["Introducing our latest pant innovation, a game-changer in comfort and style. ", 
  "The perfect pants blending comfort, style, and versatility. ",
  "So Hawt these pants",
  "The MVP of Pants",
  "These pants are designed to make you feel like you never want to take them off."]
  [Math.floor(randomSeed*5)]

  const bundleOwnership = {"bundles" : [true,false][Math.floor(randomSeed * 2)]}
  const collectionsToJoin = ["gid://shopify/Collection/296910160024", "gid://shopify/Collection/296910192792", "gid://shopify/Collection/296910258328" ].slice(0, Math.floor(randomSeed * 3));
  const collectionsToLeave = ["gid://shopify/Collection/296910291096", "gid://shopify/Collection/296910323864", "gid://shopify/Collection/296910356632F"].slice(0, Math.floor(randomSeed * 3));
  const giftCard = [true, false][Math.floor(randomSeed * 2)];
  //const giftCard = false
  const giftCardTemplateSuffix = ["CardX", "CardY", "CardZ"][Math.floor(randomSeed * 3)];
  const handle = title
  const productMetafields = [
    {
    "key": "myKey",
    "namespace": "myNamespace",
    "type": "multi_line_text_field",
    "value": "My super metafield value1"
    },
    {
      "key": "myKey",
      "namespace": "myNamespace",
      "type": "multi_line_text_field",
      "value": "My super metafield value2"
      },
      {
        "key": "myKey",
        "namespace": "myNamespace",
        "type": "multi_line_text_field",
        "value": "My super metafield value3"
        },
        {
          "key": "myKey",
          "namespace": "myNamespace",
          "type": "multi_line_text_field",
          "value": "My super metafield value4"
          }
  ].slice(0, Math.floor(randomSeed * 4))
  const requiresSellingPlan = [true, false][Math.floor(randomSeed * 2)];
  const status =  ["ACTIVE", "ARCHIVED", "DRAFT"][Math.floor(randomSeed * 3)];
  const tags = ["Luxe", "El Cheapo", "Meh", "Overpriced"].slice(0, Math.floor(randomSeed * 4)) ;
  const vendor = ["CK", "Gap", "BR", "Express"][Math.floor(randomSeed * 4)];


  const productCategory = {"productTaxonomyNodeId" : 'gid://shopify/ProductTaxonomyNode/173'}
 //const customProductType = ["Pants", "Super Pants"][Math.floor(Math.random() * 3)];
  const productType = ["Pants", "Trouser", "Bottoms", "Slacks"][Math.floor(randomSeed * 4)];
 //const standardizedProductType = {"productTaxonomyNodeId": "173"}
  const seo =  {
        "description": "Such an optimized SEO title",
        "title": "Pants to knock your SEO socks off"
      }
  
  const productInput = 
  {
     "title": title,
      "descriptionHtml": description,
      "productOptions": optionArray,
      "claimOwnership": bundleOwnership,
      "collectionsToJoin": collectionsToJoin,
      "giftCard": giftCard,
      "giftCardTemplateSuffix": giftCardTemplateSuffix,
      "handle": handle,
      "redirectNewHandle": true,
      "requiresSellingPlan": true,
      "status": status,
      "tags": tags,
      "vendor": vendor,
      "requiresSellingPlan": requiresSellingPlan,
      "productCategory" : productCategory,
      "productType" : productType,
      "seo": seo,
      "metafields": [
        {
        "key": "myKeytoo",
        "namespace": "myNamespace",
        "type": "multi_line_text_field",
        "value": "My duper values"
        }
      ]
  }
    switch (dataRequested) {
        case 'input': {
          console.log (randomSeed)
          //console.log (images)
          return productInput;
        }
        case 'images':
          return images; 
        case 'color':
          return color; 
        case 'size':
          return size; 
        case 'length':
          return length; 
          default:
            return 'Invalid data requested';
      }
 }
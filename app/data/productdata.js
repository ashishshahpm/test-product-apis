import OpenAI from "openai";
//require('dotenv').config();
//const apiKey = process.env.OPENAI_API_KEY;
//const openai = new OpenAI({ apiKey });

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

// Set up the OpenAI API client
//const client = new openai.OpenAI({ apiKey });


export default async function mediatdata(dataType) {
    const dataRequested = dataType
    // Assingning material of the product that will be used in its title
    const material = ["Cotton", "Nylon", "Wool", "Hybrid", "Polyester", "Jute", "Synthetic"][
    Math.floor(Math.random() * 7)];
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
      ] 

    const color = ["Red", "Green", "Blue", "Black", "Brown", "White", "Pink", "Purple", "Magenta", "Orange", "Yellow", "Violet", "Rainbow"];
    const size = ["24", "26", "28", "30", "32", "34", "36","38", "40", "42", "44", "46", "48"];
    const length = ["25", "26", "27", "28", "29", "30", "31","32", "33", "34", "35", "36", "37"];
    
    const colorOption = {
      "name": "Color",
      "values": [
        { "name": color[0] }
      ]
    }
  
    const sizeOption = {
      "name": "Size",
        "values": [
          { "name": size[0] }
        ]
    }
  
    const lengthOption = {
      "name": "Length",
        "values": [
          { "name": length[0] }
        ]
    }

// creating the optionValues variable that will be used in the productCreate mutation
  const optionArray = [colorOption, sizeOption, lengthOption];

  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Can you generate a short 4 line description for a Pant product?"},
        {"role": "assistant", "content": "Pants that you never want to get out off"}],
    model: "gpt-3.5-turbo",
  });        
  const description = completion.choices[0].message.content;
  const productInput = 
  {
     "title": title,
      "descriptionHtml": description,
      "productOptions": optionArray
  }

    switch (dataRequested) {
        case 'input':
          return productInput;
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
import { Product } from "types";

export class ProductService {
  private products: Product[] = [
    {
      id: "1",
      name: "Vintage Guitar Tee",
      image:
        "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
      price: 350,
    },
    {
      id: "2",
      name: "Natural Tee",
      image:
        "https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
      price: 300,
    },
    {
      id: "3",
      name: "Prada",
      image:
        "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
      price: 450,
    },
    {
      id: "4",
      name: "Burdastyle",
      image:
        "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
      price: 320,
    },
    {
      id: "5",
      name: "Tote Bag",
      image:
        "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
      price: 350,
    },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    description:
      "Soft cotton crew-neck t-shirt suitable for everyday casual wear.",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
  },
  {
    id: 2,
    name: "Slim Fit Formal Shirt",
    description:
      "Long-sleeve slim fit shirt ideal for office and formal occasions.",
    price: 1299,
    image:
      "https://imagescdn.louisphilippe.com/img/app/product/9/916657-16341724.jpg?auto=format&w=390",
    category: "Shirts",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    id: 3,
    name: "Checked Casual Shirt",
    description:
      "Casual checked shirt with button-down collar for a relaxed look.",
    price: 899,
    image:
      "https://static.cilory.com/681503-thickbox_default/nologo-white-navy-checked-casual-shirt.jpg",
    category: "Shirts",
    sizes: ["S", "M", "L"],
    stock: 28,
  },
  {
    id: 4,
    name: "Oversized Graphic Tee",
    description: "Oversized t-shirt with a minimal front graphic print.",
    price: 749,
    image: "https://veirdo.in/cdn/shop/files/18_5.jpg?v=1754545490",
    category: "Shirts",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },
  {
    id: 5,
    name: "Polo Collar T-Shirt",
    description:
      "Short-sleeve polo t-shirt with contrast collar and ribbed cuffs.",
    price: 799,
    image:
      "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/2024/DECEMBER/2/1WuZpjzf_976c9a1088cd4b3b9df43506ef60f2b8.jpg",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock: 32,
  },
  {
    id: 6,
    name: "Denim Jeans",
    description:
      "Straight-fit mid-rise denim jeans with classic five-pocket styling.",
    price: 1599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpBxPjuW-iaymt50KKmFBWbh8COnrup3Mbg&s",
    category: "Pants",
    sizes: ["30", "32", "34", "36"],
    stock: 25,
  },
  {
    id: 7,
    name: "Slim Fit Chinos",
    description:
      "Stretchable slim-fit chinos perfect for smart casual outfits.",
    price: 1399,
    image:
      "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/10/tLU5feAw_cda51c5412914809a28cfb52b8f07d76.jpg",
    category: "Pants",
    sizes: ["30", "32", "34", "36"],
    stock: 22,
  },
  {
    id: 8,
    name: "Jogger Pants",
    description: "Cotton joggers with elasticated waistband and ankle cuffs.",
    price: 999,
    image:
      "https://img.tatacliq.com/images/i13/437Wx649H/MP000000019386676_437Wx649H_202309241921301.jpeg",
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    id: 9,
    name: "Formal Trousers",
    description: "Flat-front formal trousers suitable for office wear.",
    price: 1699,
    image: "https://kaapus.com/cdn/shop/files/4R9A1394.jpg?v=1742218502",
    category: "Pants",
    sizes: ["30", "32", "34", "36"],
    stock: 18,
  },
  {
    id: 10,
    name: "Casual Shorts",
    description: "Knee-length cotton shorts with drawstring waist for comfort.",
    price: 699,
    image:
      "https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/l/c/lcsrsd1008221_0.jpg",
    category: "Shorts",
    sizes: ["S", "M", "L"],
    stock: 26,
  },
  {
    id: 11,
    name: "Cargo Shorts",
    description: "Multi-pocket cargo shorts ideal for outdoor activities.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/5184+c3n4BL._AC_UY1100_.jpg",
    category: "Shorts",
    sizes: ["M", "L", "XL"],
    stock: 24,
  },
  {
    id: 12,
    name: "Zip-Up Hoodie",
    description: "Fleece-lined zip-up hoodie with front pockets.",
    price: 1499,
    image:
      "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/477781s.jpg?im=Resize,width=750",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    stock: 27,
  },
  {
    id: 13,
    name: "Pullover Sweatshirt",
    description: "Crew-neck sweatshirt with brushed interior for extra warmth.",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/31kRBgAr2dL._SR290,290_AC_.jpg",
    category: "Sweatshirts",
    sizes: ["S", "M", "L"],
    stock: 29,
  },
  {
    id: 14,
    name: "Lightweight Windbreaker",
    description: "Water-resistant zip-front windbreaker with adjustable hood.",
    price: 1799,
    image:
      "https://flinggolf.com/cdn/shop/files/unisex-lightweight-zip-up-windbreaker-safety-orange-left-front-2-654a47ac142f7_5000x.jpg?v=1699366842",
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    stock: 16,
  },
  {
    id: 15,
    name: "Bomber Jacket",
    description: "Classic bomber jacket with ribbed hem and cuffs.",
    price: 2499,
    image:
      "https://www.gingtto.com/cdn/shop/files/1000__0005_image00297.jpg?v=1720836416",
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    stock: 14,
  },
  {
    id: 16,
    name: "Summer Dress",
    description: "Knee-length floral printed dress with a relaxed fit.",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/91rxr+L2bkL._AC_UY1100_.jpg",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    stock: 21,
  },
  {
    id: 17,
    name: "Bodycon Midi Dress",
    description:
      "Stretch bodycon midi dress suitable for parties and evenings.",
    price: 1599,
    image:
      "https://littleboxindia.com/cdn/shop/files/Vanilla_Square_Neck_Cap_Sleeve_Bodycon_Midi_Dress.webp?v=1754895962",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    stock: 19,
  },
  {
    id: 18,
    name: "Casual Kurta",
    description:
      "Straight-cut cotton kurta with side slits and three-quarter sleeves.",
    price: 999,
    image:
      "https://shopforaurelia.com/cdn/shop/files/23AUA14301-704343_1_45c9400f-d0fd-4395-98af-daf654804111.jpg?v=1721976573",
    category: "Ethnic Wear",
    sizes: ["S", "M", "L", "XL"],
    stock: 26,
  },
  {
    id: 19,
    name: "Ankle-Length Leggings",
    description: "High-waist stretch leggings for daily wear and workouts.",
    price: 699,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMU0gJ0kWuwZdp5Wq1DuHZQMviFsiSlLyrJw&s",
    category: "Bottoms",
    sizes: ["S", "M", "L"],
    stock: 33,
  },
  {
    id: 20,
    name: "Athletic Shorts",
    description: "Quick-dry athletic shorts with inner mesh lining.",
    price: 799,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyLJuP2svOcsSzNtuWqmIhidgEF9OGKWTNiA&s",
    category: "Sportswear",
    sizes: ["S", "M", "L", "XL"],
    stock: 31,
  },
  {
    id: 21,
    name: "Sports Jersey Tee",
    description: "Breathable sports t-shirt with moisture-wicking fabric.",
    price: 899,
    image: "https://m.media-amazon.com/images/I/51Fk5E4852L._AC_UY1100_.jpg",
    category: "Sportswear",
    sizes: ["S", "M", "L", "XL"],
    stock: 34,
  },
  {
    id: 22,
    name: "Sleeveless Tank Top",
    description: "Basic sleeveless tank top ideal for layering or gym wear.",
    price: 499,
    image: "https://m.media-amazon.com/images/I/51JZH5B9fCL._AC_UY1100_.jpg",
    category: "Shirts",
    sizes: ["S", "M", "L"],
    stock: 37,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();

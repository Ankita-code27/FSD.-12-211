import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

const FILE = "product.json";

const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

const saveCart = async (myCart) => {
  await writeFile(FILE, JSON.stringify(myCart, null, 2));
};

const addToCart = async (product) => {
  const myCart = await getCart();
  const isFound = myCart.find((item) => item.id === product.id);
  if (isFound) {
    isFound.qty += product.qty;
  } else {
    myCart.push(product);
  }
  await saveCart(myCart);
  console.log(`product added/updated with id ${product.id} into cart`);
};

const main = async () => {
  let choice;
  const cin = readline.createInterface({ input: stdin, output: stdout });
  do {
    console.log("Welcome to Flipkart 😎");
    console.log("1......Show cart");
    console.log("2......Add Product");
    console.log("3......Remove Product");
    console.log("4......Update Quantity");
    console.log("5......Exit");
    choice = await cin.question("Enter your choice:");
    switch (Number(choice)) {
      case 1:
        console.log("Show product");
        break;
      case 2:
        console.log("Product added");
        break;
      case 3:
        console.log("Remove product");
        break;
      case 4:
        console.log("Update product quantity");
        break;
      case 5:
        console.log("See you later");
        break;
      default:
        console.log("Invalid choice! try again😵‍💫");
    }
  } while (choice != 5);
  cin.close();
};
main();

import dotenv from "dotenv";
import { UserModel } from "../../models/user.js";
dotenv.config();
beforeEach(async () => {
  //await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  //await mongoose.connection.close();
});

describe("User Model", () => {
  it("register user", async () => {
    const code = parseInt(Math.random() * (1000000 - 1) + 1);
    const userName = "user_name_" + code;
    let user = await UserModel.registerUser({
      name: userName,
      password: "123456",
      is_admin: true,
      status: true,
    });
    let userinDatabase = await UserModel.findByUserName(userName);
    expect(userinDatabase).not.toBeNull();
  });
  it("findByUserName", async () => {
    const code = parseInt(Math.random() * (1000000 - 1) + 1);
    const userName = "user_name_" + code;

    let user = await UserModel.findByUserName("user_name_478598");
    expect(user).not.toBeNull();
  });
});

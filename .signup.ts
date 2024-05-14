// "use server";

// import { connectDatabase } from "@/lib/database/utils";
// import { User } from "@/lib/models/userModel";
// import { hash } from "bcryptjs";

// const signupHandler = async (name: string, email: string, password: string) => {
//   await connectDatabase();
//   try {
//     const hashedPassword = await hash(password, 10);
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     return { success: true };
//   } catch (error) {
//     return { success: false, message: "An error occured. Please try again" };
//   }
// };

// export { signupHandler };

// await connectDatabase();

// const user = await User.findOneAndUpdate(
//   { email: email },
//   { last_login: Date.now() },
//   { new: true }
// )
//   .select("+password")
//   .populate("plan");

// if (!user)
//   throw new CredentialsSignin({
//     cause: "Invalid credentials",
//   });
// if (!user.password)
//   throw new CredentialsSignin({
//     cause: "Please sign in with your provider",
//   });
// const isMatch = await compare(password, user.password);
// if (!isMatch)
//   throw new CredentialsSignin({ cause: "Incorrect Password" });

// const userObject = user.toObject();
// const { password: userPassword, ...userSafe } = userObject;
// console.log("User logged in:", userSafe);
// console.log("done");
// return { data: userSafe };

// export const connectDatabase = async () => {
//   try {
//     if (mongoose.connections && mongoose.connections[0].readyState) return;

//     const { connection } = await mongoose.connect(process.env.MONGO_URI || "", {
//       dbName: "pastewords",
//     });

//     console.log("connect to db", connection.host);
//   } catch (error) {
//     throw new Error("Error connecting to db");
//   }
// };

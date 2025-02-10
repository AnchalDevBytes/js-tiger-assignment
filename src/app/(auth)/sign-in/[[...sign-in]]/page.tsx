import { SignIn } from "@clerk/nextjs";

const Signin = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn path="/sign-in" routing="path" signInUrl="sign-up" />
    </div>
  );
};

export default Signin;

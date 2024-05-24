import LoginBody from "@/components/loginTwo/LoginBody";

export default function LoginTwo() {
  return (
    <>
      {/* Login Body section */}
      <LoginBody />
    </>
  );
}

LoginTwo.getLayout = function getLayout(page) {
  return <>{page}</>;
};

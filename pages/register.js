import RegisterBody from "@/components/register/RegisterBody"

export default function LoginTwo() {
  return (
    <>
      {/* Login Body section */}
      <RegisterBody />
    </>
  );
}

LoginTwo.getLayout = function getLayout(page) {
  return <>{page}</>;
};

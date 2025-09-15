import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { UseGlobalState } from "../Context/Usercontext";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { Loader } from "lucide-react";
function Login() {
  const { Loginuser, btnLoading } = UseGlobalState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const SubmitHandler = () => {
    Loginuser(email, navigate);
  };
  return (
    <div className="min-h-[60vh] mt-25 ">
      <Card className=" sm:w-[300px] md:w-[400px] m-auto mt-4">
        <CardHeader>
          <CardTitle>Enter Email to get Otp</CardTitle>
          <CardDescription>
            If you have already get otp on email then you can directly go to otp
            tab
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label>Enter Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* disabled={true} se desactiva */}
          <Button disabled={btnLoading} onClick={SubmitHandler}>
            {btnLoading ? <Loader /> : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;

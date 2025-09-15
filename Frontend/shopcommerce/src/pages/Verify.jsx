import React, { useEffect, useState } from "react";
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
//import { UseGlobalState } from "../Context/Usercontext";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { Loader } from "lucide-react";
import { CartGlobalState } from "../Context/CartContext";
import { UseGlobalState } from "../Context/Usercontext";
function Verify() {
  const { btnLoading, Loginuser, verifyuser } = UseGlobalState();
  //const { fetchCart } = CartGlobalState();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(20); // Timer empieza en 90 segundos
  const [canResend, setCanResend] = useState(false); // No se puede reenviar inicialmente
  const SubmitHandler = () => {
    verifyuser(Number(otp), navigate);
  };
  useEffect(() => {
    //     La "limpieza" en useEffect es como un botón de emergencia que:

    // Cancela procesos anteriores antes de iniciar nuevos

    // Libera recursos cuando el componente se desmonta

    // Previene bugs y memory leaks

    // En tu código: return () => clearInterval(interval) asegura que solo haya un intervalo activo en todo momento.
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const formaTime = (time) => {
    const minutes = Math.floor(time / 60);
    const second = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(second).padStart(
      2,
      "0"
    )}`;
  };
  const handelResetOtp = async () => {
    //cuando no llegas tener el codigo otra vez mandas el email que esta guardado en
    ///el localstorage para que hagas la consulta y mande el otp al correo
    const email = localStorage.getItem("email");
    await Loginuser(email, navigate);
    setTimer(10);
    setCanResend(false);
  };
  return (
    <div className="min-h-[60vh] mt-25">
      <Card className=" sm:w-[300px] md:w-[400px] m-auto mt-4">
        <CardHeader>
          <CardTitle>Verify User Otp</CardTitle>
          <CardDescription>
            If you have already get otp on email then you can directly go to otp
            tab
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label>Enter Otp</Label>
            <Input
              type="email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* disabled={true} se desactiva */}
          <Button disabled={btnLoading} onClick={SubmitHandler}>
            {btnLoading ? <Loader /> : "Submit"}
          </Button>
        </CardFooter>
        <div className="flex flex-col justify-center items-center w-[200px] m-auto">
          <p className="text-lg mb-1">
            {canResend
              ? "You can now Resend OTP"
              : `Time remaining:${formaTime(timer)}`}
          </p>
          {/* //disables false */}
          <Button
            onClick={handelResetOtp}
            className="mb-1"
            disabled={!canResend}
          >
            Resend Otp
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Verify;

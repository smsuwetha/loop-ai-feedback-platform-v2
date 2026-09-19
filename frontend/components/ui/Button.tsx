import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props
extends ButtonHTMLAttributes<HTMLButtonElement>{

variant?:
"default"
|"outline"
|"ghost";

}

export default function Button({

variant="default",

className,

...props

}:Props){

return(

<button

className={clsx(

"rounded-2xl px-5 py-3 font-semibold transition-all",

{

"bg-blue-600 text-white hover:bg-blue-700 shadow-lg":
variant==="default",

"border border-slate-300 bg-white hover:bg-slate-50":
variant==="outline",

"hover:bg-slate-100":
variant==="ghost",

},

className

)}

{...props}

/>

);

}
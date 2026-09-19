import { ReactNode } from "react";
import clsx from "clsx";

interface Props{

children:ReactNode;

className?:string;

}

export default function Card({

children,

className

}:Props){

return(

<div

className={clsx(

"rounded-3xl bg-white p-6 shadow-md border border-slate-200",

className

)}

>

{children}

</div>

);

}
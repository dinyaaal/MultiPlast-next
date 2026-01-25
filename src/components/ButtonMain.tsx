'use client'

import { extendVariants, Button } from "@heroui/react";

export const ButtonMain = extendVariants(Button, {

    variants: {
        color: {
            primary: 'bg-blueColor text-white data-[hover=true]:bg-blueColor-hover ',
            secondary: 'bg-secondaryColor text-black  data-[hover=true]:bg-[#c4dbff]',
            transparent: 'bg-transparent text-black ',
            danger: 'bg-red-800 text-white hover:bg-red-700 '
        },
        variant: {
            bordered: 'border border-black',
            link: 'p-0!',
        },
        isIconOnly: {
            true: 'size-10! shrink-0!',
        }
    },
    defaultVariants: {
        color: 'default',
        radius: 'sm',
        size: 'lg'
    },
    compoundVariants: [
        {
            class: "!transition-all !duration-300 !ease-in-out w-fit min-w-0 data-[hover=true]:opacity-100!",
        },
    ],

});
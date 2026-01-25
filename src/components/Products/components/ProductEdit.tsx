import { ButtonMain } from "@/components/ButtonMain";
import { Link, useRouter } from "@/i18n/routing";
import { SquarePen } from "lucide-react";

interface ProductEditProps {
    productId: number;
}

export default function ProductEdit({ productId }: ProductEditProps) {
    const router = useRouter();

    const handleEdit = () => {

        router.push(`/dashboard/add-advertisement?edit=${productId}`);
    }

    return (
        <ButtonMain type="button" color='transparent' isIconOnly onClick={(e) => {
            e.preventDefault();
            handleEdit();
        }}>

            <SquarePen className="size-8 text-border" />
        </ButtonMain>
    );
}
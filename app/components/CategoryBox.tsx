'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string'

interface CategoryBoxProps {
    icon: IconType,
    label: string;
    selected?: boolean;
}


const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const udpatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // If click same category, that category will remove
        if (params?.get("category") === label) {
            delete udpatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: udpatedQuery
        }, { skipNull: true });

        router.push(url);

    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
          flex 
          flex-col 
          items-center 
          justify-center 
          gap-2
          p-3
          border-b-2
          hover:text-neutral-800
          transition
          cursor-pointer
          ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
        `}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox
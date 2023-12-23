'use client';

import React, { useEffect, useState, useRef, useContext } from 'react';
import DiscoverContext from "../../../_context/context";
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';


const Pagination = () => {
    // @ts-ignore
    const { totalPages, currentPage, setCurrentPage } = useContext(DiscoverContext);

    const [animateDirection, setAnimateDirection] = useState('right');
    const pageRefs = useRef([]);

    const handlePageClick = (pageNumber: number) => {
        setAnimateDirection(pageNumber > currentPage ? 'right' : 'left');
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (pageRefs.current[currentPage]) {
            //@ts-ignore
            pageRefs.current[currentPage].classList.add('current-page');
        }
    }, [currentPage]);

    // Izračunajte kada prikazati elipse (tri tačkice)
    let items = [];
    let leftSide = currentPage - 2;
    if (leftSide <= 0) { leftSide = 1; }
    let rightSide = currentPage + 2;
    if (rightSide > totalPages) { rightSide = totalPages; }

    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <button
                key={number}
                //@ts-ignore
                ref={(el) => pageRefs.current[number] = el}
                onClick={() => handlePageClick(number)}
                className={`w-11 h-11 text-base flex justify-center items-center rounded-full ${currentPage === number ? 'bg-gradient-to-tr from-red to-[#FF004D] text-white_text border-2 border-red' : 'bg-transparent border-2 border-gray text-gray'} transition-all duration-150`}
            >
                {number}
            </button>
        );
    }

    return (
        <div className="flex items-center justify-center gap-x-2">
            <button
                onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
                className="w-11 h-11 flex justify-center items-center"
                disabled={currentPage === 1}
            >
                <ChevronLeft className='h-10 w-10 text-gray' />
            </button>
            {leftSide > 1 &&
                <>
                    <button onClick={() => handlePageClick(1)} className="w-11 h-11 text-base rounded-full text-gray bg-transparent">1</button>
                    {leftSide > 2 && <span className="flex justify-center items-center"><MoreHorizontal className='h-8 w-8 text-gray' /></span>}
                </>
            }
            {items}
            {rightSide < totalPages &&
                <>
                    {rightSide < totalPages - 1 && <span className="flex justify-center items-center"><MoreHorizontal className='h-8 w-8 text-gray' /></span>}
                    <button onClick={() => handlePageClick(totalPages)} className="w-11 h-11 text-base rounded-full text-gray bg-transparent">{totalPages}</button>
                </>
            }
            <button
                onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
                className="w-11 h-11 flex justify-center items-center"
                disabled={currentPage === totalPages}
            >
                <ChevronRight className='h-10 w-10 text-gray' />
            </button>
        </div>
    );
};

export default Pagination;

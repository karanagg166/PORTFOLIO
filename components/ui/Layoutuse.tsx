"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../ui/LayoutGrid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen  py-20 w-full -mt-28">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">A pleasant Sunset</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A sunset so serene that will take your breathe away , Shot at Maldives
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">A play with Fire</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A fire show at a night Safari , One of the most incredible fire shows performed by the artists a woonderful experience indeed
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Lifes a Beach</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Amongst the private island beach resort of Taj-Maldives , A perfect getaway for a peaceful vacation
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Posche Colours for my posche educators </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        College Lecture Hall at IIITDM JABALPUR
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      `/sky_1.jpg`,
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      `/IMG_7053.jpg`,
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      `/IMG_7054.jpg`,
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      `/IMG_7055.jpg`,
  },
];

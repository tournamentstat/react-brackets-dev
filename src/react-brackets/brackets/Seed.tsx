import {SingleLineSeed, DoubleLineSeed} from "../components/seed";
import {IRenderSeedProps} from "../types/Seed";
import React from "react";

export function Seed (props: React.PropsWithChildren<IRenderSeedProps>) {
    return (!props?.singleLined ?
        <DoubleLineSeed {...props}> {props.children} </DoubleLineSeed>
        :
        <SingleLineSeed {...props}> {props.children} </SingleLineSeed>);
}
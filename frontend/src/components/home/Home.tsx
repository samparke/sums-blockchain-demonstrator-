"use client"

import React from "react"
import BlockchainDemo from "./BlockchainDemo"
import Hash from "./Hash"
import Block from "./Block"

export default function HomeFeature () {
    return (
        <div>
            <BlockchainDemo/>
            <Hash/>
            <Block/>
        </div>
    )
}